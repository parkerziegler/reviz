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

const presAttrNames = [
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-opacity',
  'stroke-width',
];

const circleAttrNames = ['cx', 'cy', 'r'];
const rectAttrNames = ['x', 'y', 'width', 'height'];

/**
 *
 * @param data – an array in which to store normalized RevizData.
 * @returns – a function to collect attributes of interest off a given element.
 */
export function collectAttributes(data: RevizDatum[]) {
  return function collectElementAttributes(element: Element): void {
    const nodeName = element.nodeName;

    let geomAttrNames: string[] = [];

    switch (nodeName) {
      case 'circle':
        geomAttrNames = circleAttrNames;
        break;
      case 'rect':
        geomAttrNames = rectAttrNames;
        break;
      default:
        break;
    }

    const geomAttrs = aggregateAttributes(element, geomAttrNames);
    const presAttrs = aggregateAttributes(element, presAttrNames);

    const datum = {
      nodeName,
      geomAttrs,
      presAttrs,
    };

    data.push(datum);
  };
}
