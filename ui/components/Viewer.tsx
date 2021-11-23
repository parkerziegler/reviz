import * as React from 'react';
import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babel';

import { analyzeVisualization } from '../../src';

import CodePane from './CodePane';
import styles from './Viewer.module.css';

const Viewer: React.FC = ({ children }) => {
  return <div className={styles['viewer']}>{children}</div>;
};

const isSVGElement = (element: Element | null): element is SVGElement =>
  element?.nodeName === 'svg';

export function withViewer<T>(Viz: React.FC<T>, data: T): React.FC {
  const WithViewer: React.FC = () => {
    const [vizSpec, setVizSpec] = React.useState('Waiting to generate...');
    const [vizProgram, setVizProgram] = React.useState(
      'Waiting to generate...'
    );

    const compile = React.useCallback(() => {
      const viz = document.querySelector('svg');

      if (isSVGElement(viz)) {
        const { spec, program } = analyzeVisualization(viz);
        setVizSpec(JSON.stringify(spec, null, 2));
        setVizProgram(
          prettier.format(program, {
            parser: 'babel',
            plugins: [babylon],
          })
        );
      }
    }, []);

    return (
      <div className={styles['viewer']}>
        <Viz {...data} />
        <CodePane code={vizSpec} name="Spec" compile={compile} />
        <CodePane code={vizProgram} name="Program" compile={compile} />
      </div>
    );
  };

  return WithViewer;
}

export default Viewer;
