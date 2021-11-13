import * as d3 from 'd3';
import groupBy from 'lodash.groupby';

import type { RevizDatum, RevizTextDatum } from './attributes';
import {
  RECT_ATTR_NAMES,
  CIRCLE_ATTR_NAMES,
  PRES_ATTR_NAMES,
} from './constants';

/**
 * inferMarkType determines the core mark type of the visualization from its elements.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @returns – the core mark type of the visualization, either 'rect' or 'circle'.
 */
export const inferMarkType = (elements: RevizDatum[]): 'rect' | 'circle' => {
  const filteredElements = elements.filter(
    (d) => d.nodeName === 'circle' || d.nodeName === 'rect'
  );

  // @ts-expect-error – there are no updated type definitions for d3 v7, so
  // d3.mode still believes it can only return numbers in the accessor function.
  return d3.mode(filteredElements, (d) => d.nodeName);
};

/**
 * initializeAttrSets creates a dictionary mapping attributes names (e.g. 'x', 'r', 'fill')
 * to empty Sets. These Sets then accumulate _unique_ values of these attributes found in
 * the svg subtree.
 *
 * @param attrs – the attributes to use as keys in the dictionary.
 * @returns – a dictionary with all attributes mapped to their own empty sets.
 */
const initializeAttrSets = (attrs: string[]): Record<string, Set<string>> => {
  return attrs.reduce((acc, attr) => {
    acc[attr] = new Set();

    return acc;
  }, {} as Record<string, Set<string>>);
};

/**
 * inferGeometricAttributes aggregates all unique geometric attributes (e.g. all unique values
 * of 'cx', 'width', etc.) found in the svg subtree.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @param elementType – the core mark type of the visualization, either 'rect' or 'circle'.
 * Derived from @see inferMarkType.
 * @returns – a dictionary mapping geometric attributes to Sets containing their unique values
 * present in the svg subtree.
 */
export const inferGeometricAttributes = (
  elements: RevizDatum[],
  elementType: 'rect' | 'circle'
): Record<string, Set<string>> => {
  switch (elementType) {
    case 'rect':
      return elements.reduce((acc, el) => {
        RECT_ATTR_NAMES.forEach((rectAttr) => {
          acc[rectAttr].add(el.geomAttrs[rectAttr]);
        });

        return acc;
      }, initializeAttrSets(RECT_ATTR_NAMES));
    case 'circle':
      return elements.reduce((acc, el) => {
        CIRCLE_ATTR_NAMES.forEach((circleAttr) => {
          acc[circleAttr].add(el.geomAttrs[circleAttr]);
        });

        return acc;
      }, initializeAttrSets(CIRCLE_ATTR_NAMES));
    default:
      return {};
  }
};

/**
 * inferPresentationalAttributes aggregates all unique presentational attributes
 * (e.g. all unique values of 'fill', 'stroke', etc.) found in the svg subtree.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @returns – a dictionary mapping presentational attributes to Sets containing their unique values
 * present in the svg subtree.
 */
export const inferPresentationalAttributes = (
  elements: RevizDatum[]
): Record<string, Set<string>> => {
  return elements.reduce((acc, el) => {
    PRES_ATTR_NAMES.forEach((presAttr) => {
      acc[presAttr].add(el.presAttrs[presAttr]);
    });

    return acc;
  }, initializeAttrSets(PRES_ATTR_NAMES));
};

/**
 * inferXScaleType determines the type of the xAxis scale, either discrete or continuous.
 * The algorithm works by grouping all text elements by their y position and finding
 * the group that has the greatest length. Since xAxis values are likely to have identical
 * y positions in most visualizations, we make the assumption that the group with the
 * greatest length pertains to the xAxis values. We then use the same heuristic as Plot to
 * deduce 'continuous' vs. 'discrete' scale types:
 *
 * - Numeric values pertain to a continuous scale
 * - All other values are considered discrete scales
 *
 * We intentionally don't have support for continuous date ranges yet, because we do not
 * support chart types (mainly line charts) that would use this scale type.
 *
 * @param text - the array of normalized RevizTextDatum elements.
 * @returns - the scale type of the x axis, either 'continuous' or 'discrete'.
 */
export const inferXScaleType = (
  text: RevizTextDatum[]
): 'continuous' | 'discrete' => {
  const groups = groupBy(text, (d) => d.y);

  const xAxis = Object.values(groups).reduce<string[]>((acc, group) => {
    if (group.length > acc.length) {
      acc = group.map((d) => d.text);
    }

    return acc;
  }, []);

  const areAxisValuesNumeric = xAxis.every(
    (label) => !Number.isNaN(parseInt(label, 10) || parseFloat(label))
  );

  return areAxisValuesNumeric ? 'continuous' : 'discrete';
};

export interface VizAttrs {
  markType: 'circle' | 'rect';
  geomAttrs: Record<string, Set<string>>;
  presAttrs: Record<string, Set<string>>;
  xScaleType: 'continuous' | 'discrete';
  data: RevizDatum[];
}

/**
 * inferVizAttributes takes in an array of elements from an svg subtree and
 * produces a normalized schema outlining all unique geometric and presentational
 * attributes of the subtree.
 *
 * @param data – the normalized RevizData derived from elements.
 * @returns - an object representing the normalized schema of a visualization.
 */
export const inferVizAttributes = (
  data: RevizDatum[],
  text: RevizTextDatum[]
): VizAttrs => {
  const markType = inferMarkType(data);
  const markData = data.filter((d) => d.nodeName === markType);

  const geomAttrs = inferGeometricAttributes(markData, markType);
  const presAttrs = inferPresentationalAttributes(markData);
  const xScaleType = inferXScaleType(text);

  return {
    markType,
    geomAttrs,
    presAttrs,
    xScaleType,
    data: markData,
  };
};
