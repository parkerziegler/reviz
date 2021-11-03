import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../helpers';

interface DeathRecord {
  date: string,
  cause: string,
  deaths: number,
}

interface Props {
  data: DeathRecord[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Histogram: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.plot({
      // y: {
      //   label: 'frequency (%)'
      // },
      // marks: [
      //   Plot.barY(data, {x: "letter", y: (d: Letter): number => d.frequency * 100})
      // ]
    })

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
      data: readData<DeathRecord[]>('crimea'),
    },
  };
}

export default Histogram;
