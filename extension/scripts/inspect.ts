import { analyzeVisualization } from '@plait-lab/reviz';

/**
 * Reverse engineer a reviz spec and partial program from a selected SVG element.
 *
 * @param el – The SVG element to inspect.
 * @returns – The reviz spec and partial program inferred from the SVG element,
 * or undefined if the element is not an SVG element.
 */
function inspectSelectedElement(
  el: Element
): ReturnType<typeof analyzeVisualization> | undefined {
  if (isSVGElement(el)) {
    return analyzeVisualization(el);
  }
}

/**
 * A type guard to assert that an element is an SVG element.
 *
 * @param el – The element to check.
 * @returns – True if the element is an SVG element, otherwise false. In addition,
 * TypeScript will narrow the type of the element to SVGSVGElement.
 */
function isSVGElement(el: Element): el is SVGSVGElement {
  return el.nodeName === 'svg';
}

// The class name to apply to an element when hovered.
const MOUSE_VISITED_CLASSNAME = 'mouse-visited';

function onMouseEnter(event: MouseEvent) {
  // We only add the mouseenter event listener to SVG elements, making this cast
  // safe.
  const el = event.target as SVGSVGElement;

  // Add a visited class name to the element so we can style it.
  el.classList.add(MOUSE_VISITED_CLASSNAME);
}

function onMouseLeave(event: MouseEvent) {
  // We only add the mouseleave event listener to SVG elements, making this cast
  // safe.
  const el = event.target as SVGSVGElement;

  // Remove the visited class name from the element so we can style it.
  el.classList.remove(MOUSE_VISITED_CLASSNAME);
}

function onClick(event: MouseEvent) {
  const el = event.target as SVGSVGElement;

  // Analyze the visualzation and send the result to the service worker, which
  // will forward it to the DevTools page.
  chrome.runtime.sendMessage(analyzeVisualization(el));
}

/**
 * Activate the inspector by adding a mousemove event listener to the inspected
 * document.
 */
function activateInspector() {
  document.querySelectorAll('svg').forEach((el) => {
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('click', onClick);
  });
}

/**
 * Deactivate the inspector by removing the mousemove event listener from the
 * inspected document.
 */
function deactivateInspector() {
  document.querySelectorAll('svg').forEach((el) => {
    el.removeEventListener('mouseenter', onMouseEnter);
    el.removeEventListener('mouseleave', onMouseLeave);
    el.removeEventListener('click', onClick);
  });
}

// Attach event listeners to all SVG elements in the inspected document.

// This is a bit goofy — allow me to explain. vite + esbuild optimize away this
// entire module because (1) it's not imported anywhere and (2) even as an
// entry point, it doesn't import anything else. It's a disconnected node in the
// module dependency graph. Attaching the function to window ensures it's still
// bundled; then, it's included in the extension as a content script.
(
  window as Window &
    typeof globalThis & {
      inspectSelectedElement: typeof inspectSelectedElement;
      activateInspector: typeof activateInspector;
      deactivateInspector: typeof deactivateInspector;
    }
).inspectSelectedElement = inspectSelectedElement;

(
  window as Window &
    typeof globalThis & {
      inspectSelectedElement: typeof inspectSelectedElement;
      activateInspector: typeof activateInspector;
      deactivateInspector: typeof deactivateInspector;
    }
).activateInspector = activateInspector;

(
  window as Window &
    typeof globalThis & {
      inspectSelectedElement: typeof inspectSelectedElement;
      activateInspector: typeof activateInspector;
      deactivateInspector: typeof deactivateInspector;
    }
).deactivateInspector = deactivateInspector;
