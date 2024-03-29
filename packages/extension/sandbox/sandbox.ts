import * as Plot from '@observablehq/plot';

import type { ExecuteMessage } from '../src/types/message';
import { formatExecutableProgram } from '../src/utils/formatters';

window.addEventListener('message', (event: MessageEvent<ExecuteMessage>) => {
  if (event.data.name !== 'execute') {
    return;
  }

  const { data, program, dimensions } = event.data;

  formatExecutableProgram(program, dimensions)
    .then((formattedProgram) => {
      try {
        // Here we evaluate the user's program, as a string, in a sandboxed environ-
        // ment. See: https://developer.chrome.com/docs/extensions/mv3/sandboxingEval/
        // We'll ignore lint warnings for use of new Function and calling an any
        // typed value; we know we have a function that, when called, returns an
        // svg Element generated by Observable Plot.
        // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call
        const plot = new Function(`return ${formattedProgram}`)()(
          Plot,
          data
        ) as SVGSVGElement;

        event.source?.postMessage(
          {
            name: 'render',
            plot: plot.outerHTML,
          },
          { targetOrigin: event.origin }
        );
      } catch (err) {
        console.error(err);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
