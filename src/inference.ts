import * as d3 from 'd3';

import type { RevizDatum } from './attributes';
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
  return attrs.reduce((acc, presAttr) => {
    acc[presAttr] = new Set();

    return acc;
  }, {} as Record<string, Set<string>>);
};

/**
 * inferGeometricAttributes aggregates all unique geometric attributes (e.g. all unique values
 * of 'cx', 'width', etc.) found in the svg subtree.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @param elementType – the the core mark type of the visualization, either 'rect' or 'circle'.
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

export interface VizAttrs {
  markType: 'circle' | 'rect';
  geomAttrs: Record<string, Set<string>>;
  presAttrs: Record<string, Set<string>>;
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
export const inferVizAttributes = (data: RevizDatum[]): VizAttrs => {
  const markType = inferMarkType(data);
  const filteredData = data.filter((d) => d.nodeName === markType);
  const geomAttrs = inferGeometricAttributes(filteredData, markType);
  const presAttrs = inferPresentationalAttributes(filteredData);

  return {
    markType,
    geomAttrs,
    presAttrs,
    data: filteredData,
  };
};
