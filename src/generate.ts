import camelCase from 'lodash.camelcase';

import type { VizSpec } from './ir';
import { EVAL_HOLE, PROGRAM_HOLE } from './constants';

const replaceHole = (program: string, template: string): string => {
  return program.replace(EVAL_HOLE, template);
};

const intersperse = (arr: string[], sep: string): string => {
  if (arr.length === 0) {
    return '';
  }

  return arr
    .slice(1)
    .reduce((acc, el) => acc.concat(`${sep}${el}`), `${arr[0]}`);
};

export const generate = (spec: VizSpec): string => {
  const marks = Object.entries(spec).reduce<string>(
    (program, [attrName, attrValue], i, arr) => {
      switch (attrName) {
        case 'type':
          return evalType(program, attrValue);
        case 'r':
          return evalGeomAttr(program, attrName, attrValue);
        case 'fill':
        case 'fill-opacity':
        case 'stroke':
        case 'stroke-opacity':
        case 'stroke-width':
          return evalPresAttr({ program, attrName, attrValue, arr, i });
        default:
          return program;
      }
    },
    `[${EVAL_HOLE}]`
  );

  const color = evalColor(spec);
  const r = evalR(spec);

  const members = [
    `${typeof color !== 'undefined' ? `color: ${color}` : ''}`,
    `${typeof r !== 'undefined' ? `r: ${r}` : ''}`,
    `marks: ${marks}`,
  ].filter(Boolean);

  return `const plot = Plot.plot({
    ${intersperse(members, ', ')}
  })`;
};

const evalType = (program: string, type: string): string => {
  let nextProgram = '';

  switch (type) {
    case 'BarChart':
    case 'StackedBarChart':
      nextProgram = `Plot.barY(data, { x: '${PROGRAM_HOLE}', y: '${PROGRAM_HOLE}', ${EVAL_HOLE} })`;
      break;
    case 'Histogram':
      nextProgram = `Plot.barY(data, Plot.binX({ y: 'count' }, { x: '${PROGRAM_HOLE}', ${EVAL_HOLE} }))`;
      break;
    case 'BubbleChart':
    case 'Scatterplot':
      nextProgram = `Plot.dot(data, { x: '${PROGRAM_HOLE}', y: '${PROGRAM_HOLE}', ${EVAL_HOLE} })`;
      break;
    case 'StripPlot':
      nextProgram = `Plot.dotX(data, { x: '${PROGRAM_HOLE}', y: '${PROGRAM_HOLE}', ${EVAL_HOLE} })`;
      break;
    default:
      break;
  }

  return replaceHole(program, nextProgram);
};

const evalGeomAttr = (
  program: string,
  attrName: 'r',
  attrValue: number | number[]
): string => {
  // If our attribute value from the spec is an array it suggests
  // that the attribute is mapped to a column in the input dataset
  // rather than being kept static across the entire visualization.
  //
  // Return early with a hole ('??') for the associated attribute.
  if (Array.isArray(attrValue)) {
    return replaceHole(program, `${attrName}: '${PROGRAM_HOLE}', ${EVAL_HOLE}`);
  }

  const template = `${attrName}: ${attrValue}, ${EVAL_HOLE}`;

  return replaceHole(program, template);
};

interface EvalPresAttrParams {
  program: string;
  attrName: string;
  attrValue: string[];
  arr: [string, unknown][];
  i: number;
}

const evalPresAttr = ({
  program,
  attrName,
  attrValue,
  arr,
  i,
}: EvalPresAttrParams): string => {
  // If this is the last attr to be evaluated, do not leave an eval hole.
  const isLastAttr = i === arr.length - 1;

  // If our attribute value from the spec is an array with length greater than 1,
  // it suggests that the attribute is mapped to a column in the input dataset
  // rather than being kept static across the entire visualization.
  //
  // Return early with a hole ('??') for the associated attribute.
  if (attrValue.length > 1) {
    return replaceHole(
      program,
      `${camelCase(attrName)}: '${PROGRAM_HOLE}'${
        !isLastAttr ? `, ${EVAL_HOLE}` : ''
      }`
    );
  }

  // Parse all numeric values to floats and single quote all strings.
  const attrValueFloat = parseFloat(attrValue[0]);
  const val = Number.isNaN(attrValueFloat)
    ? `'${attrValue[0]}'`
    : attrValueFloat;

  const template = `${camelCase(attrName)}: ${val}${
    !isLastAttr ? `, ${EVAL_HOLE}` : ''
  }`;

  return replaceHole(program, template);
};

const evalColor = (spec: VizSpec): string | undefined => {
  // Return early if fill or stroke are static across the visualization.
  if (spec.fill.length <= 1 && spec.stroke.length <= 1) {
    return undefined;
  }

  let range: string[] = [];

  if (spec.fill.length > 1) {
    range = spec.fill;
  } else if (spec.stroke.length > 1) {
    range = spec.stroke;
  }

  return `{ type: "categorical", range: [${intersperse(
    range.map((color) => `'${color}'`),
    ', '
  )}] }`;
};

const evalR = (spec: VizSpec): string | undefined => {
  if (spec.type !== 'BubbleChart') {
    return undefined;
  }

  return `{ range: [0, ${Math.max(...Array.from(spec.r))}] }`;
};
