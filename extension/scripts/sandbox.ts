import * as Plot from "@observablehq/plot";

import type { ExecuteMessage } from "../src/types/message";
import { formatExecutableProgram } from "../src/utils/formatters";

window.addEventListener("message", (event: MessageEvent<ExecuteMessage>) => {
  if (event.data.name !== "execute") {
    return;
  }

  const { data, program } = event.data;
  try {
    const plot = Function(`return ${formatExecutableProgram(program)}`)()(
      Plot,
      data
    ) as SVGSVGElement;

    event.source?.postMessage(
      {
        name: "render",
        plot: plot.outerHTML,
      },
      { targetOrigin: event.origin }
    );
  } catch (err) {
    console.error(err);
  }
});
