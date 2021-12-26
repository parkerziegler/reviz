/**
 * @jest-environment jsdom
 */
import * as Plot from '@observablehq/plot';

import { walk } from './walk';

const NUM_NODES = 100;
const PLOT_SUPPLIED_NODE_COUNT = 13;

const generateRandomInteger = (): number => {
  return Math.floor(Math.random() * 600);
};

const createSubtree = (): Node => {
  const data = new Array(NUM_NODES).fill({
    x: generateRandomInteger(),
    y: generateRandomInteger(),
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
