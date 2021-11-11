import { collectAllAttributes } from './attributes';
import { inferVizAttributes } from './inference';
import { buildVizSpec } from './spec';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elements = walk(root);
  const data = collectAllAttributes(elements);
  const vizAttrs = inferVizAttributes(data);
  const vizSpec = buildVizSpec(vizAttrs);
  console.log({ vizSpec });
}
