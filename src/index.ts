import { walk } from './walk';
import { collectDataAttributes, collectTextAttributes } from './attributes';
import { inferVizAttributes } from './inference';
import { buildVizSpec, VizSpec } from './ir';
import { generate } from './generate';

interface Output {
  spec: VizSpec;
  program: string;
}

export function analyzeVisualization(root: SVGElement): Output {
  const elements = walk(root);

  const dataAttrs = collectDataAttributes(elements);
  const textAttrs = collectTextAttributes(elements);
  const vizAttrs = inferVizAttributes(dataAttrs, textAttrs);

  const vizSpec = buildVizSpec(vizAttrs);
  const program = generate(vizSpec);
  // eslint-disable-next-line no-console
  console.log({ vizSpec, program });

  return {
    spec: vizSpec,
    program: program({ x: '?', y: '?', r: '?', z: '?', basis: '?' }),
  };
}
