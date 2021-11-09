import { collectAttributes } from './attributes';
import {
  inferMarkType,
  inferGeometricAttributes,
  inferPresentationalAttributes,
} from './inference';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elements = walk(root);
  const data = collectAttributes(elements);

  const markType = inferMarkType(data);
  const marks = data.filter((d) => d.nodeName === markType);
  const geomAttrs = inferGeometricAttributes(marks, markType);
  const presAttrs = inferPresentationalAttributes(marks);

  console.log({ data, markType, geomAttrs, presAttrs });
}
