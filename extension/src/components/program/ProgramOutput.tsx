import * as React from "react";
import type { DSVRowArray } from "d3-dsv";

import Heading from "../shared/Heading";

interface Props {
  program: string;
  data: unknown | DSVRowArray;
}

const ProgramOutput: React.FC<Props> = () => {
  const outputRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="stack stack-sm relative basis-1/3 border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="self-start">Program Output</Heading>
      <div ref={outputRef} />
    </div>
  );
};

export default ProgramOutput;
