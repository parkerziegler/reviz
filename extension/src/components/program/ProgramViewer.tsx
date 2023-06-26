import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import cs from "classnames";

import Heading from "../shared/Heading";
import { formatProgram } from "../../utils/formatters";

interface Props {
  program: string;
}

const ProgramViewer: React.FC<Props> = ({ program }) => {
  return (
    <div className="relative flex basis-1/2 flex-col px-3 py-2">
      <Heading className="mb-4 self-start">Program</Heading>
      {program ? (
        <Highlight
          code={formatProgram(program)}
          language="javascript"
          theme={themes.shadesOfPurple}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cs(
                "-mx-3 -mb-2 overflow-auto px-3 py-2 text-xs",
                className
              )}
              style={style}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })} className="table-row">
                  <span className="table-cell select-none pr-3 text-right opacity-50">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      ) : (
        <p>Waiting for visualization selection...</p>
      )}
    </div>
  );
};

export default ProgramViewer;
