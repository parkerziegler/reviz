import groupBy from 'lodash.groupby';

import type { RevizTextDatum } from './attributes';

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
 * @param textAttrs - the array of normalized RevizTextDatum elements.
 * @returns - the scale type of the x axis, either 'continuous' or 'discrete'.
 */
export const inferXScaleType = (
  textAttrs: RevizTextDatum[]
): 'continuous' | 'discrete' => {
  const groups = groupBy(textAttrs, (d) => d.y);

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
