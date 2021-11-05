import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../../helpers';

interface DeathRecord {
  date: string;
  cause: string;
  deaths: number;
}

interface Props {
  data: DeathRecord[];
}

const StackedBarChart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // legend? @d3/color-legend doesn't work...
    const plot = Plot.plot({
      x: {
        tickFormat: (d: string) =>
          new Date(d).toLocaleString('en', { month: 'narrow' }),
        label: null,
      },
      marks: [
        Plot.barY(data, { x: 'date', y: 'deaths', fill: 'cause' }),
        Plot.ruleY([0]),
      ],
    });

    root.current.appendChild(plot);

    return (): void => {
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Stacked Bar Chart</title>
      </Head>
      <div ref={root}></div>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      data: readData<DeathRecord>('crimea'),
    },
  };
}

export default StackedBarChart;
