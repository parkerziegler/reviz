'use client';

import * as React from 'react';
import * as d3 from 'd3';

import type { State } from '../../data/states';

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
  data: State[];
}

const StripPlot: React.FC<Props> = ({ data }) => {
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.population))
    .rangeRound([margin.left + 10, dimensions.width - margin.right]);

  const y = d3
    .scalePoint()
    .domain(data.map((d) => d.age))
    .rangeRound([margin.top, dimensions.height - margin.bottom])
    .padding(1);

  const xAxis = d3.axisTop(x).ticks(null, '%');
  const yAxis = d3.axisLeft(y);

  const xAxisRef = React.useRef<SVGGElement>(null);
  const yAxisRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const xAx = xAxisRef.current;
    const yAx = yAxisRef.current;

    d3.select(xAx)
      .call(xAxis)
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('stroke-opacity', 0.1)
          .attr('y2', dimensions.height - margin.bottom - margin.top)
      )
      .call((g) => g.selectAll('.domain').remove());

    d3.select(yAx)
      .call(yAxis)
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('stroke-opacity', 0.1)
          .attr('x2', dimensions.width - margin.right - margin.left)
      )
      .call((g) => g.selectAll('.domain').remove());

    return (): void => {
      d3.select(xAx).call((g) => g.selectAll('.tick line ~ line').remove());
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
      <g>
        {data.map((d) => (
          <circle
            key={`${d.state}-${d.age}`}
            r="3"
            cx={x(d.population)}
            cy={y(d.age)}
            fill="dodgerblue"
            fillOpacity={0.5}
            stroke="dodgerblue"
          />
        ))}
      </g>
      <g ref={xAxisRef} transform={`translate(0, ${margin.top})`}></g>
      <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`}></g>
    </svg>
  );
};

export default StripPlot;
