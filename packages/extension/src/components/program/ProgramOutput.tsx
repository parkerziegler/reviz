import * as React from "react";

import Heading from "../shared/Heading";

interface Props {
  output: string;
}

const ProgramOutput: React.FC<Props> = ({ output }) => {
  return (
    <div className="relative flex shrink-0 basis-1/3 flex-col overflow-hidden border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="mb-4 self-start">Program Output</Heading>
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="-mx-3 -mb-2 overflow-auto text-black"
      />
    </div>
  );
};

export default ProgramOutput;