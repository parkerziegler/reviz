import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwlLight';
import cs from 'classnames';

interface Props {
  code: string;
  name: string;
  compile: () => void;
  perf: number;
}

const CodePane: React.FC<Props> = ({ code, name, compile, perf }) => {
  return (
    <div className="font-mono relative flex-1 flex flex-col justify-between p-8 bg-editor border border-linework overflow-auto last:border-t-0">
      <Highlight
        {...defaultProps}
        code={code}
        language="javascript"
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cs(
              'text-lg md:text-xl flex-1 m-0 overflow-auto',
              className
            )}
            style={style}
          >
            {tokens.map((line, i) => (
              // key is already supplied by spreading the return value of getLineProps
              // eslint-disable-next-line react/jsx-key
              <div {...getLineProps({ line, key: i })} className="table-row">
                <span className="table-cell pr-4 text-right select-none opacity-50">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  // key is already supplied by spreading the return value of getTokenProps
                  // eslint-disable-next-line react/jsx-key
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div className="flex justify-between pt-8">
        <button
          onClick={compile}
          className="text-xl lg:text-2xl flex items-center p-0 bg-none border-0 text-inherit cursor-pointer"
          type="button"
          name="execute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="pr-2 scale-75 md:scale-100"
          >
            <path d="m5 3 14 9-14 9V3z" />
          </svg>
          Compile
        </button>
        {perf ? (
          <p className="text-xl lg:text-2xl m-0">
            Compiled in {Math.round(perf)} ms
          </p>
        ) : null}
        <p className="text-xl lg:text-2xl absolute top-8 right-8 m-0">{name}</p>
      </div>
    </div>
  );
};

export default CodePane;
