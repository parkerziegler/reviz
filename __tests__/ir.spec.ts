import { buildVizSpec } from '../src/ir';

import {
  generatePointDataset,
  defaultPresAttrs,
  generateRectDataset,
} from './test-utils';

describe('buildVizSpec', () => {
  describe('Scatterplot', () => {
    it(`should infer a Scatterplot for charts with:
      - markType === 'circle'
      - A consistent radius attribute for all marks
      - Sibling elements with vartion in the cy attribute
    `, () => {
      const points = generatePointDataset();

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
        - markType === 'circle'
        - A consistent radius attribute for all marks,
        - Sibling elements with a consistent cy attribute
      `, () => {
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
      - markType === 'circle'
      - A divergent radius attribute for marks
      - Sibling elements with any variation in the cy attribute
      `, () => {
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
        r: Array.from(new Set(points.map((d) => +d.r))),
        ...defaultPresAttrs,
      });
    });
  });

  describe('BarChart', () => {
    it(`should infer a BarChart for charts with:
      - markType === 'rect'
      - A consistent width attribute for all marks
      - A discrete xScale
      `, () => {
      const rects = generateRectDataset();

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

      expect(buildVizSpec(vizAttrs)).toEqual({
        type: 'BarChart',
        width: +rects[0].width,
        ...defaultPresAttrs,
      });
    });
  });

  describe('Histogram', () => {
    it(`should infer a Histogram for charts with:
      - markType === 'rect'
      2. A consistent width attribute for all marks,
      3. A continuous xScale
      `, () => {
      const rects = generateRectDataset();

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
      const rects = generateRectDataset(100, { createLanes: true });

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

      expect(buildVizSpec(vizAttrs)).toEqual({
        type: 'StackedBarChart',
        width: +rects[0].width,
        ...defaultPresAttrs,
      });
    });
  });

  it('should forward all presentational attributes to the visualization specification', () => {
    const points = generatePointDataset();

    const vizAttrs = {
      markType: 'circle' as const,
      xScaleType: 'continuous' as const,
      geomAttrs: new Map<string, Set<string>>([
        ['cx', new Set(points.map((d) => d.cx.toString()))],
        ['cy', new Set(points.map((d) => d.cy.toString()))],
        ['r', new Set(points.map((d) => d.r.toString()))],
      ]),
      presAttrs: new Map([
        ['fill', new Set(['steelblue', 'orange'])],
        ['stroke', new Set(['#000000', '#ffffff'])],
        ['fill-opacity', new Set(['0.25', '0.5', '1'])],
      ]),
      positionAttrs: points.map((d) => {
        return {
          type: 'circle' as const,
          cy: d.cy.toString(),
        };
      }),
    };

    expect(buildVizSpec(vizAttrs)).toHaveProperty('fill', [
      'steelblue',
      'orange',
    ]);
    expect(buildVizSpec(vizAttrs)).toHaveProperty('stroke', [
      '#000000',
      '#ffffff',
    ]);
    expect(buildVizSpec(vizAttrs)).toHaveProperty('fill-opacity', [
      '0.25',
      '0.5',
      '1',
    ]);
  });
});
