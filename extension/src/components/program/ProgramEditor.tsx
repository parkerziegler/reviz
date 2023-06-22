import * as React from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

import Heading from "../shared/Heading";
import { formatProgram } from "../../utils/formatters";

interface Props {
  program: string;
}

const ProgramEditor: React.FC<Props> = ({ program }) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const editor = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: editorRef.current!,
      doc: formatProgram(program),
    });

    return () => {
      editor.destroy();
    };
  }, [program]);

  return (
    <div className="stack stack-sm relative shrink-0 basis-1/3 overflow-hidden border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="self-start">Program</Heading>
      {program ? (
        <div
          ref={editorRef}
          className="-mx-3 h-full overflow-auto bg-white text-xs text-black"
        />
      ) : (
        <p>Waiting for visualization selection...</p>
      )}
    </div>
  );
};

export default ProgramEditor;
