import isPlainObject from 'lodash.isplainobject';
import camelCase from 'lodash.camelcase';

import type {
  VizSpec,
  BarChart,
  StackedBarChart,
  Histogram,
  Scatterplot,
  BubbleChart,
  StripPlot,
  PresAttrs,
} from './ir';

interface Scales {
  x: string;
  y: string;
}

interface ScatterData extends Scales {
  r: string;
}

interface StripData extends Scales {
  z: string;
  basis: string;
}

interface PlotPresData {
  color?: {
    type: 'ordinal';
    range: string[];
  };
}

type Template<T> = (data: T) => string;

export function generate(
  spec: VizSpec
): Template<Scales> | Template<ScatterData> | Template<StripData> {
  switch (spec.type) {
    case 'BarChart':
    case 'StackedBarChart':
      return generateBar(spec);
    case 'Histogram':
      return generateHistogram(spec);
    case 'Scatterplot':
      return generateScatterplot(spec);
    case 'BubbleChart':
      return generateBubble(spec);
    case 'StripPlot':
      return generateStrip(spec);
  }
}

const generateBar = (spec: BarChart | StackedBarChart): Template<Scales> =>
  withColor(spec, fromSpec(spec, barMark));

const generateHistogram = (spec: Histogram): Template<Scales> =>
  withColor(spec, fromSpec(spec, histogramMark));

const generateScatterplot = (spec: Scatterplot): Template<ScatterData> =>
  withColor(spec, fromSpec(spec, scatterMark));

const generateBubble = (spec: BubbleChart): Template<Scales> =>
  withColor(spec, fromSpec(spec, bubbleMark));

const generateStrip = (spec: StripPlot): Template<StripData> =>
  withColor(spec, fromSpec(spec, stripMark));

const withColor = <S extends PresAttrs, T>(
  spec: S,
  t: Template<{ color?: { scale: 'ordinal'; range: string[] } } & T>
): Template<T> => {
  let range: string[] = [];

  // If our fill or stroke attributes have length > 1 in the spec, it suggests
  // the use of color as a third visual variable. In this case, we need to specify
  // a top-level colors property defining the range of the attribute.
  if (Array.isArray(spec.fill) && spec.fill.length > 1) {
    range = spec.fill;
  } else if (Array.isArray(spec.stroke) && spec.stroke.length > 1) {
    range = spec.stroke;
  }

  const color =
    range.length > 0 ? { scale: <const>'ordinal', range } : undefined;

  return partial({ color }, t);
};

const fromSpec = <S extends PresAttrs, T>(
  spec: S,
  markTemplate: Template<S & T>
): Template<PlotPresData & T> => {
  return partial(spec, plot(markTemplate));
};

const plot = <T>(markTemplate: Template<T>): Template<PlotPresData & T> => {
  return wrap(
    'const plot = Plot.plot(',
    json(plotPresFields, wrap('marks: [ ', markTemplate, ' ]')),
    ');'
  );
};

const json = <S, T>(s: Template<S>, t?: Template<T>): Template<S & T> => {
  return wrap('{ ', t ? comma(s, t) : s, ' }');
};

const splat = <T>(fnName: string, t: Template<T>): Template<T> =>
  wrap(`...${fnName}(`, t, ')');

function comma<S, T>(s: Template<S>, t: Template<T>): Template<S & T> {
  return (data: S & T): string => {
    const a = s(data),
      b = t(data);
    return a && b ? `${a}, ${b}` : a || b;
  };
}

function wrap<S, T>(
  pre: string,
  mid: Template<S>,
  post: string | Template<T>
): Template<S & T> {
  return (data: S & T): string =>
    pre + mid(data) + (typeof post === 'string' ? post : post(data));
}

function partial<S, T>(
  data: S,
  template: Template<S & T>,
  override = true
): Template<T> {
  return (d: T): string =>
    template(override ? { ...d, ...data } : { ...data, ...d });
}

function fields<T>(...fieldNames: (keyof T)[]): Template<T> {
  return (data: T): string => {
    return fieldNames
      .map((fName) => data[fName] !== undefined && field(fName)(data))
      .filter(Boolean)
      .join(', ');
  };
}

function field<T>(fieldName: keyof T): Template<T> {
  return (data: T): string => {
    // Plot cannot understand strokeWidth values provided as strings like "1px",
    // but it does correctly apply ['stroke-width']: 1px.
    const fName =
      fieldName === 'stroke-width' ? fieldName : camelCase(`${fieldName}`);
    const fData = data[fieldName];

    // If our fill or stroke attributes in the spec are arrays with length > 1
    // we can assume they are being used as visual variables that must be encoded
    // using the top-level "color" key. Return a hole for them in the output spec,
    // since they would need to have a data column mapped to them.
    if (
      Array.isArray(fData) &&
      fData.length > 1 &&
      (fieldName === 'fill' || fieldName === 'stroke')
    ) {
      return `'${fName}': "?"`;
    }

    // If our field data is an object, preserve it using JSON.stringify.
    if (isPlainObject(fData)) {
      return `'${fName}': ${JSON.stringify(fData)}`;
    }

    // If our field data is a number, don't surround with quotes.
    const fDataStr =
      !isNaN(+fData) && !isNaN(parseFloat(`${fData}`)) ? fData : `'${fData}'`;
    return `'${fName}': ` + fDataStr;
  };
}

const plotPresFields: Template<PlotPresData> = fields('color');
const scaleFields: Template<Scales> = fields('x', 'y');
const scatterFields: Template<ScatterData> = fields('x', 'y', 'r');
const stripFields: Template<StripData> = fields('x', 'y', 'z', 'basis');

const presAttrsFields: Template<PresAttrs> = fields(
  'fill',
  'stroke',
  'fill-opacity',
  'stroke-opacity',
  'stroke-width'
);

const mark = <S extends PresAttrs, T>(
  markType: string,
  specialFields: Template<T>
): Template<S & T> =>
  wrap(`Plot.${markType}(data, `, json(presAttrsFields, specialFields), ')');

const barMark: Template<PresAttrs & Scales> = mark('barY', scaleFields);

const histogramMark: Template<PresAttrs & Scales> = mark(
  'rectY',
  splat('Plot.binX', comma(json(field('y')), json(field('x'))))
);

const scatterMark: Template<PresAttrs & ScatterData> = mark(
  'dot',
  scatterFields
);
const bubbleMark: Template<PresAttrs & Scales> = mark('dot', scaleFields);
const stripMark: Template<PresAttrs & StripData> = mark(
  'dotX',
  splat('Plot.normalizeX', json(stripFields))
);
