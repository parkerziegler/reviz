import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwlLight';
import cs from 'classnames';

import styles from './CodePane.module.css';

interface Props {
  code: string;
  name: string;
  compile: () => void;
  perf: number;
}

const CodePane: React.FC<Props> = ({ code, name, compile, perf }) => {
  return (
    <div className={styles['code-pane']}>
      <Highlight
        {...defaultProps}
        code={code}
        language="javascript"
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cs(styles['code-pane__body'], className)}
            style={style}
          >
            {tokens.map((line, i) => (
              <div
                {...getLineProps({ line })}
                key={i}
                className={styles['code-pane__line']}
              >
                <span className={styles['code-pane__lineno']}>{i + 1}</span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token })} key={i} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div className={styles['code-pane__controls']}>
        <button
          onClick={compile}
          className={styles['code-pane__synthesize']}
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
            className={styles['code-pane__synthesize-icon']}
          >
            <path d="m5 3 14 9-14 9V3z" />
          </svg>
          Compile
        </button>
        {perf ? (
          <p className={styles['code-pane__info']}>Compiled in {perf} ms</p>
        ) : null}
        <p className={cs(styles['code-pane__info'], styles['code-pane__name'])}>
          {name}
        </p>
      </div>
    </div>
  );
};

export default CodePane;
