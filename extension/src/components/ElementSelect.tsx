import * as React from 'react';
import cs from 'classnames';

const MousePointer = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
    <path d="M13 13l6 6"></path>
  </svg>
);

const ElementSelect: React.FC = () => {
  const [isElementSelectActive, setElementSelectActive] = React.useState(false);

  function toggleElementSelectActive() {
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
    <button
      onClick={toggleElementSelectActive}
      className={cs(
        'transition-all hover:opacity-75',
        isElementSelectActive ? 'text-blue-400' : 'text-white'
      )}
    >
      {MousePointer}
    </button>
  );
};

export default ElementSelect;
