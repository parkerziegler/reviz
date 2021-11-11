import overEvery from 'lodash.overevery';
import groupBy from 'lodash.groupby';

import type { VizAttrs } from './inference';

interface PresAttrs {
  fill: string;
  stroke: string;
  ['fill-opacity']: number;
  ['stroke-opacity']: number;
  ['stroke-width']: number;
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

type Visualization =
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
  (viz: VizAttrs): boolean =>
    viz.geomAttrs[attr] && viz.geomAttrs[attr].size === 1;
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

/**
 * determineVizType takes in a normalized schema containing visualization attributes
 * and checks this schema against the composed predicates associated with each visualization
 * type. It returns the first matching visualization type.
 *
 * @param viz – the schema of visualization attributes.
 * @returns – the visualization type of the svg subtree.
 */
export const determineVizType = (viz: VizAttrs): string => {
  const possibleVizTypes = Object.entries(vizTypeToPredicates).reduce<string[]>(
    (acc, [type, predicate]) => {
      if (predicate(viz)) {
        acc.push(type);
      }

      return acc;
    },
    []
  );

  if (possibleVizTypes.length === 0) {
    throw new Error('No matching visualization type found.');
  } else if (possibleVizTypes.length > 1) {
    console.warn(
      'Found multiple matching visualization types. Returning first result.'
    );
  }

  return possibleVizTypes[0];
};
