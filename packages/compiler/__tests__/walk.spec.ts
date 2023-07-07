/**
 * @jest-environment jsdom
 */
import * as Plot from '@observablehq/plot';

import { walk } from '../src/walk';

import { getRandInt } from './test-utils';

const NUM_NODES = 100;
const PLOT_SUPPLIED_NODE_COUNT = 15;
const PLOT_DEFAULT_WIDTH = 640;
const PLOT_DEFAULT_HEIGHT = 400;

const createSubtree = (): Node => {
  const data = new Array(NUM_NODES).fill({
    x: getRandInt(PLOT_DEFAULT_WIDTH),
    y: getRandInt(PLOT_DEFAULT_HEIGHT),
  });

  const plot = Plot.dot(data, { x: 'x', y: 'y' }).plot();

  return plot;
};

describe('walk', () => {
  let subtree: Node;

  beforeEach(() => {
    subtree = createSubtree();
  });

  it('invokes supplied callbacks on every node in the subtree', () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    walk(subtree, [cb1, cb2]);

    expect(cb1).toHaveBeenCalledTimes(NUM_NODES + PLOT_SUPPLIED_NODE_COUNT);
    expect(cb2).toHaveBeenCalledTimes(NUM_NODES + PLOT_SUPPLIED_NODE_COUNT);
  });

  it('ignores Nodes that are not Elements', () => {
    // Create alternate types of nodes that walk should ignore.
    subtree.appendChild(document.createTextNode('Text Node'));

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    walk(subtree, [cb1, cb2]);

    expect(cb1).toHaveBeenCalledTimes(NUM_NODES + PLOT_SUPPLIED_NODE_COUNT);
    expect(cb2).toHaveBeenCalledTimes(NUM_NODES + PLOT_SUPPLIED_NODE_COUNT);
  });
});
