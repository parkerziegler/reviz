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

const Scatterplot: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.plot({
      grid: true,
      marks: [
        Plot.dot(data, { x: 'economy (mpg)', y: 'power (hp)', fill: 'orange' }),
      ],
    });

    root.current.appendChild(plot);

    // Begin visualization analysis.
    analyzeVisualization(plot);

    return (): void => {
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Scatterplot</title>
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

export default Scatterplot;
