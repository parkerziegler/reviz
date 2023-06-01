import * as React from 'react';
import { analyzeVisualization } from '@plait-lab/reviz';

import ElementSelect from './components/ElementSelect';
import ExtensionErrorBoundary from './components/ExtensionErrorBoundary';

function App() {
  const [_program, setProgram] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    chrome.devtools.inspectedWindow.eval(
      'inspectSelectedElement($0)',
      {
        useContentScriptContext: true,
      },
      (result, exception) => {
        if (exception?.isException) {
          setError(
            exception.description ||
              (exception.details?.length > 0
                ? `Error details: ${exception.details.join('\n')}`
                : 'An error occurred.')
          );
        } else {
          const { program } = result as ReturnType<typeof analyzeVisualization>;
          setProgram(program);
        }
      }
    );
  }, []);

  return (
    <main className="p-4 bg-slate-900 absolute inset-0 text-white">
      {error ? (
        <p>An error occurred.</p>
      ) : (
        <ExtensionErrorBoundary
          fallback={(message) => <p>An error occurred. {message}</p>}
        >
          <ElementSelect />
        </ExtensionErrorBoundary>
      )}
      <p>Refresh notice.</p>
    </main>
  );
}

export default App;
