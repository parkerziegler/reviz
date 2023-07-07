<div align="center">
  <img
    src="https://raw.githubusercontent.com/parkerziegler/reviz/main/assets/reviz-logo.svg"
    alt="reviz"
    width="300"
  />
  <br />
  <br />     
  <strong>
    A lightweight engine for reverse engineering data visualizations from the DOM
  </strong>
  <br />
  <br />
</div>

`reviz` is a lightweight engine for reverse engineering data visualizations from the DOM. Its core goal is to assist in rapid visualization sketching and prototyping by automatically generating partial programs written using [Observable Plot](https://observablehq.com/@observablehq/plot) from input `svg` subtrees.

At the heart of `reviz` is its compiler.

## Installation

```sh
npm install @reviz/compiler
```

## API

The compiler is exposed via a tiny API—a single function!

```js
import { analyzeVisualization } from '@reviz/compiler';

const viz = document.querySelector('#my-viz');

const { spec, program } = analyzeVisualization(viz);
```

### `analyzeVisualization`

```ts
export declare const analyzeVisualization: (root: SVGSVGElement) => {
  spec: VizSpec;
  program: string;
};
```

`analyzeVisualization` is a function that takes in an `svg` `Element` as input and returns an `Object` containing two properties, `spec` and `program`.

`spec` refers to the intermediate representation used by `reviz` to generate partial Observable Plot programs. It encodes semantic information about the input `svg` subtree, including its inferred visualization type, geometric attributes of its marks (either `circle` or `rect` elements), and presentational attributes of its marks. `reviz`'s architecture mimics that of a traditional compiler, with `spec` acting as the intermediate representation (IR). It can be useful to examine `spec` to see whether or not `reviz` has inferred the correct visualization type for your input `svg` subtree.

`program` refers to the _partial_ Observable Plot program that `reviz` generates. These programs are intentionally _incomplete_ and contain "holes" represented by the string `'??'`. The presence of a hole indicates that the value for a particular attribute (e.g. the `r` attribute of a bubble chart or the `fill` attribute of a stacked bar chart) should be mapped to a column in a user's input dataset rather than kept static across all data elements. After filling in holes with column names from your input dataset, you'll have a complete visualization program ready to run in the browser!
