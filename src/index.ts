import { collectDataAttributes, collectTextAttributes } from './attributes';
import { inferVizAttributes } from './inference';
import { buildVizSpec } from './ir';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elements = walk(root);

  const dataAttrs = collectDataAttributes(elements);
  const textAttrs = collectTextAttributes(elements);
  const vizAttrs = inferVizAttributes(dataAttrs, textAttrs);

  const vizSpec = buildVizSpec(vizAttrs);
  console.log({ vizSpec });
}
