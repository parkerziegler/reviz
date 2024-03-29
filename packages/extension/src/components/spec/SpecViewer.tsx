import * as React from 'react';
import type { RevizOutput } from '@reviz/compiler';

import { formatOneOrMoreValues } from '../../utils/formatters';
import ElementSelectPrompt from '../interaction/ElementSelectPrompt';
import Heading from '../shared/Heading';

interface Props {
  spec?: RevizOutput['spec'];
}

const SpecViewer: React.FC<Props> = ({ spec }) => {
  return (
    <div className="stack basis-1/2 overflow-auto border-b border-slate-500 px-3 py-2 lg:border-b-0 lg:border-r">
      <Heading className="self-start">Visualization Attributes</Heading>
      {spec ? (
        <table className="table-fixed border-collapse font-mono">
          <colgroup>
            <col className="w-32" />
            <col />
          </colgroup>
          <thead>
            <th className="border border-slate-400 bg-slate-600 px-2 py-1 text-left font-normal text-white">
              Property
            </th>
            <th className="border border-slate-400 bg-slate-600 px-2 py-1 text-left font-normal text-white">
              Value
            </th>
          </thead>
          <tbody>
            {Object.entries(spec).map(([property, value]) => {
              return (
                <tr key={property}>
                  <td className="border border-slate-400 px-2 py-1 text-slate-400">
                    {property}
                  </td>
                  <td className="border border-slate-400 px-2 py-1">
                    {formatOneOrMoreValues(
                      property,
                      value as string | number | string[] | number[]
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <ElementSelectPrompt />
      )}
    </div>
  );
};

export default SpecViewer;
