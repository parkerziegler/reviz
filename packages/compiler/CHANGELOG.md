# Changelog

All notable changes to this project will be documented in this file. If a change is missing an attribution, it may have been made by a Core Contributor.

- Critical bugfixes or breaking changes are marked using a warning symbol: ⚠️
- Significant new features or enhancements are marked using the sparkles symbol: ✨

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0]

This release includes a large migration to a monorepo. As part of this migration, `reviz` is now distributed on NPM as `@reviz/compiler`.
### Minor Changes

- ⚠️ ✨ Rename the package to `@reviz/compiler` as part of the monorepo migration.
- ⚠️ Remove the `const plot =` prefix from `reviz` generated programs.

## [0.4.1]

### Patch Changes

- Export the `RevizOutput` interface to ease TypeScript integration with Chrome extension.

## [0.4.0]

### Minor Changes

- Restrict analysis of marks to `<circle>` and `<rect>` elements.
- ✨ Automatically infer the type of the x-axis scale, either `'discrete'` or `'continuous'`.

### Patch Changes

- ⚠️ Correctly infer strip plots when a given category contains only a single data point.

## [0.3.1]

### Patch Changes

- ⚠️ Restrict the type of `analyzeVisualization` from any `SVGElement` to `SVGSVGElement`.

## [0.3.0]

### Minor Changes

- ⚠️ Publish package under `@plait-lab` scope as `@plait-lab/reviz`.
- ✨ Properly infer the range for radii on bubble charts.
- Add a program hole (`'??'`) for the `r` attribute on bubble charts.

### Patch Changes

- Rewrite internal code generation logic to follow the formalized contextual semantics documented in [the accompanying paper](/paper/reviz.pdf).
- Flag package as side effect-free in `package.json`.

## [0.2.0]

### Minor Changes

- ⚠️ Use `'??'` to represent program holes in output partial program.

### Patch Changes

- Use a ranking-based heuristic to infer visualization type.
- ⚠️ Alter strip plot inference logic to handle plots with more lanes than data points per lane.
- Add an additional predicate function to differentiate bar and stacked bar charts after regression introduced in [v0.1.2](#[0.1.2]).

## [0.1.2]

### Patch Changes

- ⚠️ Add more robust heuristics to distinguish strip plots from scatterplots after overapproximation introduced in [v0.1.1](#[0.1.1]).
- Remove `d3-array` dependency in favor of a smaller local `mode` implementation.

## [0.1.1]

### Patch Changes

- ⚠️ Update the logic for inferring strip plots to handle cases where DOM nodes that are visual siblings are not siblings in the `svg` subtree.
- Improve internal TypeScript implementation to persist type information about `rect`- and `circle`-specific attributes.

## [0.1.0]

- ✨ This marks the initial release of `reviz`!
