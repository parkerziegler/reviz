import { readFileSync } from 'node:fs';
import path from 'node:path';

import type { Metadata } from 'next';
import * as d3 from 'd3';

import RevizStripPlot from '../../../src/components/charts/StripPlot';
import Visualization from '../../../src/components/shared/Visualization';
import { State } from '../../../src/data/states';

export const metadata: Metadata = {
  title: 'reviz: Strip Plot',
  description:
    'The reviz compiler can reverse engineer strip plots from the DOM, such as this example from the Observable team.',
};

const StripPlot: React.FC = () => {
  const stateage = readFileSync(
    path.join(process.cwd(), 'src/data/us-distribution-state-age.csv')
  );
  const data = d3.csvParse<State, keyof State>(stateage.toString(), (d) => {
    return {
      state: d.state,
      age: d.age,
      population: +d.population,
    };
  });

  return (
    <Visualization
      title="From D3 on Observable — Dot Strip Plot"
      href="https://observablehq.com/@d3/dot-strip-plot"
    >
      <RevizStripPlot data={data} />
    </Visualization>
  );
};

export default StripPlot;
