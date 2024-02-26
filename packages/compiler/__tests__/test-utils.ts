import chunk from 'lodash.chunk';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import prettier from 'prettier/standalone';
// @ts-ignore
import babel from 'prettier/parser-babel';
/* eslint-enable @typescript-eslint/ban-ts-comment */

/**
 * Generate a random character from A-Z using ASCII codes.
 *
 * @returns – a random character in the set {A...Z}.
 */
export const getRandChar = (): string =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

/**
 * Generate a random integer in the range [min, max).
 *
 * @param min - the lower bound of the random integer to generate.
 * @param max - the upper bound of the random integer to generate.
 * @returns - a random integer in the range [min, max).
 */
export const getRandInt = (min = 0, max = 1000): number =>
  Math.floor(Math.random() * max) + min;

interface Point {
  cx: string;
  cy: string;
  r: string;
}

const DEFAULT_RADIUS = 3;

/**
 * Generate a random dataset of points to simulate circle-based charts.
 *
 * @param max - the maximum number of points to generate.
 * @param options - options to control the generation of the dataset.
 *   createLanes – place points in "lanes" (shared cy attribute) to simulate strip plots.
 *   varyRadius – vary the radius of points to simulate bubble charts.
 *
 * @returns – a Point dataset.
 */
export const generatePointDataset = (
  max = 100,
  { createLanes, varyRadius } = { createLanes: false, varyRadius: false }
): Point[] => {
  const numPoints = getRandInt(2, max);

  const points = new Array(numPoints).fill(undefined).map(() => {
    return {
      cx: getRandInt().toString(),
      cy: getRandInt().toString(),
      r: varyRadius ? getRandInt().toString() : DEFAULT_RADIUS.toString(),
    };
  });

  // If creating lanes, partition the dataset into n < numPoints lanes.
  // For each point in a given lane, ensure its cy attribute is consistent with its siblings.
  if (createLanes) {
    const lanes = chunk(points, getRandInt(2, numPoints / 4));
    const strips = lanes.flatMap((lane) => {
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
 * @param options - options to control the generation of the dataset.
 *  createLanes – place rects in "lanes" (shared x attribute) to simulate stacked bar charts.
 *
 * @returns – a Rect dataset.
 */
export const generateRectDataset = (
  max = 100,
  { createLanes } = { createLanes: false }
): Rect[] => {
  const numRects = getRandInt(2, max);
  const width = getRandInt();

  // Define a standard baseline to use for all rects.
  const height = getRandInt();
  const y = 1000 - height;

  const rects = new Array(numRects).fill(undefined).map(() => {
    return {
      x: getRandInt().toString(),
      y: y.toString(),
      width: width.toString(),
      height: height.toString(),
    };
  });

  // If creating lanes, partition the dataset into n < numRects lanes.
  // For each rect in a given lane, ensure its x attribute is consistent with its siblings.
  if (createLanes) {
    const numBarsInLane = getRandInt(2, numRects / 4);
    const lanes = chunk(rects, numBarsInLane);

    // Ensure that each lane has the same number of bars.
    if (lanes[lanes.length - 1].length < lanes[0].length) {
      lanes.pop();
    }

    const strips = lanes.reduce((acc, el) => {
      const x = getRandInt().toString();

      // If a lane with this x attribute already exists, skip it.
      if (acc.find((lane) => lane.x === x)) {
        return acc;
      }

      const bars = el.map((rect) => {
        return {
          ...rect,
          x,
          y: (1000 - height).toString(),
        };
      });

      return acc.concat(bars);
    }, []);

    return strips;
  }

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

/**
 * Format a raw program string using Prettier.
 *
 * @param program – the raw program string to format.
 * @returns – the formatted program string.
 */
export const formatProgram = (program: string): string =>
  prettier.format(program, {
    parser: 'babel',
    plugins: [babel],
  });
