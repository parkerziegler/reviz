import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../../helpers/server';
import { withViewer } from '../../components/Viewer';

interface Letter {
  letter: string;
  frequency: number;
}

interface Props {
  data: Letter[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.plot({
      y: {
        label: 'frequency (%)',
      },
      marks: [
        Plot.barY(data, {
          x: 'letter',
          y: (d: Letter): number => d.frequency * 100,
        }),
      ],
    });

    root.current.appendChild(plot);

    return (): void => {
      root.current?.removeChild(plot);
    };
  }, []);

  return <div ref={root}></div>;
};

const BarChart: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>reviz: Bar Chart</title>
      </Head>
      {React.createElement(
        withViewer(Chart, {
          data,
          href: 'https://observablehq.com/@observablehq/plot-bar?collection=@observablehq/plot',
          title: 'From Observable: Plot: Bar',
        })
      )}
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      data: readData<Letter>('alphabet'),
    },
  };
}

export default BarChart;
