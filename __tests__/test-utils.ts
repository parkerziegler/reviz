import chunk from 'lodash.chunk';

/**
 * Generate a random character from A-Z using ASCII codes.
 *
 * @returns – a random character in the set {A...Z}.
 */
export const getRandChar = (): string =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

/**
 * Generate a random integer in the range [1, max).
 *
 * @param max - the upper bound of the random integer to generate.
 * @returns - a random integer in the range [1, max).
 */
export const getRandInt = (max = 1000): number =>
  Math.floor(Math.random() * max) + 1;

interface Point {
  cx: string;
  cy: string;
  r: string;
}

const DEFAULT_RADIUS = 3;

/**
 * Generate a random dataset of points to simulate circle-based charts.
 *
 * @param - the maximum number of points to generate.
 * @param - options to control the generation of the dataset.
 *  createLanes – place points in "lanes" (shared cy attribute) to simulate strip plots.
 *  varyRadius – vary the radius of points to simulate bubble charts.
 *
 * @returns – a Point dataset.
 */
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

interface Rect {
  x: string;
  y: string;
  width: string;
  height: string;
}

/**
 * Generate a random dataset of rectangles to simulate rect-based charts.
 *
 * @param max - the maximum number of rectangles to generate.
 * @returns – a Rect dataset.
 */
export const generateRectDataset = (max = 100): Rect[] => {
  // Define a standard width and y to use for all rects.
  const width = getRandInt().toString();
  const y = (1000 - getRandInt()).toString(); // Simulate all bars having the same baseline in SVG.

  // Generate a semi-random rect dataset.
  const rects = new Array(getRandInt(max)).fill(undefined).map(() => {
    return {
      x: getRandInt().toString(),
      y,
      width,
      height: getRandInt().toString(),
    };
  });

  return rects;
};

// Default presentational attributes for tests.
export const defaultPresAttrs = {
  fill: [],
  'fill-opacity': [],
  stroke: [],
  'stroke-opacity': [],
  'stroke-width': [],
};
