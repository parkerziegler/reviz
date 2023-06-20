import Heading from "../shared/Heading";
import { Data } from "../../types/data";

import DataGrid from "./DataGrid";
import DataUpload from "./DataUpload";

interface Props {
  data?: Data;
  setData: (data: Data) => void;
}

const DataPanel: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="stack stack-sm shrink-0 basis-1/3 overflow-hidden px-3 py-2">
      <Heading className="self-start">Data</Heading>
      {data ? <DataGrid data={data} /> : <DataUpload setData={setData} />}
    </div>
  );
};

export default DataPanel;
