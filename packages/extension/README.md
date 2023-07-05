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

This package contains the source for the `reviz` Chrome extension.

## Local Development

To develop the Chrome extension locally, ensure you have [dependencies installed](../../CONTRIBUTING.md#local-development). From there, development largely follows [the standard pattern for Chrome extension development](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/). To summarize, this will involve:

- Running `npm run build` to build the extension. This runs [Vite](https://vitejs.dev/), our build tool of choice, to produce the production extension build in the `dist` directory.
- Uploading the extension to your browser by clicking the `Load Unpacked` button on the `chrome://extensions`. Select the `dist` directory when prompted with the file upload interface.