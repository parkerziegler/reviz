# `reviz`: A lightweight engine for reverse engineering data visualizations from the DOM

🚧 This project is currently under construction. 🚧

## Local development

To develop on `reviz` locally, ensure you have an installation of [`yarn`](https://classic.yarnpkg.com/lang/en/). We recommend using latest v1.

```sh
# If you have a local installation of Node and npm.
npm install --global yarn

# If you have Homebrew installed.
brew install yarn
```

### Building `reviz`

To build `reviz`, run `yarn build`. This will type check the codebase and emit JavaScript to the `dist` folder.

### Running the development server

To run `reviz` locally, run `yarn dev`. This will open a local development server at `localhost:3000`, which serves the [Next.js](https://nextjs.org/) build. We use Next.js purely as a local development server for testing examples.

### Linting and Formatting

We lint the codebase with ESLint and format it with Prettier. To manually lint the codebase, run `yarn lint`. To manually format the codebase, run `yarn format`.

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

### Typechecking

To run the TypeScript compiler manually in order to check for type errors, run `yarn check:ts`.
