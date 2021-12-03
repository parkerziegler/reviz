import {
  CIRCLE_ATTR_NAMES,
  PRES_ATTR_NAMES,
  RECT_ATTR_NAMES,
} from './constants';
import { WalkCallback } from './walk';

export interface RevizDatum {
  nodeName: string;
  geomAttrs: Record<string, string>;
  presAttrs: Record<string, string>;
}

export type AttrSets = Record<string, Set<string>>;

export const initializeAttrSets = (attrs: string[]): AttrSets => {
  return attrs.reduce((acc, attr) => {
    acc[attr] = new Set();

    return acc;
  }, {} as AttrSets);
};

export const collectMarkType =
  (markTypes: string[]): WalkCallback =>
  (element): void => {
    markTypes.push(element.nodeName);
  };

const readAttrs = (
  element: Element,
  attrs: string[],
  attrSets: AttrSets
): void => {
  attrs.forEach((attr) => {
    const value = element.getAttribute(attr);

    if (value) {
      attrSets[attr].add(value);
    } else {
      const computedStyles = window.getComputedStyle(element);
      const computedValue = computedStyles.getPropertyValue(attr);

      attrSets[attr].add(computedValue);
    }
  });
};

export const collectGeomAttrs =
  (geomAttrs: AttrSets): WalkCallback =>
  (element): void => {
    const nodeName = element.nodeName;

    switch (nodeName) {
      case 'circle':
        readAttrs(element, CIRCLE_ATTR_NAMES, geomAttrs);
        break;
      case 'rect':
        readAttrs(element, RECT_ATTR_NAMES, geomAttrs);
        break;
      default:
        break;
    }
  };

export const collectPresAttrs =
  (presAttrs: AttrSets): WalkCallback =>
  (element): void => {
    const nodeName = element.nodeName;

    switch (nodeName) {
      case 'rect':
      case 'circle':
        readAttrs(element, PRES_ATTR_NAMES, presAttrs);
        break;
      default:
        break;
    }
  };

export interface RevizTextDatum {
  x: string;
  y: string;
  text: string;
}

export const collectTextAttrs =
  (textAttrs: RevizTextDatum[]): WalkCallback =>
  (element): void => {
    if (element.nodeName !== 'text') {
      return;
    }

    const { x, y } = element.getBoundingClientRect();
    const text = element.textContent;

    textAttrs.push({
      x: x.toFixed(3),
      y: y.toFixed(3),
      text: text ?? '',
    });
  };

export interface RevizPositionDatum {
  x?: string;
  cy?: string;
}

export const collectPositionAttrs =
  (data: RevizPositionDatum[]): WalkCallback =>
  (element): void => {
    const nodeName = element.nodeName;

    switch (nodeName) {
      case 'circle':
        {
          const cySet = new Set<string>();
          readAttrs(element, ['cy'], { cy: cySet });

          data.push({
            cy: Array.from(cySet)[0],
          });
        }
        break;
      case 'rect':
        {
          const xSet = new Set<string>();
          readAttrs(element, ['x'], { x: xSet });

          data.push({
            x: Array.from(xSet)[0],
          });
        }
        break;
      default:
        break;
    }
  };
