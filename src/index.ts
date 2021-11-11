import { collectAttributes } from './attributes';
import { inferVizAttributes } from './inference';
import { determineVizType } from './spec';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elements = walk(root);
  const data = collectAttributes(elements);
  const vizAttrs = inferVizAttributes(data);
  const vizType = determineVizType(vizAttrs);
  console.log({ vizType });
}
