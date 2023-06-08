import * as React from "react";
import { RevizOutput } from "@plait-lab/reviz";

import { formatOneOrMoreValues } from "../utils/formatters";

interface Props {
  spec: RevizOutput["spec"] | null;
}

const SpecViewer: React.FC<Props> = ({ spec }) => {
  return (
    <div className="stack stack-sm flex flex-col px-3 py-2">
      <h2 className="self-start border-b border-b-primary text-base">
        Visualization Attributes
      </h2>
      {spec ? (
        <table className="table-fixed border-collapse font-mono">
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
                    {formatOneOrMoreValues(property, value)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Waiting for visualization selection...</p>
      )}
    </div>
  );
};

export default SpecViewer;
