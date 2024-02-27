import * as React from 'react';
import { csvParseRows, autoType } from 'd3-dsv';

import type { Data } from '../../types/data';

interface Props {
  setData: (data: Data) => void;
}

const UploadIcon = (
  <svg
    width="148"
    height="56"
    viewBox="0 0 148 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M81.5 30.5V33.8333C81.5 34.2754 81.3244 34.6993 81.0118 35.0118C80.6993 35.3244 80.2754 35.5 79.8333 35.5H68.1667C67.7246 35.5 67.3007 35.3244 66.9882 35.0118C66.6756 34.6993 66.5 34.2754 66.5 33.8333V30.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M78.1667 24.6667L74 20.5L69.8333 24.6667"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M74 20.5V30.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect
      x="9.20855"
      y="13.1552"
      width="39"
      height="55"
      rx="1.5"
      transform="rotate(-12 9.20855 13.1552)"
      stroke="currentColor"
    />
    <path
      d="M33.1551 46.5108L31.5962 46.8422C28.8108 47.4342 27.7406 46.7392 27.1388 43.9079L26.593 41.3403C26.2178 39.575 24.9668 38.7627 22.3431 39.6079L21.9021 37.5332C24.6428 37.2382 25.4576 35.9987 25.0799 34.222L24.5342 31.6543C23.9324 28.8231 24.6274 27.7528 27.4128 27.1608L28.9717 26.8294L29.3055 28.3998L28.0561 28.6654C26.3367 29.0308 26.0896 29.5027 26.5135 31.4972L27.164 34.5577C27.5051 36.1625 26.5282 37.4844 24.2134 38.0363L24.2524 38.2197C26.5891 37.7709 28.0192 38.5811 28.3603 40.1859L29.0109 43.2464C29.4348 45.2409 29.8525 45.5715 31.5719 45.206L32.8213 44.9404L33.1551 46.5108ZM38.726 45.3267L38.3922 43.7563L39.6416 43.4907C41.361 43.1253 41.6082 42.6534 41.1842 40.6589L40.5337 37.5984C40.1926 35.9936 41.1696 34.6717 43.4868 34.1313L43.4478 33.9479C41.1087 34.3852 39.6785 33.575 39.3374 31.9702L38.6869 28.9097C38.2629 26.9152 37.8452 26.5846 36.1258 26.9501L34.8764 27.2157L34.5426 25.6453L36.1015 25.3139C38.8869 24.7219 39.9572 25.4169 40.559 28.2482L41.1047 30.8158C41.4824 32.5925 42.7309 33.3934 45.3547 32.5482L45.7957 34.6229C43.0549 34.9179 42.2426 36.1689 42.6178 37.9341L43.1636 40.5018C43.7654 43.333 43.0703 44.4033 40.2849 44.9953L38.726 45.3267Z"
      fill="currentColor"
    />
    <rect
      x="0.59303"
      y="-0.385118"
      width="39"
      height="55"
      rx="1.5"
      transform="matrix(0.978148 0.207912 0.207912 -0.978148 88.7086 58.3448)"
      stroke="currentColor"
    />
    <line
      x1="102.104"
      y1="14.5109"
      x2="115.798"
      y2="17.4217"
      stroke="currentColor"
    />
    <line
      x1="119.711"
      y1="18.2533"
      x2="133.405"
      y2="21.1641"
      stroke="currentColor"
    />
    <line
      x1="100.441"
      y1="22.3361"
      x2="114.135"
      y2="25.2469"
      stroke="currentColor"
    />
    <line
      x1="118.047"
      y1="26.0785"
      x2="131.741"
      y2="28.9893"
      stroke="currentColor"
    />
    <line
      x1="98.7774"
      y1="30.1613"
      x2="112.471"
      y2="33.072"
      stroke="currentColor"
    />
    <line
      x1="116.384"
      y1="33.9037"
      x2="130.078"
      y2="36.8145"
      stroke="currentColor"
    />
    <line
      x1="97.1141"
      y1="37.9865"
      x2="110.808"
      y2="40.8972"
      stroke="currentColor"
    />
    <line
      x1="114.721"
      y1="41.7289"
      x2="128.415"
      y2="44.6396"
      stroke="currentColor"
    />
    <line
      x1="95.4508"
      y1="45.8116"
      x2="109.145"
      y2="48.7224"
      stroke="currentColor"
    />
    <line
      x1="113.057"
      y1="49.5541"
      x2="126.752"
      y2="52.4648"
      stroke="currentColor"
    />
  </svg>
);

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

                    return cols.reduce(
                      (acc, col, i) => {
                        // @types/d3 is dreadfully wrong here. d is a string[] and
                        // after calling autoType we still have an array, just of
                        // mixed types. Accessing individual values by index is fine.
                        acc[col] = (typedRow as unknown[])[i];

                        return acc;
                      },
                      {} as Record<string, unknown>
                    );
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
      {UploadIcon}
      <p className="mt-2 text-sm">
        Upload a{' '}
        <label className="border-primary text-primary relative cursor-pointer border-b border-dotted">
          <input
            type="file"
            accept=".csv, .json"
            className="absolute h-full w-full opacity-[0.0001]"
            onChange={onChange}
          />
          JSON
        </label>{' '}
        or{' '}
        <label className="border-primary text-primary relative cursor-pointer border-b border-dotted">
          <input
            type="file"
            accept=".csv, .json"
            className="absolute h-full w-full opacity-[0.0001]"
            onChange={onChange}
          />
          CSV
        </label>{' '}
        file
      </p>
    </div>
  );
};

export default DataUpload;
