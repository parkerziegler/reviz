import * as React from 'react';
import type { Metadata } from 'next';

import RevizBubbleChart from '../../../src/components/charts/BubbleChart';
import Visualization from '../../../src/components/shared/Visualization';
import type { Car } from '../../../src/data/cars';
import { readData } from '../../../src/helpers/server';

export const metadata: Metadata = {
  title: 'reviz: Bubble Chart',
  description:
    'The reviz compiler can reverse engineer bubble charts from the DOM, such as this example from the Observable team.',
};

const BubbleChart: React.FC = () => {
  const data = readData<Car>('cars');

  return (
    <Visualization
      title="From Observable — Plot: Dot"
      href="'https://observablehq.com/@observablehq/plot-dot?collection=@observablehq/plot'"
    >
      <RevizBubbleChart data={data} />
    </Visualization>
  );
};

export default BubbleChart;
