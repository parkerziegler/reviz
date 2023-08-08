import * as React from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

import Heading from '../shared/Heading';
import type { Data } from '../../types/data';
import type { RenderMessage } from '../../types/message';
import { formatProgram } from '../../utils/formatters';
import { usePrevious } from '../../hooks/usePrevious';

interface Props {
  program: string;
  data?: Data;
  setRetargetdVisualization: (retargetedVisualization: string) => void;
  dimensions: {
    width: number;
    height: number;
  };
}

const ProgramEditor: React.FC<Props> = ({
  program,
  data,
  setRetargetdVisualization,
  dimensions,
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const editor = React.useRef<EditorView>();
  const prevDimensions = usePrevious(dimensions);

  // Initialize the editor.
  React.useEffect(() => {
    if (editorRef.current) {
      editor.current = new EditorView({
        extensions: [basicSetup, javascript()],
        parent: editorRef.current,
        doc: formatProgram(program),
      });
    }

    return () => {
      editor.current?.destroy();
      editor.current = undefined;
    };
  }, [program]);

  // Establish a listener for the render message sent from the sandboxed iframe.
  React.useEffect(() => {
    const listener = (event: MessageEvent<RenderMessage>): void => {
      if (event.data.name !== 'render') {
        return;
      }

      setRetargetdVisualization(event.data.plot);
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [setRetargetdVisualization]);

  // Set up a callback to send the program, data, and retargeted visualization
  // dimensions to the sandboxed iframe to execute the Plot program.
  const onExecute = React.useCallback(() => {
    if (iframeRef.current && data) {
      iframeRef.current.contentWindow?.postMessage(
        {
          name: 'execute',
          program: editor.current?.state.doc.toString() ?? '',
          data: data.data,
          dimensions,
        },
        '*'
      );
    }
  }, [data, dimensions]);

  // Re-execute the program when the dimensions change.
  React.useEffect(() => {
    if (iframeRef.current && data && dimensions !== prevDimensions) {
      iframeRef.current.contentWindow?.postMessage(
        {
          name: 'execute',
          program: editor.current?.state.doc.toString() ?? '',
          data: data.data,
          dimensions,
        },
        '*'
      );
    }
  }, [data, dimensions, prevDimensions]);

  return (
    <div className="relative flex shrink-0 basis-1/3 flex-col overflow-hidden border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="mb-4 self-start">Program</Heading>
      {program ? (
        <div
          ref={editorRef}
          className="relative -mx-3 -mb-2 h-full overflow-auto bg-white text-xs text-black"
        >
          <button
            onClick={onExecute}
            className="absolute right-4 top-1 z-10 text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 3 14 9-14 9V3z" />
            </svg>
          </button>
        </div>
      ) : (
        <p>Waiting for visualization selection...</p>
      )}
      <iframe
        ref={iframeRef}
        src="/sandbox/sandbox.html"
        className="hidden"
        width={0}
        height={0}
      />
    </div>
  );
};

export default ProgramEditor;
