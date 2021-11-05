import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../../helpers';

interface Letter {
  letter: string;
  frequency: number;
}

interface Props {
  data: Letter[];
}

const BarChart: React.FC<Props> = ({ data }) => {
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
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Bar Chart</title>
      </Head>
      <div ref={root}></div>
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
