import * as React from "react";
import { DSVRowArray, csvParse } from "d3-dsv";

interface Props {
  setData: (data: unknown | DSVRowArray) => void;
}

const DataUpload: React.FC<Props> = ({ setData }) => {
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const type = event.target.files[0].type;
        const reader = new FileReader();

        reader.onload = (theFile) => {
          if (
            theFile.target?.result &&
            typeof theFile.target.result === "string"
          ) {
            switch (type) {
              case "application/json":
                setData(JSON.parse(theFile.target.result));
                break;
              case "text/csv":
                setData(csvParse(theFile.target.result));
                break;
            }
          }
        };

        reader.readAsText(event.target.files[0]);
      }
    },
    []
  );

  return (
    <div className="flex h-full flex-col items-center justify-center border border-dashed border-slate-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <p className="mt-2 text-sm">
        Upload a{" "}
        <label className="relative cursor-pointer border-b border-dotted border-primary text-primary">
          <input
            type="file"
            accept=".csv, .json"
            className="absolute h-full w-full opacity-[0.0001]"
            onChange={onChange}
          />
          CSV
        </label>{" "}
        or{" "}
        <label className="relative cursor-pointer border-b border-dotted border-primary text-primary">
          <input
            type="file"
            accept=".csv, .json"
            className="absolute h-full w-full opacity-[0.0001]"
            onChange={onChange}
          />
          JSON
        </label>{" "}
        file.
      </p>
    </div>
  );
};

export default DataUpload;
