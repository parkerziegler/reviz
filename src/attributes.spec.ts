/**
 * @jest-environment jsdom
 */
import {
  initializeAttrSets,
  collectGeomAttrs,
  collectPresAttrs,
} from './attributes';
import {
  ATTR_NAMES,
  CIRCLE_ATTR_NAMES,
  OBSERVABLE_DEFAULT_R,
} from './constants';

describe('attributes', () => {
  describe('initializeAttrSets', () => {
    it('should initialize a Map with keys being attribute names and values being empty Sets', () => {
      const attrSets = initializeAttrSets(ATTR_NAMES);

      for (const entry in attrSets.entries()) {
        expect(ATTR_NAMES.includes(entry[0] as typeof ATTR_NAMES[number])).toBe(
          true
        );
        expect(entry[1]).toEqual(new Set());
      }
    });
  });

  describe('collectGeomAttrs', () => {
    it('should read attributes directly off of the visited Element', () => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      const cx = Math.floor(Math.random() * 100).toString();
      const cy = Math.floor(Math.random() * 100).toString();
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', OBSERVABLE_DEFAULT_R.toString());

      const attrSets = initializeAttrSets(CIRCLE_ATTR_NAMES);

      collectGeomAttrs(attrSets)(circle);

      expect(attrSets).toEqual(
        new Map([
          ['cx', new Set([cx])],
          ['cy', new Set([cy])],
          ['r', new Set([OBSERVABLE_DEFAULT_R.toString()])],
        ])
      );
    });

    it("should read attributes off of an Element's computedStyle", () => {
      const getPropertyValueMock = jest.fn().mockReturnValue('0');
      const spyGetComputedStyle = jest
        .spyOn(window, 'getComputedStyle')
        .mockReturnValue({
          getPropertyValue: getPropertyValueMock,
        } as unknown as CSSStyleDeclaration);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('cx', '0');

      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circle.setAttribute('cy', '5');
      circle.setAttribute('r', OBSERVABLE_DEFAULT_R.toString());

      svg.appendChild(circle);

      const attrSets = initializeAttrSets(CIRCLE_ATTR_NAMES);
      collectGeomAttrs(attrSets)(circle);

      expect(spyGetComputedStyle).toHaveBeenCalledWith(circle);
      expect(getPropertyValueMock).toHaveBeenCalledWith('cx');
    });
  });

  describe('collectPresAttrs', () => {
    it('should read attributes directly off of the visited Element', () => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      const fill = 'steelblue';
      const stroke = '#7b16ff';
      circle.setAttribute('fill', fill);
      circle.setAttribute('stroke', stroke);

      const attrSets = initializeAttrSets(['fill', 'stroke']);

      collectPresAttrs(attrSets)(circle);

      expect(attrSets).toEqual(
        new Map([
          ['fill', new Set([fill])],
          ['stroke', new Set([stroke])],
        ])
      );
    });

    it("should read attributes off of an Element's computedStyle", () => {
      const getPropertyValueMock = jest.fn().mockReturnValue('0.5');
      const spyGetComputedStyle = jest
        .spyOn(window, 'getComputedStyle')
        .mockReturnValue({
          getPropertyValue: getPropertyValueMock,
        } as unknown as CSSStyleDeclaration);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('fill-opacity', '0.5');

      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      const fill = 'steelblue';
      const stroke = '#7b16ff';
      circle.setAttribute('fill', fill);
      circle.setAttribute('stroke', stroke);

      svg.appendChild(circle);

      const attrSets = initializeAttrSets(['fill', 'stroke', 'fill-opacity']);
      collectPresAttrs(attrSets)(circle);

      expect(spyGetComputedStyle).toHaveBeenCalledWith(circle);
      expect(getPropertyValueMock).toHaveBeenCalledWith('fill-opacity');
    });
  });
});
