import * as React from "react";
import type { RevizOutput } from "@plait-lab/reviz";

import ElementSelect from "./components/ElementSelect";
import ExtensionErrorBoundary from "./components/ExtensionErrorBoundary";
import ProgramViewer from "./components/ProgramViewer";
import SpecViewer from "./components/SpecViewer";

function App() {
  const [revizOutput, setRevizOutput] = React.useState<RevizOutput | null>(
    null
  );

  React.useEffect(() => {
    // Establish a long-lived connection to the service worker.
    const serviceWorkerConnection = chrome.runtime.connect({
      name: "panel",
    });

    serviceWorkerConnection.postMessage({
      name: "init",
      tabId: chrome.devtools.inspectedWindow.tabId,
    });

    // Listen for messages from the content script sent via the service worker.
    serviceWorkerConnection.onMessage.addListener((message) => {
      setRevizOutput(message);
    });
  }, []);

  return (
    <main className="absolute inset-0 grid grid-cols-12 grid-rows-[36px_minmax(0,_1fr)_minmax(0,_1fr)] bg-slate-900 text-white md:grid-rows-[36px_minmax(0,_1fr)]">
      <ExtensionErrorBoundary
        fallback={(message) => <p>An error occurred. {message}</p>}
      >
        <ElementSelect />
        <SpecViewer spec={revizOutput?.spec} />
        <ProgramViewer code={revizOutput?.program} />
      </ExtensionErrorBoundary>
    </main>
  );
}

export default App;
