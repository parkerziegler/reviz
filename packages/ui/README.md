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

This package contains the source for shared UI components across the examples site and the Chrome extension.

## Local Development

To make additions or edits to components, ensure you have [dependencies installed](../../CONTRIBUTING.md#local-development). After making changes, run `npm run build` to produce the built components. Finally, run `npm install` in the root directory to ensure that the `@reviz/examples` and `@reviz/extension` have the latest local build.