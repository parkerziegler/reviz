import * as React from 'react';
import type { Metadata } from 'next';

import RevizStackedBarChart from '../../../src/components/charts/StackedBarChart';
import Visualization from '../../../src/components/shared/Visualization';
import type { DeathRecord } from '../../../src/data/crimea';
import { readData } from '../../../src/helpers/server';

export const metadata: Metadata = {
  title: 'reviz: Stacked Bar Chart',
  description:
    'The reviz compiler can reverse engineer stacked bar charts from the DOM, such as this example from the Observable team.',
};

const StackedBarChart: React.FC = () => {
  const data = readData<DeathRecord>('crimea');

  return (
    <Visualization
      title="From D3 on Observable — Stacked Bar Chart"
      href="https://observablehq.com/@d3/stacked-bar-chart/2"
    >
      <RevizStackedBarChart data={data} />
    </Visualization>
  );
};

export default StackedBarChart;
