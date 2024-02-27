import * as React from 'react';
import { CodePane } from '@reviz/ui';

import ElementSelectPrompt from '../interaction/ElementSelectPrompt';
import Heading from '../shared/Heading';

interface Props {
  program: string;
}

const ProgramViewer: React.FC<Props> = ({ program }) => {
  return (
    <div className="relative flex basis-1/2 flex-col px-3 py-2">
      <Heading className="mb-4 self-start">Program</Heading>
      {program ? (
        <CodePane
          code={program}
          theme="dark"
          preClassName="-mx-3 -mb-2 flex-1 overflow-auto px-3 py-2 text-xs"
          name="Program"
          style={{ backgroundColor: '#0f172a' }}
        />
      ) : (
        <ElementSelectPrompt />
      )}
    </div>
  );
};

export default ProgramViewer;
