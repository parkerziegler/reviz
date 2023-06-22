import * as React from "react";

import Heading from "../shared/Heading";
import type { Data } from "../../types/data";

interface Props {
  program: string;
  data: Data;
}

const ProgramOutput: React.FC<Props> = () => {
  const outputRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="stack stack-sm relative shrink-0 basis-1/3 overflow-hidden border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="self-start">Program Output</Heading>
      <div ref={outputRef} className="overflow-auto" />
    </div>
  );
};

export default ProgramOutput;
