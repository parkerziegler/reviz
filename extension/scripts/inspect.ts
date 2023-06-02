import { analyzeVisualization } from '@plait-lab/reviz';

function inspectSelectedElement(
  el: Element
): ReturnType<typeof analyzeVisualization> | undefined {
  if (isSVGElement(el)) {
    return analyzeVisualization(el);
  }
}

function isSVGElement(el: Element): el is SVGSVGElement {
  return el.nodeName === 'svg';
}

// This is a bit goofy — allow me to explain. vite + esbuild optimize away this
// entire module because (1) it's not imported anywhere and (2) even as an
// entry point, it doesn't import anything else. It's a disconnected node in the
// module dependency graph. Attaching the function to window ensures it's still
// bundled; then, it's included in the extension as a content script.
(
  window as Window &
    typeof globalThis & {
      inspectSelectedElement: typeof inspectSelectedElement;
    }
).inspectSelectedElement = inspectSelectedElement;
