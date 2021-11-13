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

// markType predicates.
const hasMarkType =
  (markType: 'rect' | 'circle') =>
  (viz: VizAttrs): boolean =>
    viz.markType === markType;

// geomAttr predicates.
const hasConsistentGeomAttr =
  (attr: 'r' | 'width') =>
  (viz: VizAttrs): boolean => {
    if (viz.geomAttrs[attr] && viz.geomAttrs[attr].size === 1) {
      return true;
    } else if (viz.geomAttrs[attr]) {
      const approxValueSet = new Set<string>();
      viz.geomAttrs[attr].forEach((val) => {
        approxValueSet.add(Number(val).toFixed(3));
      });

      return approxValueSet.size === 1;
    }

    return false;
  };

const hasDivergentGeomAttr =
  (attr: 'r' | 'width') =>
  (viz: VizAttrs): boolean =>
    viz.geomAttrs[attr] && viz.geomAttrs[attr].size > 1;

// Element predicates.
const hasSiblingsWithConsistentCyAttr = (viz: VizAttrs): boolean => {
  const lanes = Object.values(groupBy(viz.data, (d) => d.geomAttrs['cy']));

  const siblingCount = viz.data.reduce((acc, datum, i) => {
    if (
      typeof viz.data[i + 1] !== 'undefined' &&
      datum.geomAttrs['cy'] === viz.data[i + 1].geomAttrs['cy']
    ) {
      acc += 1;
    }

    return acc;
  }, 0);

  return siblingCount + lanes.length === viz.data.length;
};

const hasEqualSizedGroups = (viz: VizAttrs): boolean => {
  const lanes = Object.values(groupBy(viz.data, (d) => d.geomAttrs['x']));

  const laneLength = lanes[0].length;
  return lanes.every((lane) => lane.length > 1 && lane.length === laneLength);
};

// A higher-order function to return the logical NOT of the supplied predicate function.
const invertPredicate =
  (pred: (viz: VizAttrs) => boolean) =>
  (viz: VizAttrs): boolean =>
    !pred(viz);

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
    invertPredicate(hasEqualSizedGroups)
  ),
  StackedBarChart: overEvery(
    hasMarkType('rect'),
    hasConsistentGeomAttr('width'),
    hasEqualSizedGroups
  ),
  Histogram: overEvery(
    hasMarkType('rect'),
    hasConsistentGeomAttr('width'),
    invertPredicate(hasEqualSizedGroups)
  ),
};

type VizType = keyof typeof vizTypeToPredicates;

/**
 * determineVizType takes in a normalized schema containing visualization attributes
 * and checks this schema against the composed predicates associated with each visualization
 * type. It returns the first matching visualization type.
 *
 * @param viz – the schema of visualization attributes.
 * @returns – the visualization type of the svg subtree.
 */
const determineVizType = (viz: VizAttrs): VizType => {
  const possibleVizTypes = Object.entries(vizTypeToPredicates).reduce<
    VizType[]
  >((acc, [type, predicate]) => {
    if (predicate(viz)) {
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
 * @param viz – the schema of visualization attributes.
 * @returns – the visualization specification for the svg subtree.
 */
export const buildVizSpec = (viz: VizAttrs): VizSpec => {
  const vizType = determineVizType(viz);

  const presAttrs = PRES_ATTR_NAMES.reduce((acc, attr) => {
    acc[attr as keyof PresAttrs] = Array.from(viz.presAttrs[attr]);

    return acc;
  }, {} as Record<keyof PresAttrs, string[]>);

  switch (vizType) {
    case 'Scatterplot':
    case 'StripPlot':
      return {
        type: vizType,
        r: Number(Array.from(viz.geomAttrs['r'])[0]),
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
        width: Number(Array.from(viz.geomAttrs['width'])[0]),
        ...presAttrs,
      };
  }
};

interface CoordData {
  x: string;
  y: string;
}

interface PlotPresData {
  grid?: boolean;
}

interface RadiusData {
  r: number;
}

type Template<T> = (data: T) => string;

export function generate(
  spec: VizSpec
): Template<CoordData> | Template<CoordData & RadiusData> {
  switch (spec.type) {
    case 'BarChart':
      return generateBar(spec);
    case 'Histogram':
      return generateHistogram(spec);
    case 'Scatterplot':
      return generateScatterplot(spec);
    case 'BubbleChart':
      return generateBubble(spec);
    default:
      throw new Error('Unkown type: ' + spec.type);
  }
}

const generateBar = (spec: BarChart): Template<CoordData> =>
  partial({ grid: true }, fromSpec(spec, barMark));

const generateHistogram = (spec: Histogram): Template<CoordData> =>
  fromSpec(spec, histogramMark);

const generateScatterplot = (spec: Scatterplot): Template<CoordData> =>
  partial({ grid: true }, fromSpec(spec, scatterplotMark));

const generateBubble = (spec: BubbleChart): Template<CoordData & RadiusData> =>
  fromSpec(spec, bubbleMark);

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
  return (data): string =>
    `const plot = Plot.plot({ grid: ${Boolean(
      data.grid
    )}, marks: [ ${markTemplate(data)} ] })`;
}

const coordFields: Template<CoordData> = fields('x', 'y');
const bubbleFields: Template<CoordData & RadiusData> = fields('x', 'y', 'r');
const presAttrsFields: Template<PresAttrs> = fields(
  'fill',
  'stroke',
  'fill-opacity',
  'stroke-opacity',
  'stroke-width'
);

const barMark: Template<PresAttrs & CoordData> = partial(
  { mark: 'barY' },
  mark(coordFields)
);

const histogramMark: Template<PresAttrs & CoordData> = partial(
  { mark: 'rectY' },
  withRuleY(
    mark(
      (data) => `...Plot.binX({ ${field('y')(data)} }, { ${field('x')(data)} })`
    ),
    0
  )
);

const scatterplotMark: Template<PresAttrs & CoordData> = partial(
  { mark: 'dot' },
  mark(coordFields)
);

const bubbleMark: Template<PresAttrs & CoordData & RadiusData> = partial(
  { mark: 'dot' },
  mark(bubbleFields)
);

function mark<T>(
  fields: Template<T>
): Template<{ mark: string } & PresAttrs & T> {
  return (data): string =>
    `Plot.${data.mark}(data, { ${presAttrsFields(data)}, ${fields(data)} })`;
}

function withRuleY<T>(t: Template<T>, ...xs: number[]): Template<T> {
  return (data: T): string => `${t(data)}, Plot.ruleY(${xs})`;
}

function fields<T>(...field_names: (keyof T)[]): Template<T> {
  return (data: T): string =>
    field_names.map((f_name) => field(f_name)(data)).join(', ');
}

function field<T>(field_name: keyof T): Template<T> {
  return (data: T): string => {
    const f_data = data[field_name];
    // if data is a number, don't surround with quotes.
    const f_data_str = !isNaN(+f_data) ? f_data : `'${f_data}'`;
    return `'${field_name}': ` + f_data_str;
  };
}
