import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../../helpers/server';
import { withViewer } from '../../components/Viewer';

enum AgeRange {
  '<10',
  '10-19',
  '20-29',
  '30-39',
  '40-49',
  '50-59',
  '60-69',
  '70-79',
  '≥80',
}

const ages = Object.values(AgeRange).filter((x) => typeof x === 'string');

interface StateDistribution {
  name: string;
  '<10': number;
  '10-19': number;
  '20-29': number;
  '30-39': number;
  '40-49': number;
  '50-59': number;
  '60-69': number;
  '70-79': number;
  '≥80': number;
}

interface StateAge {
  state: string;
  age: AgeRange;
  population: number;
}

interface Props {
  data: StateAge[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = root.current;

    const plot = Plot.plot({
      marginLeft: 50,
      grid: true,
      x: {
        axis: 'top',
        label: 'Percent (%) →',
        transform: (d: number) => d * 100,
      },
      y: {
        domain: ages,
        label: 'Age',
      },
      marks: [
        Plot.ruleX([0]),
        Plot.dotX(data, {
          ...Plot.normalizeX({
            basis: 'sum',
            z: 'state',
            x: 'population',
            y: 'age',
          }),
          fill: 'dodgerblue',
          fillOpacity: 0.5,
          stroke: 'dodgerblue',
        }),
      ],
    });

    node.appendChild(plot);

    return (): void => {
      node.removeChild(plot);
    };
  }, [data]);

  return <div ref={root}></div>;
};

const StripPlot: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>reviz: Strip Plot</title>
      </Head>
      {React.createElement(
        withViewer(Chart, {
          data,
          href: 'https://observablehq.com/@observablehq/plot-tick',
          title: 'From Observable: Plot: Tick',
        })
      )}
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const states = readData<StateDistribution>('states');
  const data = ages.flatMap((age) =>
    states.map((d) => ({ state: d.name, age, population: d[age] } as StateAge))
  );

  return {
    props: {
      data,
    },
  };
}

export default StripPlot;
