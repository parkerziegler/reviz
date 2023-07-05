'use client';

import * as React from 'react';
import * as d3 from 'd3';

import type { Letter } from '../../data/alphabet';

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

interface Props {
  data: Letter[];
}

const BarChart: React.FC<Props> = ({ data }) => {
  const xDomain = new d3.InternSet(d3.map(data, (d) => d.letter));

  const x = d3
    .scaleBand(xDomain, [margin.left, dimensions.width - margin.right])
    .padding(0.1);
  const y = d3.scaleLinear(d3.extent(d3.map(data, (d) => d.frequency)), [
    dimensions.height - margin.bottom,
    margin.top,
  ]);

  const xAxis = d3.axisBottom(x).tickSizeOuter(0);
  const yAxis = d3.axisLeft(y).ticks(dimensions.height / 40, '%');

  const xAxisRef = React.useRef<SVGGElement>(null);
  const yAxisRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const xAx = xAxisRef.current;
    const yAx = yAxisRef.current;

    d3.select(xAx).call(xAxis);
    d3.select(yAx)
      .call(yAxis)
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('x2', dimensions.width - margin.left - margin.right)
          .attr('stroke-opacity', 0.1)
      )
      .call((g) =>
        g
          .append('text')
          .attr('x', -margin.left)
          .attr('y', margin.top)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('↑ Frequency')
      );

    return () => {
      d3.select(yAx).call((g) => g.selectAll('.tick line ~ line').remove());
    };
  }, [xAxis, yAxis]);

  return (
    <svg
      width={`${dimensions.width}`}
      height={`${dimensions.height}`}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className="block h-auto max-w-full"
    >
      <g ref={xAxisRef} transform={`translate(0, ${y(0)})`}></g>
      <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`}></g>
      <g>
        {data.map((d) => (
          <rect
            key={d.letter}
            x={x(d.letter)}
            y={y(d.frequency)}
            width={x.bandwidth()}
            height={y(0) - y(d.frequency)}
            fill="steelblue"
          />
        ))}
      </g>
    </svg>
  );
};

export default BarChart;
