import { collectAttributes, RevizDatum } from './attributes';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const data: RevizDatum[] = [];
  const collectElementAttributes = collectAttributes(data);

  walk(root, [collectElementAttributes]);

  console.log({ data });
}
