import * as React from 'react';
import type { Metadata } from 'next';

import RevizScatterplot from '../../../src/components/charts/Scatterplot';
import Visualization from '../../../src/components/shared/Visualization';
import type { Athlete } from '../../../src/data/athletes';
import { readData } from '../../../src/helpers/server';

export const metadata: Metadata = {
  title: 'reviz: Scatterplot',
  description:
    'The reviz compiler can reverse engineer scatterplots from the DOM, such as this example from the Observable team.',
};

const Scatterplot: React.FC = () => {
  const data = readData<Athlete>('athletes');

  return (
    <Visualization
      title="From Observable — Observable Plot"
      href="https://observablehq.com/@observablehq/plot?collection=@observablehq/plot"
    >
      <RevizScatterplot data={data} />
    </Visualization>
  );
};

export default Scatterplot;
