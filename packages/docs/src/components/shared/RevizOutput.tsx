'use client';

import * as React from 'react';
import prettier from 'prettier/standalone';
import babel from 'prettier/parser-babel';
import { analyzeVisualization } from '@reviz/compiler';

import CodePane from './CodePane';

const RevizOutput: React.FC = () => {
  const [vizSpec, setVizSpec] = React.useState('Click to compile...');
  const [vizProgram, setVizProgram] = React.useState('Click to compile...');
  const [perf, setPerf] = React.useState(0);

  const compile = React.useCallback(() => {
    const viz = document.querySelector('svg');

    performance.mark('pre-compile');

    const { spec, program } = analyzeVisualization(viz);

    performance.mark('post-compile');
    performance.measure('compile', 'pre-compile', 'post-compile');

    const entries = performance.getEntriesByName('compile');
    const result = entries.map((entry) => entry.duration);

    setVizSpec(JSON.stringify(spec, null, 2));
    setVizProgram(
      prettier.format(program, {
        parser: 'babel',
        plugins: [babel],
      })
    );
    setPerf(result[0]);
  }, []);

  return (
    <>
      <CodePane code={vizSpec} name="Spec" compile={compile} perf={perf} />
      <CodePane
        code={vizProgram}
        name="Program"
        compile={compile}
        perf={perf}
      />
    </>
  );
};

export default RevizOutput;
