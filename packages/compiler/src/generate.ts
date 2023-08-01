import camelCase from 'lodash.camelcase';

import type { VizSpec } from './ir';
import { EVAL_HOLE, PROGRAM_HOLE } from './constants';

/**
 * Replace a hole ('??') with a given replacement string.
 *
 * @param program – The program being generated.
 * @param replacement – A replacement string to replace the hole in the
 * generated program.
 * @returns – A program with the earliest hole encountered replaced by the
 * replacement string.
 */
const replaceHole = (program: string, replacement: string): string => {
  return program.replace(EVAL_HOLE, replacement);
};

/**
 * Interperse a set of values by a separator (without leaving a dangling
 * separator after the last value).
 *
 * @param values — The input array of values to separate.
 * @param sep – A string separator between values.
 * @returns – A string with values separated by @param sep.
 */
const intersperse = (values: string[], sep: string): string => {
  if (values.length === 0) {
    return '';
  }

  return values
    .slice(1)
    .reduce((acc, el) => acc.concat(`${sep}${el}`), `${values[0]}`);
};

/**
 * Generate a partial Observable Plot program from the reviz IR.
 *
 * @param spec – The reviz IR.
 * @returns – A partial Observable Plot program, with fields that are inferred
 * to map to data represented by a hole ('??').
 */
export const generate = (spec: VizSpec): string => {
  const marks = Object.entries(spec).reduce<string>(
    (program, [attrName, attrValue], i, arr) => {
      switch (attrName) {
        case 'type':
          return evalType(program, attrValue as string);
        case 'r':
          return evalGeomAttr(program, attrName, attrValue as number);
        case 'fill':
        case 'fill-opacity':
        case 'stroke':
        case 'stroke-opacity':
        case 'stroke-width':
          return evalPresAttr({
            program,
            attrName,
            attrValue: attrValue as string[],
            arr,
            i,
          });
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

  return `Plot.plot({
    ${intersperse(members, ', ')}
  })`;
};

/**
 * Apply rules of reviz's reduction semantics to incrementally write a partial
 * Observable Plot program for a given visualization type.
 *
 * @param program – The program being generated.
 * @param type – The visualization type, as specified in the reviz IR.
 * @returns – An Observable Plot partial program fragment.
 */
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

/**
 * Apply rules of reviz's reduction semantics to incrementally write a partial
 * Observable Plot program for a given geometric attribute.
 *
 * @param program – The program being generated.
 * @param attrName – The name of the geometric attribute being written.
 * @param attrValue – The value the geometric attribute is mapped to in the
 * reviz IR.
 * @returns – An Observable Plot partial program fragment.
 */
const evalGeomAttr = (
  program: string,
  attrName: 'r',
  attrValue: number | number[]
): string => {
  // If our attribute value from the spec is an array, this suggests that the
  // attribute is mapped to a column in the input dataset rather than kept
  // static across the visualization. Return early with a hole ('??') for the
  // associated attribute.
  if (Array.isArray(attrValue)) {
    return replaceHole(program, `${attrName}: '${PROGRAM_HOLE}', ${EVAL_HOLE}`);
  }

  const replacement = `${attrName}: ${attrValue}, ${EVAL_HOLE}`;

  return replaceHole(program, replacement);
};

interface EvalPresAttrParams {
  program: string;
  attrName: string;
  attrValue: string[];
  arr: [string, unknown][];
  i: number;
}

/**
 * Apply rules of reviz's reduction semantics to incrementally write a partial
 * Observable Plot program for a given presentational attribute.
 *
 * @param program – The program being generated.
 * @param attrName – The name of the presentational attribute being written.
 * @param attrValue – The value the presentational attribute is mapped to in the
 * reviz IR.
 * @returns – An Observable Plot partial program fragment.
 */
const evalPresAttr = ({
  program,
  attrName,
  attrValue,
  arr,
  i,
}: EvalPresAttrParams): string => {
  // If this is the last attr to be evaluated, do not leave an eval hole.
  const isLastAttr = i === arr.length - 1;

  // If our attribute value from the spec is an array with length > 1, this
  // suggests that the attribute is mapped to a column in the input dataset
  // rather than kept static across the entire visualization. Return early with
  // a hole ('??') for the associated attribute.
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

  const replacement = `${camelCase(attrName)}: ${val}${
    !isLastAttr ? `, ${EVAL_HOLE}` : ''
  }`;

  return replaceHole(program, replacement);
};

/**
 * Apply reviz's reduction semantics to incrementally write a partial
 * Observable Plot program for a categorical color scale.
 *
 * @param spec – The reviz IR.
 * @returns – An Observable Plot partial program fragment for a categorical
 * color scale, or undefined if color is static across the visualization.
 */
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

/**
 * Apply reviz's reduction semantics to incrementally write a partial Observable
 * Plot program for the "r" attribute when marks have variable radii.
 *
 * @param spec – The reviz IR.
 * @returns – An Observable Plot partial program fragment for the "r" attribute,
 * or undefined if mark radii are kept static across the visualization.
 */
const evalR = (spec: VizSpec): string | undefined => {
  if (spec.type !== 'BubbleChart') {
    return undefined;
  }

  return `{ range: [0, ${Math.max(...Array.from(spec.r))}] }`;
};
