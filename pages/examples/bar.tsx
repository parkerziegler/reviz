import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

interface Letter {
  letter: string,
  frequency: number,
}

interface Props {
  data: Letter[]
}

const Histogram: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.plot({
      y: {
        label: 'frequency (%)'
      },
      marks: [
        Plot.barY(data, {x: "letter", y: (d: Letter): number => d.frequency * 100})
      ]
    })

    root.current.appendChild(plot);

    return (): void => {
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Histogram</title>
      </Head>
      <div ref={root}></div>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const json = fs
    .readFileSync(path.join(process.cwd(), 'data/alphabet.json'))
    .toString();
  const data = JSON.parse(json);

  return {
    props: {
      data,
    },
  };
}

export default Histogram;
