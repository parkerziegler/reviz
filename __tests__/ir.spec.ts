import { buildVizSpec } from '../src/ir';

import {
  generatePointDataset,
  defaultPresAttrs,
  generateRectDataset,
} from './test-utils';

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

        // Construct visualization attributes that would be inferred
        // by our TreeWalker implementation.
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

        // Assert that we correctly infer the type of the visualization
        // (Scatterplot) and build the visualization specification.
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

        // Construct visualization attributes that would be inferred
        // by our TreeWalker implementation.
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

        // Assert that we correctly infer the type of the visualization
        // (Strip Plot) and build the visualization specification.
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
      3. Sibling elements with any variance in cy attributes
      `, () => {
        // Generate a semi-random bubble chart dataset.
        const points = generatePointDataset(100, {
          createLanes: false,
          varyRadius: true,
        });

        // Construct visualization attributes that would be inferred
        // by our TreeWalker implementation.
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

        // Assert that we correctly infer the type of the visualization
        // (Bubble Chart) and build the visualization specification.
        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'BubbleChart',
          r: Array.from(new Set(points.map((d) => +d.r))),
          ...defaultPresAttrs,
        });
      });
    });

    describe('BarChart', () => {
      it(`should infer a BarChart for charts with:
      1. markType === 'rect',
      2. A consistent width attribute for all marks,
      3. A discrete xScale
      `, () => {
        // Generate a semi-random bar chart dataset.
        const rects = generateRectDataset();

        // Construct visualization attributes that would be inferred
        // by our TreeWalker implementation.
        const vizAttrs = {
          markType: 'rect' as const,
          xScaleType: 'discrete' as const,
          geomAttrs: new Map<string, Set<string>>([
            ['x', new Set(rects.map((d) => d.x.toString()))],
            ['y', new Set(rects.map((d) => d.y.toString()))],
            ['width', new Set(rects.map((d) => d.width.toString()))],
            ['height', new Set(rects.map((d) => d.height.toString()))],
          ]),
          presAttrs: new Map(),
          positionAttrs: rects.map((d) => {
            return {
              type: 'rect' as const,
              x: d.x.toString(),
            };
          }),
        };

        // Assert that we correctly infer the type of the visualization
        // (Bar Chart) and build the visualization specification.
        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'BarChart',
          width: +rects[0].width,
          ...defaultPresAttrs,
        });
      });
    });

    describe('Histogram', () => {
      it(`should infer a Histogram for charts with:
      1. markType === 'rect',
      2. A consistent width attribute for all marks,
      3. A continuous xScale
      `, () => {
        // Generate a semi-random histogram dataset.
        const rects = generateRectDataset();

        // Construct visualization attributes that would be inferred
        // by our TreeWalker implementation.
        const vizAttrs = {
          markType: 'rect' as const,
          xScaleType: 'continuous' as const,
          geomAttrs: new Map<string, Set<string>>([
            ['x', new Set(rects.map((d) => d.x.toString()))],
            ['y', new Set(rects.map((d) => d.y.toString()))],
            ['width', new Set(rects.map((d) => d.width.toString()))],
            ['height', new Set(rects.map((d) => d.height.toString()))],
          ]),
          presAttrs: new Map(),
          positionAttrs: rects.map((d) => {
            return {
              type: 'rect' as const,
              x: d.x.toString(),
            };
          }),
        };

        // Assert that we correctly infer the type of the visualization
        // (Histogram) and build the visualization specification.
        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'Histogram',
          width: +rects[0].width,
          ...defaultPresAttrs,
        });
      });
    });

    describe('StackedBarChart', () => {
      it(`should infer a StackedBarChart for charts with:
      1. markType === 'rect',
      2. A consistent width attribute for all marks,
      3. A discrete xScale,
      4. Multiple sibling elements with the same x attribute,
      5. The same number of sibling elements with a common x attribute
      `, () => {
        // Generate a semi-random stacked bar chart dataset.
        const rects = generateRectDataset(100, { createLanes: true });

        // Construct visualization attributes that would be inferred
        // by our TreeWalker implementation.
        const vizAttrs = {
          markType: 'rect' as const,
          xScaleType: 'discrete' as const,
          geomAttrs: new Map<string, Set<string>>([
            ['x', new Set(rects.map((d) => d.x.toString()))],
            ['y', new Set(rects.map((d) => d.y.toString()))],
            ['width', new Set(rects.map((d) => d.width.toString()))],
            ['height', new Set(rects.map((d) => d.height.toString()))],
          ]),
          presAttrs: new Map(),
          positionAttrs: rects.map((d) => {
            return {
              type: 'rect' as const,
              x: d.x.toString(),
            };
          }),
        };

        // Assert that we correctly infer the type of the visualization
        // (Stacked Bar Chart) and build the visualization specification.
        expect(buildVizSpec(vizAttrs)).toEqual({
          type: 'StackedBarChart',
          width: +rects[0].width,
          ...defaultPresAttrs,
        });
      });
    });
  });
});
