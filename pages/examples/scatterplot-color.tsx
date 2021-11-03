import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

interface Props {
  data: d3.DSVRowArray<string>;
}

const Scatterplot: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.dot(data, {
      x: 'weight',
      y: 'height',
      stroke: 'sex',
    }).plot();

    root.current.appendChild(plot);

    return (): void => {
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Scatterplot Color</title>
      </Head>
      <div ref={root}></div>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const json = fs
    .readFileSync(path.join(process.cwd(), 'data/athletes.json'))
    .toString();
  const data = JSON.parse(json);

  return {
    props: {
      data,
    },
  };
}

export default Scatterplot;
