'use client';

import * as React from 'react';
import * as d3 from 'd3';
import groupBy from 'lodash.groupby';

import type { DeathRecord, StackRecord } from '../../../src/data/crimea';

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
  data: DeathRecord[];
}

const StackedBarChart: React.FC<Props> = ({ data }) => {
  // Compute x (date) domain and z (cause) domain. We use d3's InternSet so we
  // can compute Sets even with Date values.
  const xDomain = new d3.InternSet(d3.map(data, (d) => d.date));
  const zDomain = new d3.InternSet(d3.map(data, (d) => d.cause));

  // Massage the data into a format appropriate for d3.stack.
  const deathsByMonth = groupBy(data, 'date');
  const stackData = Object.entries(deathsByMonth).map<StackRecord>(
    ([date, record]) => {
      return {
        date,
        disease: record.find(({ cause }) => cause === 'disease')?.deaths ?? 0,
        wounds: record.find(({ cause }) => cause === 'wounds')?.deaths ?? 0,
        other: record.find(({ cause }) => cause === 'other')?.deaths ?? 0,
      };
    }
  );

  // Use d3.stack to create a stack generator. d3.stack will create a 3D array like so:
  // [[[y1, y2], [y1, y2], ...], [[y1, y2], ...]]
  // This captures each set of bars associated with a particular cause of death.
  const stack = d3
    .stack()
    .keys(zDomain)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  // @ts-expect-error – d3 will ignore string properties on stack data.
  const series = stack(stackData);
  const yDomain = d3.extent(series.flat(2));

  // Set up x, y, and color scales.
  const x = d3
    .scaleBand(xDomain, [margin.left, dimensions.width - margin.right])
    .paddingInner(0.1);
  const y = d3.scaleLinear(yDomain, [
    dimensions.height - margin.bottom,
    margin.top,
  ]);
  const color = d3.scaleOrdinal(zDomain, d3.schemeTableau10);

  // Define axis generators.
  const xAxis = d3
    .axisBottom(x)
    .tickSizeOuter(0)
    .tickFormat((d) =>
      new Date(d).toLocaleString('default', { month: 'short' })
    );
  const yAxis = d3.axisLeft(y).ticks(dimensions.height / 60);

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
      );

    return () => {
      d3.select(yAx).call((g) => g.selectAll('.tick line ~ line').remove());
    };
  }, [data, xAxis, yAxis]);

  return (
    <svg
      width={`${dimensions.width}`}
      height={`${dimensions.height}`}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className="block h-auto max-w-full"
    >
      <g ref={xAxisRef} transform={`translate(0, ${y(0)})`}></g>
      <g ref={yAxisRef} transform={`translate(${margin.left},0)`}></g>
      <g>
        {series.map((datum, i) => {
          const fill = color(datum.key);
          return (
            <g key={i} fill={fill}>
              {datum.map((d, i) => (
                <rect
                  key={i}
                  x={x(Array.from(xDomain)[i])}
                  y={Math.min(y(d[0]), y(d[1]))}
                  height={Math.abs(y(d[0]) - y(d[1]))}
                  width={x.bandwidth()}
                />
              ))}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default StackedBarChart;
