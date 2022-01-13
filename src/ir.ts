import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';

import { OBSERVABLE_DEFAULT_R, PRES_ATTR_NAMES } from './constants';
import type { VizMetaAttrs } from './inference';
import type {
  AttrSets,
  RevizCirclePositionDatum,
  RevizPositionDatum,
  RevizRectPositionDatum,
  RevizTextDatum,
} from './attributes';

export interface PresAttrs {
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
  r: number[];
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

type VizType =
  | 'BarChart'
  | 'BubbleChart'
  | 'Histogram'
  | 'Scatterplot'
  | 'StackedBarChart'
  | 'StripPlot';

export type VizSpec =
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
interface VizAttrs extends VizMetaAttrs {
  geomAttrs: AttrSets;
  presAttrs: AttrSets;
  textAttrs: RevizTextDatum[];
  positionAttrs: RevizPositionDatum[];
}

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
    if (vizAttrs.geomAttrs.get(attr)?.size === 1) {
      return true;
    } else if (vizAttrs.geomAttrs.has(attr)) {
      const approxValueSet = new Set<string>();

      vizAttrs.geomAttrs.get(attr)?.forEach((val) => {
        approxValueSet.add((+val).toFixed(3));
      });

      return approxValueSet.size === 1;
    }

    return false;
  };

const hasDivergentGeomAttr =
  (attr: 'r' | 'width'): Predicate =>
  (vizAttrs): boolean =>
    (vizAttrs.geomAttrs.get(attr)?.size || 0) > 1;

// Element predicates.
const hasSiblingsWithConsistentCyAttr: Predicate = (vizAttrs): boolean => {
  const circles = vizAttrs.positionAttrs
    .filter((d): d is RevizCirclePositionDatum => d.type === 'circle')
    .sort((a, b) => +a.cy - +b.cy);

  const lanes = Object.values(groupBy(circles, (d) => d.cy));
  let laneAnchorCount = 0;

  circles.forEach((circle, i, arr) => {
    const [before, after] = [arr[i - 1]?.cy, arr[i + 1]?.cy];
    const current = circle.cy;

    if (before === current && after !== current) {
      laneAnchorCount += 1;
    }
  });

  return laneAnchorCount === lanes.length;
};

const hasMultipleGroups: Predicate = (vizAttrs): boolean => {
  const rects = vizAttrs.positionAttrs
    .filter((d): d is RevizRectPositionDatum => d.type === 'rect')
    .sort((a, b) => +a.x - +b.x);

  const lanes = Object.values(groupBy(rects, (d) => d.x));

  return lanes.every((lane) => lane.length > 1);
};

const hasEqualSizedGroups: Predicate = (vizAttrs): boolean => {
  const rects = vizAttrs.positionAttrs
    .filter((d): d is RevizRectPositionDatum => d.type === 'rect')
    .sort((a, b) => +a.x - +b.x);

  const lanes = Object.values(groupBy(rects, (d) => d.x));

  return lanes.every((lane) => lane.length === lanes[0].length);
};

// Scale predicates.
const hasXScaleType =
  (scaleType: 'continuous' | 'discrete'): Predicate =>
  (vizAttrs): boolean =>
    vizAttrs.xScaleType === scaleType;

const vizTypeToPredicates = new Map<VizType, Predicate[]>([
  ['Scatterplot', [hasMarkType('circle'), hasConsistentGeomAttr('r')]],
  ['BubbleChart', [hasMarkType('circle'), hasDivergentGeomAttr('r')]],
  [
    'StripPlot',
    [
      hasMarkType('circle'),
      hasConsistentGeomAttr('r'),
      hasSiblingsWithConsistentCyAttr,
    ],
  ],
  [
    'BarChart',
    [
      hasMarkType('rect'),
      hasConsistentGeomAttr('width'),
      hasXScaleType('discrete'),
    ],
  ],
  [
    'StackedBarChart',
    [
      hasMarkType('rect'),
      hasConsistentGeomAttr('width'),
      hasXScaleType('discrete'),
      hasMultipleGroups,
      hasEqualSizedGroups,
    ],
  ],
  [
    'Histogram',
    [
      hasMarkType('rect'),
      hasConsistentGeomAttr('width'),
      hasXScaleType('continuous'),
    ],
  ],
]);

/**
 * determineVizType takes in a normalized schema containing visualization attributes and
 * checks this schema against the array of predicates associated with each visualization type.
 * It returns the visualization type for which it has the highest predicate solve rate, with
 * number of predicates used as a tie breaker.
 *
 * @param vizAttrs – the schema of visualization attributes.
 * @returns – the visualization type of the svg subtree.
 */
interface PredicateStats {
  type: VizType;
  numPredicates: number;
  solvedPredicates: number;
  solveRate: number;
}

const determineVizType = (vizAttrs: VizAttrs): VizType => {
  const predicateStats = [...vizTypeToPredicates.entries()].reduce<
    PredicateStats[]
  >((acc, [type, predicates]) => {
    const numPredicates = predicates.length;
    let solvedPredicates = 0;

    for (const predicate of predicates) {
      if (predicate(vizAttrs)) {
        solvedPredicates += 1;
      }
    }

    acc.push({
      type: type as VizType,
      numPredicates,
      solvedPredicates,
      solveRate: solvedPredicates / numPredicates,
    });

    return acc;
  }, []);

  const possibleVizTypes = orderBy(
    predicateStats,
    ['solveRate', 'numPredicates'],
    ['desc', 'desc']
  );

  return possibleVizTypes[0].type;
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
    acc[attr] = Array.from(vizAttrs.presAttrs.get(attr) ?? []);

    return acc;
  }, {} as Record<keyof PresAttrs, string[]>);

  switch (vizType) {
    case 'Scatterplot':
    case 'StripPlot':
      return {
        type: vizType,
        r: +Array.from(
          vizAttrs.geomAttrs.get('r') ?? [`${OBSERVABLE_DEFAULT_R}`]
        )[0],
        ...presAttrs,
      };
    case 'BubbleChart':
      return {
        type: vizType,
        r: Array.from(
          vizAttrs.geomAttrs.get('r') ?? [`${OBSERVABLE_DEFAULT_R}`]
        ).map((r) => +r),
        ...presAttrs,
      };
    case 'BarChart':
    case 'StackedBarChart':
    case 'Histogram':
      return {
        type: vizType,
        width: Number(Array.from(vizAttrs.geomAttrs.get('width') ?? ['20'])[0]),
        ...presAttrs,
      };
  }
};
