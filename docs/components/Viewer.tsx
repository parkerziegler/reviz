import * as React from 'react';
import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babel';
import { analyzeVisualization } from '@parkerziegler/reviz';

import CodePane from './CodePane';
import styles from './Viewer.module.css';

const Viewer: React.FC = ({ children }) => {
  return <div className={styles['viewer']}>{children}</div>;
};

const isSVGElement = (element: Element | null): element is SVGElement =>
  element?.nodeName === 'svg';

interface WithViewerProps {
  href: string;
  title: string;
}

export function withViewer<T>(
  Viz: React.FC<{ data: T }>,
  props: { data: T } & WithViewerProps
): React.FC {
  const WithViewer: React.FC = () => {
    const [vizSpec, setVizSpec] = React.useState('Click to generate...');
    const [vizProgram, setVizProgram] = React.useState('Click to generate...');
    const [perf, setPerf] = React.useState(0);

    const compile = React.useCallback(() => {
      const viz = document.querySelector('svg');

      if (isSVGElement(viz)) {
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
      }
    }, []);

    return (
      <div className={styles['viewer']}>
        <div className={styles['viewer__viz']}>
          <div className={styles['viewer__viz-container']}>
            <Viz data={props.data} />
          </div>
          <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['viewer__link']}
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

  return WithViewer;
}

export default Viewer;
