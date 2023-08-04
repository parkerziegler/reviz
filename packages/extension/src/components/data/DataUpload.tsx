import * as React from 'react';
import { csvParseRows, autoType } from 'd3-dsv';

import type { Data } from '../../types/data';

interface Props {
  setData: (data: Data) => void;
}

const DataUpload: React.FC<Props> = ({ setData }) => {
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const type = event.target.files[0].type;
        const reader = new FileReader();

        reader.onload = (theFile): void => {
          if (
            theFile.target?.result &&
            typeof theFile.target.result === 'string'
          ) {
            switch (type) {
              case 'application/json':
                setData({
                  type: 'json',
                  // We're assuming JSON data is passed as an array of objects.
                  data: JSON.parse(theFile.target.result) as ArrayLike<object>,
                });
                break;
              case 'text/csv': {
                let cols: string[] = [];

                setData({
                  type: 'csv',
                  data: csvParseRows(theFile.target.result, (d, i) => {
                    // Treat the first row as the column names.
                    if (i === 0) {
                      cols = d;
                      return;
                    }

                    const typedRow = autoType(d);

                    return cols.reduce((acc, col, i) => {
                      // @types/d3 is dreadfully wrong here. d is a string[] and
                      // after calling autoType we still have an array (of mixed
                      // types). Accessing individual values by index is fine.
                      acc[col] = (typedRow as unknown[])[i];

                      return acc;
                    }, {} as Record<string, unknown>);
                  }),
                });
                break;
              }
            }
          }
        };

        reader.readAsText(event.target.files[0]);
      }
    },
    [setData]
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
        Upload a{' '}
        <label className="border-primary text-primary relative cursor-pointer border-b border-dotted">
          <input
            type="file"
            accept=".csv, .json"
            className="absolute h-full w-full opacity-[0.0001]"
            onChange={onChange}
          />
          CSV
        </label>{' '}
        or{' '}
        <label className="border-primary text-primary relative cursor-pointer border-b border-dotted">
          <input
            type="file"
            accept=".csv, .json"
            className="absolute h-full w-full opacity-[0.0001]"
            onChange={onChange}
          />
          JSON
        </label>{' '}
        file.
      </p>
    </div>
  );
};

export default DataUpload;
