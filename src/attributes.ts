import {
  CIRCLE_ATTR_NAMES,
  PRES_ATTR_NAMES,
  RECT_ATTR_NAMES,
} from './constants';

export interface RevizDatum {
  nodeName: string;
  geomAttrs: Record<string, string>;
  presAttrs: Record<string, string>;
}

/**
 * collectAttributes will collect a set of attributes off an Element,
 * checking both attributes from the DOM and computed styles.
 *
 * @param element – the element to inspect.
 * @param attrs – the names of attributes to aggregate
 * @returns
 */
function collectAttributes(
  element: Element,
  attrs: string[]
): Record<string, string> {
  return attrs.reduce((acc, attr) => {
    const value = element.getAttribute(attr);

    if (value) {
      acc[attr] = value;
    } else {
      const computedStyles = window.getComputedStyle(element);
      const computedValue = computedStyles.getPropertyValue(attr);

      acc[attr] = computedValue;
    }

    return acc;
  }, {} as Record<string, string>);
}

/**
 * collectDataAttributes aggregates all geometric and presentational attributes of all
 * element in the svg subtree into a normalized schema, RevizDatum.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @returns – the array of normalized RevizDatum elements.
 */
export function collectDataAttributes(elements: Element[]): RevizDatum[] {
  return elements.map((element) => {
    const nodeName = element.nodeName;

    let geomAttrNames: string[] = [];

    switch (nodeName) {
      case 'circle':
        geomAttrNames = CIRCLE_ATTR_NAMES;
        break;
      case 'rect':
        geomAttrNames = RECT_ATTR_NAMES;
        break;
      default:
        break;
    }

    const geomAttrs = collectAttributes(element, geomAttrNames);
    const presAttrs = collectAttributes(element, PRES_ATTR_NAMES);

    const datum = {
      nodeName,
      geomAttrs,
      presAttrs,
    };

    return datum;
  });
}

export interface RevizTextDatum {
  x: string;
  y: string;
  text: string;
}

/**
 * collectTextAttributes looks at all <text> elements of the svg subtree and
 * captures their pixel locations (relative to the viewport) and text content.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @returns - the array of normalized RevizTextDatum elements.
 */
export function collectTextAttributes(elements: Element[]): RevizTextDatum[] {
  const textElements = elements.filter(
    (element) => element.nodeName === 'text'
  );

  return textElements.map((element) => {
    const { x, y } = element.getBoundingClientRect();
    const text = element.textContent;

    return {
      x: x.toFixed(3),
      y: y.toFixed(3),
      text: text ?? '',
    };
  });
}
