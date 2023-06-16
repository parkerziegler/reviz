import type { DSVRowArray } from "d3-dsv";

interface Props {
  data: unknown | DSVRowArray;
}

const DataTable: React.FC<Props> = () => {
  return <p>We have some data!</p>;
};

export default DataTable;
