import Heading from "../shared/Heading";
import type { Data } from "../../types/data";

import DataGrid from "./DataGrid";
import DataUpload from "./DataUpload";

interface Props {
  data?: Data;
  setData: (data: Data) => void;
}

const DataPanel: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="flex shrink-0 basis-1/3 flex-col overflow-hidden px-3 py-2">
      <Heading className="mb-4 self-start">Data</Heading>
      {data ? <DataGrid data={data} /> : <DataUpload setData={setData} />}
    </div>
  );
};

export default DataPanel;
