'use client';

import * as React from 'react';
import * as Plot from '@observablehq/plot';

import type { Car } from '../../data/cars';

interface Props {
  data: Car[];
}

const BubbleChart: React.FC<Props> = ({ data }) => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = root.current;

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

    node.appendChild(plot);

    return (): void => {
      node.removeChild(plot);
    };
  }, [data]);

  return <div ref={root}></div>;
};

export default BubbleChart;
