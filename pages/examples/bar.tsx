import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
// import * as Plot from '@observablehq/plot';
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
    // eslint-disable-next-line no-console
    console.log(data.length);
    
    // const data = new Array(1000).fill(0).map((_, i) => collatz(i + 1, 0));

    // const plot = Plot.plot({
    //   x: {
    //     label: 'Stopping Time',
    //   },
    //   y: {
    //     label: 'Frequency',
    //     grid: true,
    //   },
    //   marks: [
    //     Plot.rectY(data, {
    //       ...Plot.binX({ y: 'count' }, { x: (d: number) => d }),
    //       fill: 'steelblue',
    //     }),
    //     Plot.ruleY([0]),
    //   ],
    // });

    // root.current.appendChild(plot);

    // return (): void => {
    //   root.current.removeChild(plot);
    // };
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
