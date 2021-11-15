import { collectDataAttributes, collectTextAttributes } from './attributes';
import { inferVizAttributes } from './inference';
import { buildVizSpec, generate } from './ir';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elements = walk(root);

  const dataAttrs = collectDataAttributes(elements);
  const textAttrs = collectTextAttributes(elements);
  const vizAttrs = inferVizAttributes(dataAttrs, textAttrs);

  const vizSpec = buildVizSpec(vizAttrs);
  // vizSpec.type = 'Histogram'; // doesn't catch histogram vs bar chart!
  const template = generate(vizSpec);
  // eslint-disable-next-line no-console
  console.log({ vizSpec, template });
  // eslint-disable-next-line no-console
  console.log(
    template({
      x: '0-60 mph (s)',
      y: 'power (hp)',
      // stroke: 'orange',
      r: 'economy (mpg)',
    })
  ); // bubble
  // console.log(template({ x: 'stopping time', y: 'frequency (%)' })); // histogram
  // console.log(template({ x: 'economy (mpg)', y: 'power (hp)' })); // scatterplot
}
