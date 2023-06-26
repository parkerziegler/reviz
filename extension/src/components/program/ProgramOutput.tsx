import * as React from "react";

import Heading from "../shared/Heading";

interface Props {
  output: string;
}

const ProgramOutput: React.FC<Props> = ({ output }) => {
  return (
    <div className="stack stack-sm relative shrink-0 basis-1/3 overflow-hidden border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="self-start">Program Output</Heading>
      <div
        dangerouslySetInnerHTML={{ __html: output }}
        className="overflow-auto text-black"
      />
    </div>
  );
};

export default ProgramOutput;
