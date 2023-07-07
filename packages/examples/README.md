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

Data for each example is decoupled from its route. You can find the raw data used in each example in the `src/data` directory. Data is read directly by the top-level route component from the filesystem. This is made possible by the use of [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) in Next >= 13. While this makes data fetching a breeze, it also forces us to break down each route into clearly server-only or client-server components. For example, each route has an associated chart type component located in `src/components/charts`. These components rely on calling `useEffect` to render the Plot chart on the client; hence, they need to be separate components annotated with the `'use client'` directive.