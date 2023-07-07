import * as React from "react";
import * as Tabs from "@radix-ui/react-tabs";

import ExtensionErrorBoundary from "./components/ExtensionErrorBoundary";
import DataPanel from "./components/data/DataPanel";
import ElementSelect from "./components/interaction/ElementSelect";
import ProgramEditor from "./components/program/ProgramEditor";
import ProgramOutput from "./components/program/ProgramOutput";
import ProgramViewer from "./components/program/ProgramViewer";
import SpecViewer from "./components/spec/SpecViewer";
import type { Data } from "./types/data";
import type { AnalyzeMessage } from "./types/message";

// Here we use a mapped type to make the spec property optional.
// Additionally, we omit the message name property, since we don't need it.
export type VisualizationState = Omit<
  {
    [Property in keyof AnalyzeMessage]: Property extends "spec"
      ? AnalyzeMessage[Property] | undefined
      : AnalyzeMessage[Property];
  },
  "name"
>;

const App: React.FC = () => {
  const [{ spec, program, nodeName, classNames }, setViz] =
    React.useState<VisualizationState>({
      spec: undefined,
      program: "",
      nodeName: "",
      classNames: "",
    });
  const [data, setData] = React.useState<Data>();
  const [output, setOutput] = React.useState<string>("");

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
    serviceWorkerConnection.onMessage.addListener((message: AnalyzeMessage) => {
      if (message.name !== "analyze") {
        return;
      }

      const { spec, program, nodeName, classNames } = message;
      setViz({ spec, program, nodeName, classNames });
    });
  }, []);

  return (
    <main className="absolute inset-0 flex flex-col bg-slate-900 text-white">
      <ExtensionErrorBoundary
        fallback={(message): React.ReactElement => (
          <p>An error occurred. {message}</p>
        )}
      >
        <Tabs.Root
          defaultValue="analyze"
          className="flex basis-full flex-col overflow-hidden"
        >
          <div className="flex border-b border-b-slate-500">
            <ElementSelect nodeName={nodeName} classNames={classNames} />
            <Tabs.List className="flex shrink-0">
              <Tabs.Trigger
                className="tab-trigger border-r border-slate-500 px-3 py-2 text-sm"
                value="analyze"
              >
                Analyze
              </Tabs.Trigger>
              <Tabs.Trigger
                className="tab-trigger px-3 py-2 text-sm"
                value="visualize"
              >
                Visualize
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content
            value="analyze"
            className="tab-content flex grow flex-col lg:flex-row"
          >
            <SpecViewer spec={spec} />
            <ProgramViewer program={program} />
          </Tabs.Content>
          <Tabs.Content
            value="visualize"
            className="tab-content flex grow flex-col overflow-hidden lg:flex-row"
          >
            <ProgramOutput output={output} />
            <ProgramEditor
              program={program}
              data={data}
              setOutput={setOutput}
            />
            <DataPanel data={data} setData={setData} />
          </Tabs.Content>
        </Tabs.Root>
      </ExtensionErrorBoundary>
    </main>
  );
};

export default App;