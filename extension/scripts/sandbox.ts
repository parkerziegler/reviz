import * as Plot from "@observablehq/plot";

import { Data } from "../src/types/data";
import { formatExecutableProgram } from "../src/utils/formatters";

interface RenderMessage {
  name: "execute";
  data: Data;
  program: string;
}

window.addEventListener("message", (event: MessageEvent<RenderMessage>) => {
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
