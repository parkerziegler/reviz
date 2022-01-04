<div align="center">
  <img
    src="assets/reviz.png"
    alt="reviz"
    width="500"
    style="border-radius: 5px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04)"
  />
  <br />
  <br />     
  <strong>
    A lightweight engine for reverse engineering data visualizations from the DOM
  </strong>
</div>

## `reviz`

`reviz` is a lightweight engine for reverse engineering data visualizations from the DOM. Its core goal is to assist in rapid visualization sketching and prototyping by automatically generating programs written using [`@observablehq/plot`](https://observablehq.com/@observablehq/plot) from input `svg` subtrees.

### How does `reviz` generate visualizations?

`reviz` works by generating small JavaScript programs using the `@observablehq/plot` library. These programs are intentionally _incomplete_ and contain "holes" represented by the `??` character. The presence of a hole indicates that the value for a particular attribute (e.g. the `r` of a bubble chart or the `fill` of a stacked bar chart) should be mapped to a column in a user's input dataset rather than kept static across all data elements. For example, for these visualizations from the New York Times:

<img
  src="assets/nyt-example.png"
  alt="A scatterplot visualization from the New York Times"
  width="300"
  style="border-radius: 5px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04)"
/>

`reviz` generates the following incomplete program:

```js
const plot = Plot.plot({
  color: {
    scale: 'ordinal',
    range: ['#C67371', '#ccc', '#709DDE', '#A7B9D3', '#C23734'],
  },
  marks: [
    Plot.dot(data, {
      fill: '??',
      stroke: '??',
      fillOpacity: 0.8,
      strokeOpacity: 1,
      'stroke-width': '1px',
      x: '??',
      y: '??',
      r: 7,
    }),
  ],
});
```

Notice that `fill`, `stroke`, `x` and `y` are all inferred to be holes (`'??'`) that must be mapped to columns of an input dataset. Conversely, attributes like `fill-opacity` and `stroke-width` are automatically inferred because they are found to be consistent across all mark elements.
