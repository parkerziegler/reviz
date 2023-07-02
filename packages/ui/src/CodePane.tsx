import * as React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import cs from 'classnames';

interface Props {
  code: string;
  theme: 'dark' | 'light';
  name: string;
  preClassName?: string;
}

const CodePane: React.FC<Props> = ({ code, theme, name, preClassName }) => {
  return (
    <Highlight
      code={code}
      language="javascript"
      theme={theme === 'dark' ? themes.nightOwl : themes.nightOwlLight}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }): React.ReactElement => (
        <pre className={cs(preClassName, className)} style={style}>
          {tokens.map((line, lineIdx) => (
            <div
              {...getLineProps({ line, key: `${name}-row-${lineIdx}` })}
              key={`${name}-row-${lineIdx}`}
              className="table-row"
            >
              <span className="table-cell select-none pr-3 text-right opacity-50">
                {lineIdx + 1}
              </span>
              {line.map((token, colIdx) => (
                <span
                  {...getTokenProps({ token, key: colIdx })}
                  key={`${name}-col-${colIdx}`}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodePane;
