import * as React from "react";
import { RevizOutput } from "@plait-lab/reviz";

import SpecCell from "./SpecCell";
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
        <div className="grid grid-cols-2 border-x border-t border-slate-400">
          <SpecCell header>Property</SpecCell>
          <SpecCell header>Value</SpecCell>
          {Object.entries(spec).map(([property, value]) => {
            return (
              <React.Fragment key={property}>
                <SpecCell>{property}</SpecCell>
                <SpecCell>{formatOneOrMoreValues(property, value)}</SpecCell>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <p>Waiting for visualization selection...</p>
      )}
    </div>
  );
};

export default SpecViewer;
