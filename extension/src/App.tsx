import * as React from 'react';

import ElementSelect from './components/ElementSelect';
import ExtensionErrorBoundary from './components/ExtensionErrorBoundary';

function App() {
  const [program, setProgram] = React.useState<string>('');

  React.useEffect(() => {
    // Establish a long-lived connection to the service worker.
    const serviceWorkerConnection = chrome.runtime.connect({
      name: 'panel',
    });

    serviceWorkerConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // Listen for messages from the content script sent via the service worker.
    serviceWorkerConnection.onMessage.addListener((message) => {
      setProgram(message.program);
    });
  }, []);

  return (
    <main className="p-4 bg-slate-900 absolute inset-0 text-white">
      <ExtensionErrorBoundary
        fallback={(message) => <p>An error occurred. {message}</p>}
      >
        <ElementSelect />
        <p>Program:</p>
        <pre>{program}</pre>
      </ExtensionErrorBoundary>
    </main>
  );
}

export default App;
