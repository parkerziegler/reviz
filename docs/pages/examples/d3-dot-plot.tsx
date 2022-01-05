import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';
import * as d3 from 'd3';

import { withViewer } from '../../components/Viewer';

interface State {
  state: string;
  age: string;
  population: number;
}

interface Props {
  data: State[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const chart = Plot.plot({
      height: 660,
      grid: true,
      x: { axis: 'top', percent: true, zero: true },
      y: { axis: null },
      color: {
        scheme: 'spectral',
        domain: Array.from(new Set(data.map((d) => d.age))),
      },
      marks: [
        Plot.ruleY(
          data,
          Plot.groupY({ x1: 'min', x2: 'max' }, { x: 'population', y: 'state' })
        ),
        Plot.dot(data, { x: 'population', y: 'state', fill: 'age' }),
        Plot.text(
          data,
          Plot.selectMinX({
            z: 'state',
            x: 'population',
            y: 'state',
            textAnchor: 'end',
            dx: -6,
            text: 'state',
            sort: { y: 'x', reduce: 'min', reverse: true },
          })
        ),
      ],
    });

    root.current?.appendChild(chart);

    return (): void => {
      root.current?.removeChild(chart);
    };
  }, []);

  return <div ref={root}></div>;
};

const D3DotPlot: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>reviz: D3 Dot Plot</title>
      </Head>
      {React.createElement(
        withViewer(Chart, {
          data,
          title: 'From D3: Dot Plot',
          href: 'https://observablehq.com/@d3/dot-plot',
        })
      )}
    </>
  );
};

export default D3DotPlot;

export async function getStaticProps(): Promise<{ props: Props }> {
  const stateage = fs.readFileSync(
    path.join(process.cwd(), 'data/us-distribution-state-age.csv')
  );
  const data = d3.csvParse<State, keyof State>(stateage.toString(), (d) => {
    return {
      state: d.state,
      age: d.age,
      population: +d.population,
    };
  });

  return {
    props: {
      data,
    },
  };
}
