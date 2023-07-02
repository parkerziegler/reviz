import { analyzeVisualization } from "@reviz/compiler";

import type { AnalyzeMessage } from "../src/types/message";

// The class name to apply to an element when hovered.
const MOUSE_VISITED_CLASSNAME = "mouse-visited";

/**
 * Adds a class to an SVG element on mouseenter to visually indicate selection.
 * The element cast is safe because we only register this event listener on SVG
 * elements.
 *
 * @param event – The mouseenter event.
 */
function onMouseEnter(event: MouseEvent): void {
  const el = event.target as SVGSVGElement;
  el.classList.add(MOUSE_VISITED_CLASSNAME);
}

/**
 * Removes a class from an SVG element on mouseleave to visually indicate
 * deselection. The element cast is safe because we only register this event
 * listener on SVG elements.
 *
 * @param event – The mouseleave event.
 */
function onMouseLeave(event: MouseEvent): void {
  const el = event.target as SVGSVGElement;
  el.classList.remove(MOUSE_VISITED_CLASSNAME);
}

/**
 * Analyzes a visualization on click and sends the result to the extension
 * service worker. The element cast is safe because we only register this event
 * listener on SVG elements.
 *
 * @param event – The click event.
 */
function onClick(event: MouseEvent): void {
  async function handleClick(): Promise<void> {
    const el = event.target as SVGSVGElement;

    const nodeName = el.nodeName;
    const classNames = el.getAttribute("class") ?? "";
    const { spec, program } = analyzeVisualization(el);

    await chrome.runtime.sendMessage<AnalyzeMessage>({
      name: "analyze",
      nodeName,
      classNames,
      spec,
      program,
    });
  }

  handleClick()
    .then(() => {
      return;
    })
    .catch((err: Error) => {
      console.error(
        "Failed to send reviz spec and program to DevTools panel. Original Error: " +
          err.message
      );
    });
}

/**
 * Activates the inspector by registering event listeners on all SVG elements in
 * the inspected document.
 */
function activateInspector(): void {
  document.querySelectorAll("svg").forEach((el) => {
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("click", onClick);
  });
}

/**
 * Deactivates the inspector by removing event listeners on all SVG elements in
 * the inspected document.
 */
function deactivateInspector(): void {
  document.querySelectorAll("svg").forEach((el) => {
    el.removeEventListener("mouseenter", onMouseEnter);
    el.removeEventListener("mouseleave", onMouseLeave);
    el.removeEventListener("click", onClick);
  });
}

/**
 * This is a bit goofy — allow me to explain. vite + esbuild optimize away this
 * entire module because (it's not imported anywhere. Even as an entry point, it
 * doesn't connect to other modules in the module dependency graph. Attaching
 * functions we intend to make global to window ensures it's still compiled;
 * then, it's included in the extension as a content script.
 */
(
  window as Window &
    typeof globalThis & {
      activateInspector: typeof activateInspector;
      deactivateInspector: typeof deactivateInspector;
    }
).activateInspector = activateInspector;

(
  window as Window &
    typeof globalThis & {
      activateInspector: typeof activateInspector;
      deactivateInspector: typeof deactivateInspector;
    }
).deactivateInspector = deactivateInspector;
