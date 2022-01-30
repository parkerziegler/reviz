import { inferXScaleType } from '../src/scales';

import { getRandChar, getRandInt } from './test-utils';

describe('scales', () => {
  describe('inferXScaleType', () => {
    it('should infer the xScaleType as continuous for numeric axis values', () => {
      const textAttrs = new Array(50).fill({
        x: getRandInt(),
        y: getRandInt(),
        text: `${getRandInt()}`,
      });

      expect(inferXScaleType(textAttrs)).toBe('continuous');
    });

    it('should treat strings with leading numbers as numeric', () => {
      const textAttrs = new Array(50).fill({
        x: 0,
        y: 0,
        text: `${getRandInt()}px`,
      });

      expect(inferXScaleType(textAttrs)).toBe('continuous');
    });

    it('should infer the xScaleType as discrete for all non-numeric axis values', () => {
      const textAttrs = new Array(50).fill({
        x: 0,
        y: 0,
        text: getRandChar(),
      });

      expect(inferXScaleType(textAttrs)).toBe('discrete');
    });

    it('should only read text values from text nodes with the mode y value', () => {
      const axisValues = new Array(30).fill({
        x: 0,
        y: 0,
        text: `${getRandInt()}`,
      });

      // Add an additional 20 "noisy" characters to represent text features like labels.
      const labels = new Array(20).fill({
        x: getRandInt(),
        y: getRandInt(),
        text: getRandChar(),
      });

      // Expect the scale to be continuous because axisValues are all numeric.
      expect(inferXScaleType(axisValues.concat(labels))).toBe('continuous');
    });
  });
});
