import * as React from 'react';
import * as d3 from 'd3';
import Head from 'next/head';

import { withViewer } from '../../components/Viewer';

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

const dimensions = {
  width: 640,
  height: 400,
};

const margin = {
  top: 40,
  left: 60,
  right: 40,
  bottom: 40,
};

const Histogram: React.FC = () => {
  const max = d3.max(data);

  // Generate a threshold for each stopping time value.
  const thresholds = [];
  for (let i = 0; i <= max; i++) {
    thresholds.push(i);
  }

  // Apply the data to the thresholds.
  const bins = d3.bin().thresholds(thresholds)(data);

  // Define scales.
  const x = d3
    .scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([margin.left, dimensions.width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .nice()
    .range([dimensions.height - margin.bottom, margin.top]);

  const xAxisRef = React.useRef<SVGGElement>(null);
  const yAxisRef = React.useRef<SVGGElement>(null);

  const xAxis = d3
    .axisBottom(x)
    .ticks(dimensions.width / 80)
    .tickSizeOuter(0);

  const yAxis = d3.axisLeft(y).tickSizeOuter(0);

  React.useEffect(() => {
    const xAx = xAxisRef.current;
    const yAx = yAxisRef.current;

    d3.select(xAx).call(xAxis);
    d3.select(yAx).call(yAxis);
  }, [xAxis, yAxis]);

  return (
    <>
      <Head>
        <title>reviz: Histogram</title>
      </Head>
      <svg
        className="block h-auto max-w-full"
        width={`${dimensions.width}`}
        height={`${dimensions.height}`}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <g>
          {bins.map((d, i) => (
            <rect
              key={i}
              x={x(d.x0)}
              y={y(d.length)}
              width={Math.max(0, x(d.x1) - x(d.x0))}
              height={y(0) - y(d.length)}
              fill="steelblue"
            />
          ))}
        </g>
        <g
          ref={xAxisRef}
          transform={`translate(0, ${dimensions.height - margin.bottom})`}
        >
          <text
            x={`${dimensions.width - margin.right}`}
            y="15"
            fill="currentColor"
            fontWeight="700"
          >
            Stopping Time
          </text>
        </g>
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`}>
          <text
            x="10"
            y={`${margin.top}`}
            fill="currentColor"
            fontWeight="700"
            textAnchor="start"
          >
            Frequency
          </text>
        </g>
      </svg>
    </>
  );
};

export default withViewer(Histogram, {
  data,
  href: 'https://observablehq.com/@parkerziegler/playing-with-the-collatz-conjecture',
  title:
    'From Parker Ziegler on Observable — Playing with the Collatz Conjecture',
});
