import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { analyzeVisualization } from '../../src';

interface Car {
  name: string;
  'economy (mpg)': number;
  cylinders: number;
  'displacement (cc)': number;
  'power (hp)': number;
  'weight (lb)': number;
  '0-60 mph (s)': number;
  year: number;
}

interface Props {
  data: Car[];
}

const BubbleChart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.plot({
      grid: true,
      r: {
        range: [0, 8],
      },
      marks: [
        Plot.dot(data, {
          x: '0-60 mph (s)',
          y: 'power (hp)',
          stroke: 'orange',
          r: 'economy (mpg)',
        }),
      ],
    });

    root.current.appendChild(plot);

    analyzeVisualization(plot);

    return (): void => {
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Bubble Chart</title>
      </Head>
      <div ref={root}></div>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const json = fs
    .readFileSync(path.join(process.cwd(), 'data/cars.json'))
    .toString();
  const data = JSON.parse(json);

  return {
    props: {
      data,
    },
  };
}

export default BubbleChart;
