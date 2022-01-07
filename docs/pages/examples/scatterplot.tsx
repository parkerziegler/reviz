import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { withViewer } from '../../components/Viewer';

interface Props {
  data: d3.DSVRowArray<string>;
}

const Chart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = root.current;

    const plot = Plot.dot(data, {
      x: 'weight',
      y: 'height',
      stroke: 'sex',
    }).plot();

    node.appendChild(plot);

    return (): void => {
      node.removeChild(plot);
    };
  }, [data]);

  return <div ref={root}></div>;
};

const Scatterplot: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>reviz: Scatterplot Color</title>
      </Head>
      {React.createElement(
        withViewer(Chart, {
          data,
          href: 'https://observablehq.com/@observablehq/plot?collection=@observablehq/plot',
          title: 'From Observable: Observable Plot',
        })
      )}
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
