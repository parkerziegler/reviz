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
 * aggregateAttributes will collect a set of attributes off an Element,
 * checking both attributes from the DOM and computed styles.
 *
 * @param element – the element to inspect.
 * @param attrs
 * @returns
 */
function aggregateAttributes(
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
 * collectAttributes aggregates all geometric and presentational attributes of all
 * element in the svg subtree into a normalized schema, RevizDatum.
 *
 * @param elements – the array of elements obtained from walking the svg subtree.
 * @returns – the array of normalized RevizDatum elements.
 */
export function collectAttributes(elements: Element[]): RevizDatum[] {
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

    const geomAttrs = aggregateAttributes(element, geomAttrNames);
    const presAttrs = aggregateAttributes(element, PRES_ATTR_NAMES);

    const datum = {
      nodeName,
      geomAttrs,
      presAttrs,
    };

    return datum;
  });
}
