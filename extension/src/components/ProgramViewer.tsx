import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import cs from "classnames";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

import Heading from "./shared/Heading";

interface Props {
  code?: string;
}

const ProgramViewer: React.FC<Props> = ({ code }) => {
  const formattedCode = code
    ? prettier.format(code, {
        parser: "babel",
        plugins: [babel],
      })
    : "";

  return (
    <div className="stack stack-sm relative col-span-12 px-3 py-2 md:col-span-6">
      <Heading className="self-start">Program</Heading>
      {code ? (
        <Highlight
          code={formattedCode}
          language="javascript"
          theme={themes.shadesOfPurple}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cs("-mx-3 overflow-auto px-3 py-2 text-xs", className)}
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
