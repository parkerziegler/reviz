import overEvery from 'lodash.overevery';
import groupBy from 'lodash.groupby';

import type { VizAttrs } from './inference';
import { PRES_ATTR_NAMES } from './constants';

interface PresAttrs {
  fill: string[];
  stroke: string[];
  ['fill-opacity']: string[];
  ['stroke-opacity']: string[];
  ['stroke-width']: string[];
}

interface Scatterplot extends PresAttrs {
  type: 'Scatterplot';
  r: number;
}

interface BubbleChart extends PresAttrs {
  type: 'BubbleChart';
}

interface StripPlot extends PresAttrs {
  type: 'StripPlot';
  r: number;
}

interface BarChart extends PresAttrs {
  type: 'BarChart';
  width: number;
}

interface StackedBarChart extends PresAttrs {
  type: 'StackedBarChart';
  width: number;
}

interface Histogram extends PresAttrs {
  type: 'Histogram';
  width: number;
}

type VizSpec =
  | Scatterplot
  | BubbleChart
  | StripPlot
  | BarChart
  | StackedBarChart
  | Histogram;

/**
 * Predicate functions.
 *
 * Predicates are used to encode constraints about a particular characteristic of a visualization.
 * A visualization type is _uniquely_ defined by composing a particular set of constraints.
 * We then use lodash's overEvery function to compose these predicates; a visualization is of a
 * particular type if it returns true for all of that visualization's associated predicates.
 */

type Predicate = (vizAttrs: VizAttrs) => boolean;

// markType predicates.
const hasMarkType =
  (markType: 'rect' | 'circle'): Predicate =>
  (vizAttrs): boolean =>
    vizAttrs.markType === markType;

// geomAttr predicates.
const hasConsistentGeomAttr =
  (attr: 'r' | 'width'): Predicate =>
  (vizAttrs): boolean => {
    if (vizAttrs.geomAttrs[attr] && vizAttrs.geomAttrs[attr].size === 1) {
      return true;
    } else if (vizAttrs.geomAttrs[attr]) {
      const approxValueSet = new Set<string>();
      vizAttrs.geomAttrs[attr].forEach((val) => {
        approxValueSet.add(Number(val).toFixed(3));
      });

      return approxValueSet.size === 1;
    }

    return false;
  };

const hasDivergentGeomAttr =
  (attr: 'r' | 'width'): Predicate =>
  (vizAttrs): boolean =>
    vizAttrs.geomAttrs[attr] && vizAttrs.geomAttrs[attr].size > 1;

// Element predicates.
const hasSiblingsWithConsistentCyAttr: Predicate = (vizAttrs): boolean => {
  const lanes = Object.values(groupBy(vizAttrs.data, (d) => d.geomAttrs['cy']));

  const siblingCount = vizAttrs.data.reduce((acc, datum, i) => {
    if (
      typeof vizAttrs.data[i + 1] !== 'undefined' &&
      datum.geomAttrs['cy'] === vizAttrs.data[i + 1].geomAttrs['cy']
    ) {
      acc += 1;
    }

    return acc;
  }, 0);

  return siblingCount + lanes.length === vizAttrs.data.length;
};

const hasEqualSizedGroups: Predicate = (vizAttrs): boolean => {
  const lanes = Object.values(groupBy(vizAttrs.data, (d) => d.geomAttrs['x']));

  const laneLength = lanes[0].length;
  return lanes.every((lane) => lane.length > 1 && lane.length === laneLength);
};

// Scale predicates.
const hasXScaleType =
  (scaleType: 'continuous' | 'discrete'): Predicate =>
  (vizAttrs): boolean =>
    vizAttrs.xScaleType === scaleType;

// A higher-order function to return the logical NOT of the supplied predicate function.
const invertPredicate =
  (pred: Predicate): Predicate =>
  (vizAttrs): boolean =>
    !pred(vizAttrs);

const vizTypeToPredicates = {
  Scatterplot: overEvery(
    hasMarkType('circle'),
    hasConsistentGeomAttr('r'),
    invertPredicate(hasSiblingsWithConsistentCyAttr)
  ),
  BubbleChart: overEvery(
    hasMarkType('circle'),
    hasDivergentGeomAttr('r'),
    invertPredicate(hasSiblingsWithConsistentCyAttr)
  ),
  StripPlot: overEvery(
    hasMarkType('circle'),
    hasConsistentGeomAttr('r'),
    hasSiblingsWithConsistentCyAttr
  ),
  BarChart: overEvery(
    hasMarkType('rect'),
    hasConsistentGeomAttr('width'),
    hasXScaleType('discrete'),
    invertPredicate(hasEqualSizedGroups)
  ),
  StackedBarChart: overEvery(
    hasMarkType('rect'),
    hasConsistentGeomAttr('width'),
    hasXScaleType('discrete'),
    hasEqualSizedGroups
  ),
  Histogram: overEvery(
    hasMarkType('rect'),
    hasConsistentGeomAttr('width'),
    hasXScaleType('continuous'),
    invertPredicate(hasEqualSizedGroups)
  ),
};

type VizType = keyof typeof vizTypeToPredicates;

/**
 * determineVizType takes in a normalized schema containing visualization attributes
 * and checks this schema against the composed predicates associated with each visualization
 * type. It returns the first matching visualization type.
 *
 * @param vizAttrs – the schema of visualization attributes.
 * @returns – the visualization type of the svg subtree.
 */
const determineVizType = (vizAttrs: VizAttrs): VizType => {
  const possibleVizTypes = Object.entries(vizTypeToPredicates).reduce<
    VizType[]
  >((acc, [type, predicate]) => {
    if (predicate(vizAttrs)) {
      // This cast is safe. We are getting `type` here from the keys of vizTypeToPredicates,
      // so we can guarantee that type must be one of those keys. TS does not provide a mechanism
      // for inferring this because it cannot prove that even constant objects are "closed".
      acc.push(type as VizType);
    }

    return acc;
  }, []);

  if (possibleVizTypes.length === 0) {
    throw new Error('No matching visualization type found.');
  } else if (possibleVizTypes.length > 1) {
    console.warn(
      'Found multiple matching visualization types. Returning first result.'
    );
  }

  return possibleVizTypes[0];
};

/**
 * buildVizSpec generates the visualization specification from a normalized schema
 * containing visualization attributes.
 *
 * @param vizAttrs – the schema of visualization attributes.
 * @returns – the visualization specification for the svg subtree.
 */
export const buildVizSpec = (vizAttrs: VizAttrs): VizSpec => {
  const vizType = determineVizType(vizAttrs);

  const presAttrs = PRES_ATTR_NAMES.reduce((acc, attr) => {
    acc[attr as keyof PresAttrs] = Array.from(vizAttrs.presAttrs[attr]);

    return acc;
  }, {} as Record<keyof PresAttrs, string[]>);

  switch (vizType) {
    case 'Scatterplot':
    case 'StripPlot':
      return {
        type: vizType,
        r: Number(Array.from(vizAttrs.geomAttrs['r'])[0]),
        ...presAttrs,
      };
    case 'BubbleChart':
      return {
        type: vizType,
        ...presAttrs,
      };
    case 'BarChart':
    case 'StackedBarChart':
    case 'Histogram':
      return {
        type: vizType,
        width: Number(Array.from(vizAttrs.geomAttrs['width'])[0]),
        ...presAttrs,
      };
  }
};

interface CoordData {
  x: string;
  y: string;
}

interface StripData extends CoordData {
  z: string;
  basis: string;
}

interface PlotPresData {
  grid?: boolean;
}

interface BubbleData extends CoordData {
  r: string;
}

type Template<T> = (data: T) => string;

export function generate(
  spec: VizSpec
): Template<CoordData> | Template<BubbleData> | Template<StripData> {
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

const generateBar = (spec: BarChart | StackedBarChart): Template<CoordData> =>
  withGrid(fromSpec(spec, barMark));

const generateHistogram = (spec: Histogram): Template<CoordData> =>
  fromSpec(spec, histogramMark);

const generateScatterplot = (spec: Scatterplot): Template<CoordData> =>
  withGrid(fromSpec(spec, scatterplotMark));

const generateBubble = (spec: BubbleChart): Template<BubbleData> =>
  fromSpec(spec, bubbleMark);

const generateStrip = (spec: StripPlot): Template<StripData> =>
  fromSpec(spec, stripMark);

function withGrid<T>(t: Template<{ grid?: boolean } & T>): Template<T> {
  return partial({ grid: true }, t);
}

function fromSpec<S extends PresAttrs, T>(
  spec: S,
  markTemplate: Template<S & T>
): Template<PlotPresData & T> {
  return partial(spec, plot(markTemplate));
}

function partial<S, T>(
  data: S,
  template: Template<S & T>,
  override = true
): Template<T> {
  return (d: T): string =>
    template(override ? { ...d, ...data } : { ...data, ...d });
}

function plot<T>(markTemplate: Template<T>): Template<PlotPresData & T> {
  return wrap(
    'const plot = Plot.plot(',
    json(comma(plotPresFields, wrap('marks: [ ', markTemplate, ' ]'))),
    ');'
  );
}

function wrap<S, T>(
  pre: string,
  mid: Template<S>,
  post: string | Template<T>
): Template<S & T> {
  return (data: S & T): string =>
    pre + mid(data) + (typeof post === 'string' ? post : post(data));
}

const plotPresFields: Template<PlotPresData> = fields('grid');
const coordFields: Template<CoordData> = fields('x', 'y');
const bubbleFields: Template<BubbleData> = fields('x', 'y', 'r');
const stripFields: Template<StripData> = fields('x', 'y', 'z', 'basis');
const presAttrsFields: Template<PresAttrs> = fields(
  'fill',
  'stroke',
  'fill-opacity',
  'stroke-opacity',
  'stroke-width'
);

const barMark: Template<PresAttrs & CoordData> = withRuleY(
  mark('barY', coordFields),
  0
);
const histogramMark: Template<PresAttrs & CoordData> = withRuleY(
  mark(
    'rectY',
    wrap('...Plot.binX(', comma(json(field('y')), json(field('x'))), ')')
  ),
  0
);

const scatterplotMark: Template<PresAttrs & CoordData> = mark(
  'dot',
  coordFields
);

const bubbleMark: Template<PresAttrs & BubbleData> = mark('dot', bubbleFields);

const stripMark: Template<PresAttrs & StripData> = mark(
  'dotX',
  wrap('...Plot.normalizeX(', json(stripFields), ')')
);

function mark<S extends PresAttrs, T>(
  markType: string,
  specialFields: Template<T>
): Template<S & T> {
  return wrap(
    `Plot.${markType}(data, `,
    json(comma(presAttrsFields, specialFields)),
    ')'
  );
}

function withRuleY<T>(t: Template<T>, ...xs: number[]): Template<T> {
  return comma(t, () => `Plot.ruleY(${xs})`);
}

function json<T>(t: Template<T>): Template<T> {
  return wrap('{ ', t, ' }');
}

function comma<S, T>(s: Template<S>, t: Template<T>): Template<S & T> {
  return (data: S & T): string => `${s(data)}, ${t(data)}`;
}

function fields<T>(...field_names: (keyof T)[]): Template<T> {
  const fs = [...new Set(field_names)];
  return (data: T): string =>
    fs.map((f_name) => field(f_name)(data)).join(', ');
}

function field<T>(field_name: keyof T): Template<T> {
  return (data: T): string => {
    const f_data = data[field_name];
    // if data is a number, don't surround with quotes.
    const f_data_str = !isNaN(+f_data) ? f_data : `'${f_data}'`;
    return `'${field_name}': ` + f_data_str;
  };
}
