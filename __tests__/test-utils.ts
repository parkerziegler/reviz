import chunk from 'lodash.chunk';

/**
 * Generate a random character from A-Z using ASCII codes.
 *
 * @returns – a random character in the set {A...Z}.
 */
export const getRandChar = (): string =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

/**
 * Generate a random integer in the range [0, max).
 *
 * @param max - the upper bound of the random integer to generate.
 * @returns - a random integer in the range [0, max).
 */
export const getRandInt = (max = 1000): number =>
  Math.floor(Math.random() * max);

interface Point {
  cx: string;
  cy: string;
  r: string;
}

const DEFAULT_RADIUS = 3;

export const generatePointDataset = (
  max = 1000,
  { createLanes, varyRadius } = { createLanes: false, varyRadius: false }
): Point[] => {
  // Generate a semi-random point dataset.
  const points = new Array(getRandInt(max)).fill(undefined).map(() => {
    return {
      cx: getRandInt().toString(),
      cy: getRandInt().toString(),
      r: varyRadius ? getRandInt().toString() : DEFAULT_RADIUS.toString(),
    };
  });

  // If creating lanes, partition the dataset into n < max lanes.
  // For each point in a given lane, ensure its cy attribute is
  // consistent with its siblings.
  if (createLanes) {
    // Generate fewer lanes than there are points by dividing max by 4.
    const lanes = chunk(points, getRandInt(max / 4));
    const strips = lanes.flatMap((lane) => {
      // All points in a lane should use the same cy.
      const cy = getRandInt().toString();

      return lane.map((point) => {
        return {
          ...point,
          cy,
        };
      });
    });

    return strips;
  }

  return points;
};

// Default presentational attributes for tests.
export const defaultPresAttrs = {
  fill: [],
  'fill-opacity': [],
  stroke: [],
  'stroke-opacity': [],
  'stroke-width': [],
};
