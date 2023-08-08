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
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const retargetedVisualizationRef = React.useRef<HTMLDivElement>(null);

  // Set the initial dimensions of the retargeted visualization.
  React.useLayoutEffect(() => {
    if (retargetedVisualizationRef.current) {
      const { width, height } =
        retargetedVisualizationRef.current.getBoundingClientRect();
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

    if (retargetedVisualizationRef.current) {
      ro.observe(retargetedVisualizationRef.current);
    }

    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <RetargetedVisualization
        retargetedVisualization={retargetedVisualization}
        ref={retargetedVisualizationRef}
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
