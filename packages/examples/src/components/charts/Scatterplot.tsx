'use client';

import * as React from 'react';
import * as Plot from '@observablehq/plot';

import type { Athlete } from '../../data/athletes';

interface Props {
  data: Athlete[];
}

const Scatterplot: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = root.current;

    const plot = Plot.plot({
      marks: [
        Plot.dot(data, {
          x: 'weight',
          y: 'height',
          stroke: 'sex',
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

export default Scatterplot;
