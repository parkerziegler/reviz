import * as React from 'react';
import * as Plot from '@observablehq/plot';
import Head from 'next/head';

// import { withViewer } from '../../components/Viewer';

function collatz(n: number, stoppingTime = 0): number {
  // Base case, n has reached 1.
  if (n === 1) {
    return stoppingTime;
  }

  // Recursive case: n is even.
  if (n % 2 === 0) {
    return collatz(n / 2, stoppingTime + 1);
  }

  // Recursive case: n is odd.
  return collatz(3 * n + 1, stoppingTime + 1);
}

const data = new Array(1000).fill(0).map((_, i) => collatz(i + 1, 0));

const Histogram: React.FC = () => {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = root.current;

    const plot = Plot.plot({
      x: {
        label: 'Stopping Time',
      },
      y: {
        label: 'Frequency',
        grid: true,
      },
      marks: [
        Plot.rectY(data, {
          ...Plot.binX(
            { y: 'count', thresholds: 200 },
            { x: (d: number) => d }
          ),
          fill: 'steelblue',
        }),
        Plot.ruleY([0]),
      ],
    });

    node.appendChild(plot);

    return (): void => {
      node.removeChild(plot);
    };
  }, []);

  return (
    <>
      <Head>
        <title>reviz: Histogram</title>
      </Head>
      <div ref={root}></div>
    </>
  );
};

// export default withViewer(Histogram, {
//   data,
//   href: 'https://observablehq.com/@parkerziegler/playing-with-the-collatz-conjecture',
//   title: 'From Observable: Playing with the Collatz Conjecture',
// });

export default Histogram;
