import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../../helpers/server';
import { withViewer } from '../../components/Viewer';

interface DeathRecord {
  date: string;
  cause: string;
  deaths: number;
}

interface Props {
  data: DeathRecord[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
      root.current?.removeChild(plot);
    };
  }, []);

  return <div ref={root}></div>;
};

const StackedBarChart: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>reviz: Stacked Bar Chart</title>
      </Head>
      {React.createElement(
        withViewer(Chart, {
          data,
          href: 'https://observablehq.com/@observablehq/plot-stack',
          title: 'From Observable: Plot: Stack',
        })
      )}
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
