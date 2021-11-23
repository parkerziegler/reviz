import overEvery from 'lodash.overevery';
import groupBy from 'lodash.groupby';

import type { VizAttrs } from './inference';
import { PRES_ATTR_NAMES } from './constants';

export interface PresAttrs {
  fill: string[];
  stroke: string[];
  ['fill-opacity']: string[];
  ['stroke-opacity']: string[];
  ['stroke-width']: string[];
}

export interface Scatterplot extends PresAttrs {
  type: 'Scatterplot';
  r: number;
}

export interface BubbleChart extends PresAttrs {
  type: 'BubbleChart';
}

export interface StripPlot extends PresAttrs {
  type: 'StripPlot';
  r: number;
}

export interface BarChart extends PresAttrs {
  type: 'BarChart';
  width: number;
}

export interface StackedBarChart extends PresAttrs {
  type: 'StackedBarChart';
  width: number;
}

export interface Histogram extends PresAttrs {
  type: 'Histogram';
  width: number;
}

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
