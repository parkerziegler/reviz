import * as React from 'react';
import cs from 'classnames';
import * as Tooltip from '@radix-ui/react-tooltip';

import type { VisualizationState } from '../../App';
import { formatClassNames } from '../../utils/formatters';

import ElementSelectPrompt from './ElementSelectPrompt';

const MousePointer = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3636 24H0V0H24V16.3636"
      stroke="currentColor"
      stroke-dasharray="2 3"
    />
    <path
      d="M10 20L5 5L20 10L13 13L10 20Z"
      stroke="currentColor"
      stroke-linejoin="round"
    />
  </svg>
);

type Props = Pick<VisualizationState, 'nodeName' | 'classNames'>;

const ElementSelect: React.FC<Props> = ({ nodeName, classNames }) => {
  const [isElementSelectActive, setElementSelectActive] = React.useState(false);

  function toggleElementSelectActive(): void {
    setElementSelectActive((prevElementSelectActive) => {
      if (prevElementSelectActive) {
        chrome.devtools.inspectedWindow.eval('deactivateInspector()', {
          useContentScriptContext: true,
        });
      } else {
        chrome.devtools.inspectedWindow.eval('activateInspector()', {
          useContentScriptContext: true,
        });
      }

      return !prevElementSelectActive;
    });
  }

  return (
    <div className="flex flex-1 overflow-hidden border-r border-slate-500 py-2">
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={toggleElementSelectActive}
              className={cs(
                'border-r border-r-slate-500 px-3 transition-opacity hover:opacity-75',
                isElementSelectActive ? 'text-blue-400' : 'text-white'
              )}
            >
              {MousePointer}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip-content" side="bottom">
              <p className="text-primary rounded bg-blue-50 px-2 py-1 font-mono shadow-md">
                {isElementSelectActive ? 'Disable' : 'Enable'} SVG selector
              </p>
              <Tooltip.Arrow className="fill-blue-50" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      {nodeName ? (
        <p className="text-primary flex truncate px-3">
          <code className="truncate rounded bg-blue-50 px-1 py-0.5">
            <span className="text-secondary">{nodeName}</span>
            {classNames ? <span>{formatClassNames(classNames)}</span> : null}
          </code>
        </p>
      ) : (
        <ElementSelectPrompt className="px-3" />
      )}
    </div>
  );
};

export default ElementSelect;
