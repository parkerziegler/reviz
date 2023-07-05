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

This package contains the source for [our examples site](https://reviz.vercel.app).

## Local Development

To run the examples site locally, ensure you have [dependencies installed](../../CONTRIBUTING.md#local-development). Next, run `npm run dev` to start a development server at http://localhost:3000. That's it!

## Application Structure

The examples site is a [Next.js](https://nextjs.org/) application, built on TypeScript, React, and [Tailwind CSS](https://tailwindcss.com/). The root route (`/`) is located at `app/page.tsx`. Each individual example is located in its respective directory (e.g., `app/examples/bar/page.tsx`, `app/examples/bubble/page.tsx`, etc.).