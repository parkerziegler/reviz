import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

import { readData } from '../../helpers';

enum AgeRange {
  "<10",
  "10-19",
  "20-29",
  "30-39",
  "40-49",
  "50-59",
  "60-69",
  "70-79",
  "≥80",
}

const ages = Object.values(AgeRange).filter(x => typeof x === 'string');

interface StateDistribution {
  name: string,
  "<10": number,
  "10-19": number,
  "20-29": number,
  "30-39": number,
  "40-49": number,
  "50-59": number,
  "60-69": number,
  "70-79": number,
  "≥80": number,
}

interface StateAge {
  state: string,
  age: AgeRange,
  population: number,
}

interface Props {
  states: StateDistribution[],
  stateAges: StateAge[],
}

const Histogram: React.FC<Props> = ({ stateAges }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plot = Plot.plot({
      marginLeft: 50,
      grid: true,
      x: {
        axis: "top",
        label: "Percent (%) →",
        transform: (d: number) => d * 100
      },
      y: {
        domain: ages,
        label: "Age"
      },
      marks: [
        Plot.ruleX([0]),
        Plot.tickX(stateAges, Plot.normalizeX({basis: "sum", z: "state", x: "population", y: "age"}))
      ]
    });

    root.current.appendChild(plot);

    return (): void => {
      root.current.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Strip Plot</title>
      </Head>
      <div ref={root}></div>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const states = readData<StateDistribution>('states');
  const stateAges = ages
        .flatMap(age => states.map(d => 
          ({state: d.name, age, population: d[age]}) as StateAge));
  return {
    props: {
      states,
      stateAges,
    },
  };
}

export default Histogram;
