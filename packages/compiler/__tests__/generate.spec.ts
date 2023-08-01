import { generate } from '../src/generate';
import type { VizSpec } from '../src/ir';

import { formatProgram, getRandInt } from './test-utils';

describe('generate', () => {
  describe('BarChart and StackedBarChart', () => {
    const defaultSpec: VizSpec = {
      type: 'BarChart',
      width: 20,
      fill: ['steelblue'],
      'fill-opacity': ['0.5'],
      stroke: ['steelblue'],
      'stroke-opacity': ['1'],
      'stroke-width': ['1'],
    };
    let spec: VizSpec = defaultSpec;

    afterEach(() => {
      spec = defaultSpec;
    });

    it.each(['BarChart', 'StackedBarChart'] as const)(
      'should generate a program for a %s from the reviz IR',
      (type) => {
        spec.type = type;

        const expectedProgram = `
          Plot.plot({
            marks: [
              Plot.barY(data, {
                x: '??',
                y: '??',
                fill: 'steelblue',
                fillOpacity: 0.5,
                stroke: 'steelblue',
                strokeOpacity: 1,
                strokeWidth: 1
              })
            ]
          })`;

        const program = generate(spec);

        expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
      }
    );

    it.each(['BarChart', 'StackedBarChart'] as const)(
      `should generate a program for a %s from the reviz IR, creating a
    categorical color scale when fill and stroke values are arrays of length > 1`,
      () => {
        const colors = ['steelblue', 'orange', '#f2d126'];
        spec.fill = spec.stroke = colors;

        const expectedProgram = `
          Plot.plot({
            color: { type: 'categorical', range: ${JSON.stringify(
              colors,
              null,
              2
            )} },
            marks: [
              Plot.barY(data, {
                x: '??',
                y: '??',
                fill: '??',
                fillOpacity: 0.5,
                stroke: '??',
                strokeOpacity: 1,
                strokeWidth: 1
              })
            ]
          })`;

        const program = generate(spec);

        expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
      }
    );
  });

  describe('Histogram', () => {
    it('should generate a program for a Histogram from the reviz IR', () => {
      const spec: VizSpec = {
        type: 'Histogram',
        width: 20,
        fill: ['steelblue'],
        'fill-opacity': ['0.5'],
        stroke: ['steelblue'],
        'stroke-opacity': ['1'],
        'stroke-width': ['1'],
      };

      const expectedProgram = `
        Plot.plot({
          marks: [
            Plot.barY(data, Plot.binX({ y: 'count' }, {
              x: '??',
              fill: 'steelblue',
              fillOpacity: 0.5,
              stroke: 'steelblue',
              strokeOpacity: 1,
              strokeWidth: 1
            }))
          ]
        })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });
  });

  describe('Scatterplot', () => {
    const defaultSpec: VizSpec = {
      type: 'Scatterplot',
      r: 3,
      fill: ['steelblue'],
      'fill-opacity': ['0.5'],
      stroke: ['steelblue'],
      'stroke-opacity': ['1'],
      'stroke-width': ['1'],
    };
    let spec: VizSpec = defaultSpec;

    afterEach(() => {
      spec = defaultSpec;
    });

    it('should generate a program for a Scatterplot from the reviz IR', () => {
      const expectedProgram = `
      Plot.plot({
        marks: [
          Plot.dot(data, {
            x: '??',
            y: '??',
            r: 3,
            fill: 'steelblue',
            fillOpacity: 0.5,
            stroke: 'steelblue',
            strokeOpacity: 1,
            strokeWidth: 1
          })
        ]
      })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });

    it(`should generate a program for a Scatterplot from the reviz IR, creating
    a categorical color scale when fill and stroke values are arrays of length
    > 1`, () => {
      const colors = ['steelblue', 'orange', '#f2d126'];
      spec.fill = spec.stroke = colors;

      const expectedProgram = `
      Plot.plot({
        color: { type: 'categorical', range: ${JSON.stringify(
          colors,
          null,
          2
        )} },
        marks: [
          Plot.dot(data, {
            x: '??',
            y: '??',
            r: 3,
            fill: '??',
            fillOpacity: 0.5,
            stroke: '??',
            strokeOpacity: 1,
            strokeWidth: 1
          })
        ]
      })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });
  });

  describe('BubbleChart', () => {
    const radii: number[] = Array.from(
      new Set(new Array(getRandInt(0, 50)).fill(undefined).map(getRandInt))
    );

    const defaultSpec: VizSpec = {
      type: 'BubbleChart',
      r: radii,
      fill: ['steelblue'],
      'fill-opacity': ['0.5'],
      stroke: ['steelblue'],
      'stroke-opacity': ['1'],
      'stroke-width': ['1'],
    };
    let spec = defaultSpec;

    afterEach(() => {
      spec = defaultSpec;
    });

    it(`should generate a program for a BubbleChart from the reviz IR, mapping
    the marks "r" property to a hole`, () => {
      const expectedProgram = `
      Plot.plot({
        r: { range: [0, ${Math.max(...radii)}] },
        marks: [
          Plot.dot(data, {
            x: '??',
            y: '??',
            r: '??',
            fill: 'steelblue',
            fillOpacity: 0.5,
            stroke: 'steelblue',
            strokeOpacity: 1,
            strokeWidth: 1
          })
        ]
      })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });

    it(`should generate a program for a BubbleChart from the reviz IR, creating
    a categorical color scale when fill and stroke values are arrays of length
    > 1`, () => {
      const colors = ['steelblue', 'orange', '#f2d126'];
      spec.fill = spec.stroke = colors;

      const expectedProgram = `
      Plot.plot({
        color: { type: 'categorical', range: ${JSON.stringify(
          colors,
          null,
          2
        )} },
        r: { range: [0, ${Math.max(...radii)}] },
        marks: [
          Plot.dot(data, {
            x: '??',
            y: '??',
            r: '??',
            fill: '??',
            fillOpacity: 0.5,
            stroke: '??',
            strokeOpacity: 1,
            strokeWidth: 1
          })
        ]
      })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });
  });

  describe('StripPlot', () => {
    const defaultSpec: VizSpec = {
      type: 'StripPlot',
      r: 3,
      fill: ['steelblue'],
      'fill-opacity': ['0.5'],
      stroke: ['steelblue'],
      'stroke-opacity': ['1'],
      'stroke-width': ['1'],
    };
    let spec: VizSpec = defaultSpec;

    afterEach(() => {
      spec = defaultSpec;
    });

    it('should generate a program for a StripPlot from the reviz IR', () => {
      const expectedProgram = `
      Plot.plot({
        marks: [
          Plot.dotX(data, {
            x: '??',
            y: '??',
            r: 3,
            fill: 'steelblue',
            fillOpacity: 0.5,
            stroke: 'steelblue',
            strokeOpacity: 1,
            strokeWidth: 1
          })
        ]
      })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });

    it(`should generate a program for a StripPlot from the reviz IR, creating
    a categorical color scale when fill and stroke values are arrays of length
    > 1`, () => {
      const colors = ['steelblue', 'orange', '#f2d126'];
      spec.fill = spec.stroke = colors;

      const expectedProgram = `
      Plot.plot({
        color: { type: 'categorical', range: ${JSON.stringify(
          colors,
          null,
          2
        )} },
        marks: [
          Plot.dotX(data, {
            x: '??',
            y: '??',
            r: 3,
            fill: '??',
            fillOpacity: 0.5,
            stroke: '??',
            strokeOpacity: 1,
            strokeWidth: 1
          })
        ]
      })`;

      const program = generate(spec);

      expect(formatProgram(program)).toBe(formatProgram(expectedProgram));
    });
  });
});
