import * as React from "react";
import type { RevizOutput } from "@plait-lab/reviz";

import ElementSelect from "./components/ElementSelect";
import ExtensionErrorBoundary from "./components/ExtensionErrorBoundary";
import SpecViewer from "./components/SpecViewer";

function App() {
  const [spec, setSpec] = React.useState<RevizOutput["spec"] | null>(null);

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
      setSpec(message.spec);
    });
  }, []);

  return (
    <main className="absolute inset-0 flex flex-col bg-slate-900 text-white">
      <ExtensionErrorBoundary
        fallback={(message) => <p>An error occurred. {message}</p>}
      >
        <ElementSelect />
        <SpecViewer spec={spec} />
      </ExtensionErrorBoundary>
    </main>
  );
}

export default App;
