import * as React from 'react';

import DataPanel from '../data/DataPanel';
import ProgramEditor from '../program/ProgramEditor';
import type { Data } from '../../types/data';

import RetargetedVisualization from './RetargetedVisualization';

interface Props {
  program: string;
}

const Retargeter: React.FC<Props> = ({ program }) => {
  const [data, setData] = React.useState<Data>();
  const [retargetedVisualization, setRetargetdVisualization] =
    React.useState<string>('');

  const outputRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Set the initial dimensions of the retargeted visualization.
  React.useLayoutEffect(() => {
    if (outputRef.current) {
      const { width, height } = outputRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  React.useEffect(() => {
    // Establish a ResizeObserver to update the retargeted visualization
    // dimensions.
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    if (outputRef.current) {
      ro.observe(outputRef.current);
    }

    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <RetargetedVisualization
        retargetedVisualization={retargetedVisualization}
        ref={outputRef}
      />
      <ProgramEditor
        program={program}
        data={data}
        setRetargetdVisualization={setRetargetdVisualization}
        dimensions={dimensions}
      />
      <DataPanel data={data} setData={setData} />
    </>
  );
};

export default Retargeter;
