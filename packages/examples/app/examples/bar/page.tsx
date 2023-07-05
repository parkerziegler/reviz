import * as React from 'react';
import type { Metadata } from 'next';

import RevizBarChart from '../../../src/components/charts/BarChart';
import Visualization from '../../../src/components/shared/Visualization';
import type { Letter } from '../../../src/data/alphabet';
import { readData } from '../../../src/helpers/server';

export const metadata: Metadata = {
  title: 'reviz: Bar Chart',
  description:
    'The reviz compiler can reverse engineer bar charts from the DOM, such as this example from the Observable team.',
};

const BarChart: React.FC = () => {
  const data = readData<Letter>('alphabet');

  return (
    <Visualization
      href="https://observablehq.com/@d3/bar-chart/2"
      title="From D3 on Observable — Bar Chart"
    >
      <RevizBarChart data={data} />
    </Visualization>
  );
};

export default BarChart;
