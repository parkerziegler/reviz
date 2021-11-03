import * as React from 'react';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../helpers';


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
  return {
    props: {
      data: readData<d3.DSVRowArray<string>>('athletes'),
    },
  };
}

export default Scatterplot;
