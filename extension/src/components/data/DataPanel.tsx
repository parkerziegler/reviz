import type { DSVRowArray } from "d3-dsv";

import Heading from "../shared/Heading";

import DataTable from "./DataTable";
import DataUpload from "./DataUpload";

interface Props {
  data: unknown | DSVRowArray;
  setData: (data: unknown | DSVRowArray) => void;
}

const DataPanel: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="stack stack-sm basis-1/3 px-3 py-2">
      <Heading className="self-start">Data</Heading>
      {data ? <DataTable data={data} /> : <DataUpload setData={setData} />}
    </div>
  );
};

export default DataPanel;
