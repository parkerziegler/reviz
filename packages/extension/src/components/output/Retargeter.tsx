import * as React from 'react';

import DataPanel from '../data/DataPanel';
import ProgramEditor from '../program/ProgramEditor';
import ProgramOutput from '../program/ProgramOutput';
import type { Data } from '../../types/data';

interface Props {
  program: string;
}

const Retargeter: React.FC<Props> = ({ program }) => {
  const [data, setData] = React.useState<Data>();
  const [output, setOutput] = React.useState<string>('');

  const outputRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Set the initial dimensions of the output visualization.
  React.useLayoutEffect(() => {
    if (outputRef.current) {
      const { width, height } = outputRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  React.useEffect(() => {
    // Establish a ResizeObserver to update the output dimensions.
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
      <ProgramOutput output={output} ref={outputRef} />
      <ProgramEditor
        program={program}
        data={data}
        setOutput={setOutput}
        dimensions={dimensions}
      />
      <DataPanel data={data} setData={setData} />
    </>
  );
};

export default Retargeter;
