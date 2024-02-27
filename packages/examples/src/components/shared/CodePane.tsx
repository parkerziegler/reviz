import * as React from 'react';
import { CodePane as Code } from '@reviz/ui';

interface Props {
  code: string;
  name: string;
  compile: () => void;
  perf: number;
}

const CodePane: React.FC<Props> = ({ code, name, compile, perf }) => {
  return (
    <div className="bg-editor border-linework relative flex flex-1 flex-col justify-between overflow-auto border p-8 font-mono last:border-t-0">
      <Code
        code={code}
        theme="light"
        name={name}
        preClassName="text-lg md:text-xl flex-1 m-0 overflow-auto"
      />
      <div className="flex justify-between pt-8">
        <button
          onClick={compile}
          className="flex cursor-pointer items-center border-0 bg-none p-0 text-xl text-inherit lg:text-2xl"
          type="button"
          name="execute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="scale-75 pr-2 md:scale-100"
          >
            <path d="m5 3 14 9-14 9V3z" />
          </svg>
          Compile
        </button>
        {perf ? (
          <p className="m-0 text-xl lg:text-2xl">
            Compiled in {Math.round(perf)} ms
          </p>
        ) : null}
        <p className="absolute right-8 top-8 m-0 text-xl lg:text-2xl">{name}</p>
      </div>
    </div>
  );
};

export default CodePane;
