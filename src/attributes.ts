import {
  CIRCLE_ATTR_NAMES,
  GeomAttrNames,
  PresAttrNames,
  PRES_ATTR_NAMES,
  RECT_ATTR_NAMES,
} from './constants';
import { WalkCallback } from './walk';

export type AttrSets<T extends string = string> = Map<T, Set<string>>;

export const initializeAttrSets = <T extends string = string>(
  attrs: ReadonlyArray<T>
): AttrSets<T> => {
  return attrs.reduce((acc, attr) => {
    acc.set(attr, new Set());

    return acc;
  }, new Map<T, Set<string>>());
};

export const collectMarkType =
  (markTypes: string[]): WalkCallback =>
  (element): void => {
    markTypes.push(element.nodeName);
  };

const readAttrs = <T extends string = string>(
  element: Element,
  attrs: ReadonlyArray<T>,
  attrSets: AttrSets<T>
): void => {
  attrs.forEach((attr) => {
    const value = element.getAttribute(attr);

    if (value) {
      attrSets.get(attr)?.add(value);
    } else {
      const computedStyles = window.getComputedStyle(element);
      const computedValue = computedStyles.getPropertyValue(attr);

      attrSets.get(attr)?.add(computedValue);
    }
  });
};

export const collectGeomAttrs =
  (geomAttrs: AttrSets<GeomAttrNames>): WalkCallback =>
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
  (presAttrs: AttrSets<PresAttrNames>): WalkCallback =>
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
      return undefined;
    }

    const { x, y } = element.getBoundingClientRect();
    const text = element.textContent;

    // We arbitrarily limit text position precision to 3 decimal places.
    textAttrs.push({
      x: x.toFixed(3),
      y: y.toFixed(3),
      text: text ?? '',
    });
  };

export type RevizCirclePositionDatum = { type: 'circle'; cy: string };
export type RevizRectPositionDatum = { type: 'rect'; x: string };
export type RevizPositionDatum =
  | RevizCirclePositionDatum
  | RevizRectPositionDatum;

export const collectPositionAttrs =
  (data: RevizPositionDatum[]): WalkCallback =>
  (element): void => {
    const nodeName = element.nodeName;

    switch (nodeName) {
      case 'circle':
        {
          const cySet = new Set<string>();
          readAttrs(element, <const>['cy'], new Map([['cy', cySet]]));

          data.push({
            type: 'circle',
            cy: Array.from(cySet)[0],
          });
        }
        break;
      case 'rect':
        {
          const xSet = new Set<string>();
          readAttrs(element, <const>['x'], new Map([['x', xSet]]));

          data.push({
            type: 'rect',
            x: Array.from(xSet)[0],
          });
        }
        break;
      default:
        break;
    }
  };
