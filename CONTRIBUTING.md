# Contributing

Thanks for your interest in making `reviz` better. Here's how to get started.

## Local Development

To develop `reviz` locally, ensure you have an installation of [Node.js](https://nodejs.org/en) and [`npm`](https://docs.npmjs.com/). We recommend using current LTS for Node.js (18.16.1) and `npm` (>= v9). From here, run `npm install` at the root of the directory.

We use [`npm` workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true) and [`lerna`](https://lerna.js.org/) to manage, link, and version packages during development. Running `npm install` at the root will hoist shared dependencies to the root `node_modules` folder and handle linking packages together.

### Building Packages

To build all packages, run `npm run build` from the root directory. If you only want to build a single package, you can `cd` into the package you'd like to build and run `npm run build`.

### Running the Development Server and Examples

`reviz` is developed and benchmarked against examples in the [Next.js](https://nextjs.org/) app in the `packages/examples` folder. To develop the examples locally, `cd` into this directory and start the development server:

```sh
cd packages/examples
npm run dev
```

This will open a local development server at `http://localhost:3000`.

#### Using Local Source

With `npm` workspaces, all local dependencies are symlinked automatically. For example, the `@reviz/examples` package depends on both `@reviz/compiler` and `@reviz/ui`; `npm` workspaces handles resolution to those local directories. However, if you make a change in a dependee directory and want to see the change upstream in the dependent, you'll need to remember to rerun the build for the depended-on directory. We'll likely change this in the future in favor of `lerna`'s [Workspace Watching feature](https://lerna.js.org/docs/features/workspace-watching#running-with-package-managers).

### Linting and Formatting

We lint the codebase with ESLint and format it with Prettier. To manually lint the codebase, run `npm run lint` from the root directory. To manually format the codebase, run `npm run format` from the root directory.

We recommend installing plugins in your editor of choice to run ESLint and Prettier on save. If using VSCode, you can install:

- [`vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [`prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

To add support for for format on save, add the following to your workspace settings:

```json
"[typescript]": {
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
