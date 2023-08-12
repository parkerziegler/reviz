import * as React from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxHighlighting } from '@codemirror/language';
import * as Tooltip from '@radix-ui/react-tooltip';

import ElementSelectPrompt from '../interaction/ElementSelectPrompt';
import Heading from '../shared/Heading';
import TooltipMessage from '../shared/TooltipMessage';
import { usePrevious } from '../../hooks/usePrevious';
import type { Data } from '../../types/data';
import type { RenderMessage } from '../../types/message';
import { formatProgram } from '../../utils/formatters';

import { syntaxTheme, editorTheme } from './theme';

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

  const [edited, setEdited] = React.useState(false);

  // Initialize the editor.
  React.useEffect(() => {
    if (editorRef.current) {
      editor.current = new EditorView({
        extensions: [
          basicSetup,
          editorTheme,
          javascript(),
          syntaxHighlighting(syntaxTheme),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) {
              setEdited(true);
            }
          }),
        ],
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
      setEdited(false);
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
      <div className="mb-4 flex items-center justify-between">
        <Heading className="self-start">Program</Heading>
        {program ? (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onExecute}
                  className="text-primary transition-opacity hover:opacity-75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={edited ? 'currentColor' : 'transparent'}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 3 14 9-14 9V3z" />
                  </svg>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="tooltip-content" side="left">
                  <TooltipMessage>Run program</TooltipMessage>
                  <Tooltip.Arrow className="fill-blue-50" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ) : null}
      </div>
      {program ? (
        <div
          ref={editorRef}
          className="text-editor-fg relative -mx-3 -mb-2 h-full overflow-auto bg-slate-900 text-xs"
        />
      ) : (
        <ElementSelectPrompt />
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
