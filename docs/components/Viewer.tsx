import * as React from 'react';
import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babel';
import { analyzeVisualization } from '@parkerziegler/reviz';

import CodePane from './CodePane';

interface WithViewerProps {
  href: string;
  title: string;
}

export function withViewer<T>(
  Viz: React.FC<{ data: T }>,
  props: { data: T } & WithViewerProps
): React.FC {
  const Viewer: React.FC = () => {
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
          plugins: [babylon],
        })
      );
      setPerf(result[0]);
    }, []);

    return (
      <div className="absolute inset-0 flex flex-col lg:grid lg:viewer-grid">
        <div className="flex flex-col items-center">
          <div className="flex-1 flex items-center p-8 pb-0">
            <Viz data={props.data} />
          </div>
          <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:text-2xl lg:text-4xl w-full underline decoration-accent decoration-2 text-center lg:border-t border-t-linework p-4 lg:p-8"
          >
            {props.title}
          </a>
        </div>
        <CodePane code={vizSpec} name="Spec" compile={compile} perf={perf} />
        <CodePane
          code={vizProgram}
          name="Program"
          compile={compile}
          perf={perf}
        />
      </div>
    );
  };

  return Viewer;
}
