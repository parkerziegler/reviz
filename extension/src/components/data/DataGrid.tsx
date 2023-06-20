import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

import type { Data } from "../../types/data";

interface Props {
  data: Data;
}

const DataGrid: React.FC<Props> = ({ data }) => {
  const tableData = React.useMemo(() => {
    return Array.from(data.data);
  }, [data]);

  const columns = React.useMemo(() => {
    const cols = Object.keys(tableData[0]) as string[];

    return cols.map((col) => {
      return {
        accessorKey: col,
        cell: (info: any) => info.getValue(),
      };
    });
  }, [data]);

  const table = useReactTable({
    data: tableData.slice(1),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto">
      <table className="data-grid relative border-collapse font-mono">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="sticky top-0">
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="border-x border-slate-400 bg-slate-600 px-2 py-1 text-left font-normal text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-slate-400 px-2 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
