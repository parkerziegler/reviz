/**
 * @jest-environment jsdom
 */
import {
  initializeAttrSets,
  collectGeomAttrs,
  collectPresAttrs,
  collectTextAttrs,
  RevizTextDatum,
  RevizPositionDatum,
  collectPositionAttrs,
  collectMarkType,
} from './attributes';
import {
  ATTR_NAMES,
  CIRCLE_ATTR_NAMES,
  RECT_ATTR_NAMES,
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

  describe('collectMarkTypes', () => {
    it.each<'circle' | 'rect' | 'text' | 'g' | 'svg'>([
      'circle',
      'rect',
      'text',
      'g',
      'svg',
    ])(
      'should collect the mark type of elements in the svg subtree',
      (nodeName) => {
        const element = document.createElementNS(
          'http://www.w3.org/2000/svg',
          nodeName
        );

        const marks: string[] = [];
        collectMarkType(marks)(element);

        expect(marks).toContain(nodeName);
      }
    );
  });

  describe('collectGeomAttrs', () => {
    it('should read attributes directly off of the visited circle Element', () => {
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

    it("should read attributes off of a circle Element's computedStyle", () => {
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

    it('should read attributes directly off of the visited rect Element', () => {
      const rect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );

      const [width, height, x, y] = new Array(4)
        .fill(undefined)
        .map(() => Math.floor(Math.random() * 100).toString());

      rect.setAttribute('width', width);
      rect.setAttribute('height', height);
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);

      const attrSets = initializeAttrSets(RECT_ATTR_NAMES);

      collectGeomAttrs(attrSets)(rect);

      expect(attrSets).toEqual(
        new Map([
          ['width', new Set([width])],
          ['height', new Set([height])],
          ['x', new Set([x])],
          ['y', new Set([y])],
        ])
      );
    });

    it("should read attributes off of a rect Element's computedStyle", () => {
      const getPropertyValueMock = jest.fn().mockReturnValue('0');
      const spyGetComputedStyle = jest
        .spyOn(window, 'getComputedStyle')
        .mockReturnValue({
          getPropertyValue: getPropertyValueMock,
        } as unknown as CSSStyleDeclaration);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '0');
      svg.setAttribute('height', '0');

      const rect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      rect.setAttribute('x', '200');
      rect.setAttribute('y', '150');

      svg.appendChild(rect);

      const attrSets = initializeAttrSets(RECT_ATTR_NAMES);
      collectGeomAttrs(attrSets)(rect);

      expect(spyGetComputedStyle).toHaveBeenCalledWith(rect);
      expect(getPropertyValueMock).toHaveBeenCalledWith('width');
      expect(getPropertyValueMock).toHaveBeenCalledWith('height');
    });
  });

  describe('collectPresAttrs', () => {
    it.each<'circle' | 'rect'>(['circle', 'rect'])(
      'should read attributes directly off of the visited Element',
      (nodeType) => {
        const node = document.createElementNS(
          'http://www.w3.org/2000/svg',
          nodeType
        );

        const fill = 'steelblue';
        const stroke = '#7b16ff';
        node.setAttribute('fill', fill);
        node.setAttribute('stroke', stroke);

        const attrSets = initializeAttrSets(['fill', 'stroke']);

        collectPresAttrs(attrSets)(node);

        expect(attrSets).toEqual(
          new Map([
            ['fill', new Set([fill])],
            ['stroke', new Set([stroke])],
          ])
        );
      }
    );

    it.each<'circle' | 'rect'>(['circle', 'rect'])(
      "should read attributes off of an Element's computedStyle",
      (nodeName) => {
        const getPropertyValueMock = jest.fn().mockReturnValue('0.5');
        const spyGetComputedStyle = jest
          .spyOn(window, 'getComputedStyle')
          .mockReturnValue({
            getPropertyValue: getPropertyValueMock,
          } as unknown as CSSStyleDeclaration);

        const svg = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        svg.setAttribute('fill-opacity', '0.5');

        const node = document.createElementNS(
          'http://www.w3.org/2000/svg',
          nodeName
        );

        const fill = 'steelblue';
        const stroke = '#7b16ff';
        node.setAttribute('fill', fill);
        node.setAttribute('stroke', stroke);

        svg.appendChild(node);

        const attrSets = initializeAttrSets(['fill', 'stroke', 'fill-opacity']);
        collectPresAttrs(attrSets)(node);

        expect(spyGetComputedStyle).toHaveBeenCalledWith(node);
        expect(getPropertyValueMock).toHaveBeenCalledWith('fill-opacity');
      }
    );
  });

  describe('collectTextAttrs', () => {
    it('should collect position and textContent of text nodes from the DOM', () => {
      const textAttrs: RevizTextDatum[] = [];
      const text = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      text.textContent = 'Feb.';
      const position = {
        x: 120,
        y: 50,
        width: 60,
        height: 12,
      };

      // Mock out getBoundingClientRect on the text element.
      text.getBoundingClientRect = jest.fn().mockReturnValue(position);

      collectTextAttrs(textAttrs)(text);

      expect(text.getBoundingClientRect).toHaveBeenCalled();
      expect(textAttrs[0].x).toEqual('120.000');
      expect(textAttrs[0].y).toEqual('50.000');
      expect(textAttrs[0].text).toEqual('Feb.');
    });
  });

  describe('collectPositionAttrs', () => {
    it('should collect the cy position of circle elements', () => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      const cx = Math.floor(Math.random() * 100).toString();
      const cy = Math.floor(Math.random() * 100).toString();
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', OBSERVABLE_DEFAULT_R.toString());

      const data: RevizPositionDatum[] = [];

      collectPositionAttrs(data)(circle);

      expect(data).toContainEqual({ type: 'circle', cy });
    });

    it('should collect the x position of rect elements', () => {
      const rect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );

      const [width, height, x, y] = new Array(4)
        .fill(undefined)
        .map(() => Math.floor(Math.random() * 100).toString());

      rect.setAttribute('width', width);
      rect.setAttribute('height', height);
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);

      const data: RevizPositionDatum[] = [];

      collectPositionAttrs(data)(rect);

      expect(data).toContainEqual({ type: 'rect', x });
    });
  });
});
