import { collectAllAttributes } from './attributes';
import { inferVizAttributes } from './inference';
import { buildVizSpec, generate } from './spec';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elements = walk(root);
  const data = collectAllAttributes(elements);
  const vizAttrs = inferVizAttributes(data);
  const vizSpec = buildVizSpec(vizAttrs);
  // vizSpec.type = 'Histogram'; // doesn't catch histogram vs bar chart!
  const template = generate(vizSpec);
  console.log({ vizSpec, template });
  // console.log(template({ x: 'stopping time', y: 'frequency (%)' })); // histogram
  console.log(template({ x: 'economy (mpg)', y: 'power (hp)' }));
}
