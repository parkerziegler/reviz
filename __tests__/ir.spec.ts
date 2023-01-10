import { buildVizSpec } from '../src/ir';

import { generatePointDataset, defaultPresAttrs } from './test-utils';

describe('IR', () => {
  describe('buildVizSpec', () => {
    describe('Scatterplot', () => {
      it(`should infer a Scatterplot for charts with:
      1. markType === 'circle',
      2. A consistent radius attribute for all marks,
      3. Sibling elements with any variance in cy attributes
    `, () => {
        // Generate a semi-random scatterplot dataset.
        const points = generatePointDataset(100);

        const vizAttrs = {
          markType: 'circle' as const,
          xScaleType: 'continuous' as const,
          geomAttrs: new Map<string, Set<string>>([
            ['cx', new Set(points.map((d) => d.cx.toString()))],
            ['cy', new Set(points.map((d) => d.cy.toString()))],
            ['r', new Set([points[0].r.toString()])],
          ]),
          presAttrs: new Map(),
          positionAttrs: points.map((d) => {
            return {
              type: 'circle' as const,
              cy: d.cy.toString(),
            };
          }),
        };

        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'Scatterplot',
          r: +points[0].r,
          ...defaultPresAttrs,
        });
      });
    });

    describe('StripPlot', () => {
      it(`should infer a StripPlot for charts with:
        1. markType === 'circle',
        2. A consistent radius attribute for all marks,
        3. Sibling elements with consistent cy attributes
      `, () => {
        // Generate a semi-random strip plot dataset.
        // Bin points into "lanes" to simulate the placement of points in a strip plot.
        const points = generatePointDataset(100, {
          createLanes: true,
          varyRadius: false,
        });

        const vizAttrs = {
          markType: 'circle' as const,
          xScaleType: 'continuous' as const,
          geomAttrs: new Map<string, Set<string>>([
            ['cx', new Set(points.map((d) => d.cx.toString()))],
            ['cy', new Set(points.map((d) => d.cy.toString()))],
            ['r', new Set([points[0].r.toString()])],
          ]),
          presAttrs: new Map(),
          positionAttrs: points.map((d) => {
            return {
              type: 'circle' as const,
              cy: d.cy.toString(),
            };
          }),
        };

        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'StripPlot',
          r: +points[0].r,
          ...defaultPresAttrs,
        });
      });
    });

    describe('BubbleChart', () => {
      it(`should infer a BubbleChart for charts with:
      1. markType === 'circle',
      2. A divergent radius attribute for all marks,
      3. Sibling elements with any variance in cy attributes`, () => {
        // Generate a semi-random bubble chart dataset.
        const points = generatePointDataset(100, {
          createLanes: false,
          varyRadius: true,
        });

        const vizAttrs = {
          markType: 'circle' as const,
          xScaleType: 'continuous' as const,
          geomAttrs: new Map<string, Set<string>>([
            ['cx', new Set(points.map((d) => d.cx.toString()))],
            ['cy', new Set(points.map((d) => d.cy.toString()))],
            ['r', new Set(points.map((d) => d.r.toString()))],
          ]),
          presAttrs: new Map(),
          positionAttrs: points.map((d) => {
            return {
              type: 'circle' as const,
              cy: d.cy.toString(),
            };
          }),
        };

        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'BubbleChart',
          r: points.map((d) => +d.r),
          ...defaultPresAttrs,
        });
      });
    });
  });
});
