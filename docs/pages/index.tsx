import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import Head from 'next/head';

import { normalizeExampleName } from '../helpers/isomorphic';
import Card from '../components/Card';
import { metadata } from '../helpers/metadata';

interface Props {
  examples: string[];
}

const RevizLogo = (
  <svg
    width="75.25"
    height="50.875"
    viewBox="0 0 602 407"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path
        d="m349.753 350.456-20.345 52.602H311.56l-22.144-52.602h37.703l4.638 12.528 4.274-12.528h13.722Zm203.083 0-25.39 41.936h32.87l6.713-28.058h18.75l-2.314 38.724h-97.686v-9.043l27.245-43.559h39.812Zm-100.926 0v20.715c0 6.619.078 12.81.233 18.572l11.636 2.336v10.98h-61.672v-10.98l12.567-2.804c.155-5.606.233-11.68.233-18.22v-20.599h37.003Z"
        stroke="#D9A675"
      />
      <path
        d="M184.699 374.867c6.03 5.885 13.116 8.827 21.26 8.827 6.42 0 11.902-1.216 16.443-3.648 4.542-2.433 8.536-5.454 11.98-9.064l8.223 7.533c-4.855 9.26-11.433 16.165-19.733 20.716-8.3 4.552-18.167 6.827-29.599 6.827-11.432 0-21.534-2.393-30.304-7.18-8.77-4.786-15.66-11.692-20.672-20.716-4.38-7.886-6.846-17.121-7.398-27.705h39.83c1.117 10.876 4.44 19.012 9.97 24.41Zm-116.57-24.41.001 20.289c0 6.199.078 12.01.234 17.434l18.463 3.952v10.926H17.649v-10.926l12.854-2.557a678.12 678.12 0 0 0 .234-18.364v-20.755h37.392Z"
        stroke="#6B7AA7"
      />
      <g strokeWidth="2">
        <path
          d="M183.875 297.593c5.986 5.823 13.02 8.735 21.105 8.735 6.374 0 11.815-1.204 16.323-3.61 4.509-2.408 8.473-5.397 11.893-8.969l8.162 7.454c-4.819 9.162-11.349 15.995-19.588 20.498-8.24 4.504-18.034 6.755-29.383 6.755s-21.376-2.368-30.082-7.104c-8.706-4.736-15.547-11.569-20.522-20.498-4.104-7.367-6.516-15.924-7.234-25.67h39.631c1.275 9.892 4.507 17.36 9.695 22.409ZM68.093 275.184v17.4c0 6.212.078 12.036.233 17.47l18.423 3.96v10.948H17.723v-10.947l12.826-2.563c.155-5.745.233-11.88.233-18.401v-17.867h37.31Z"
          stroke="#6B7AA7"
        />
        <path
          d="m349.753 272.456-20.345 52.602H311.56l-22.144-52.602h37.703l4.638 12.528 4.274-12.528h13.722Zm203.083 0-25.39 41.936h32.87l6.713-28.058h18.75l-2.314 38.724h-97.686v-9.043l27.245-43.559h39.812Zm-100.926 0v20.715c0 6.619.078 12.81.233 18.572l11.636 2.336v10.98h-61.672v-10.98l12.567-2.804c.155-5.606.233-11.68.233-18.22v-20.599h37.003Z"
          stroke="#D9A675"
        />
      </g>
      <g strokeWidth="3">
        <path
          d="M183.875 220.593c5.986 5.823 13.02 8.735 21.105 8.735 6.374 0 11.815-1.204 16.323-3.61 4.509-2.408 8.473-5.397 11.893-8.969l8.162 7.454c-4.819 9.162-11.349 15.995-19.588 20.498-8.24 4.504-18.034 6.755-29.383 6.755s-21.376-2.368-30.082-7.104c-8.706-4.736-15.547-11.569-20.522-20.498-4.104-7.367-6.516-15.924-7.234-25.67h39.631c1.275 9.892 4.507 17.36 9.695 22.409ZM68.093 198.184v17.4c0 6.212.078 12.036.233 17.47l18.423 3.96v10.948H17.723v-10.947l12.826-2.563c.155-5.745.233-11.88.233-18.401v-17.867h37.31Z"
          stroke="#6B7AA7"
        />
        <path
          d="m349.753 195.456-20.345 52.602H311.56l-22.144-52.602h37.703l4.638 12.528 4.274-12.528h13.722Zm203.083 0-25.39 41.936h32.87l6.713-28.058h18.75l-2.314 38.724h-97.686v-9.043l27.245-43.559h39.812Zm-100.926 0v20.715c0 6.619.078 12.81.233 18.572l11.636 2.336v10.98h-61.672v-10.98l12.567-2.804c.155-5.606.233-11.68.233-18.22v-20.599h37.003Z"
          stroke="#D9A675"
        />
      </g>
      <g fillRule="nonzero">
        <g fill="#D9A675">
          <path d="M337.436 74.249V64h44.074v10.249l-13.526 2.562-38.477 100.161h-17.723L269.809 76.578l-11.427-2.329V64h66.228v10.249l-14.692 3.028 21.92 59.631 20.289-59.864zM401.565 176.506v-10.948l12.592-2.795c.156-5.59.233-11.647.233-18.169V116.41c0-6.367-.039-11.686-.116-15.956a277.14 277.14 0 0 0-.583-13.394l-14.458-2.096V75.88l48.97-15.607 3.965 2.562-.7 33.775v48.1c0 6.6.078 12.773.234 18.519l11.66 2.33v10.947h-61.797Zm31.015-133.47c-5.442 0-10.106-1.747-13.992-5.24-3.887-3.495-5.83-7.882-5.83-13.161 0-5.436 1.943-9.9 5.83-13.394C422.474 7.747 427.138 6 432.58 6c5.44 0 10.105 1.747 13.991 5.241 3.887 3.494 5.83 7.958 5.83 13.394 0 5.28-1.943 9.666-5.83 13.16-3.886 3.494-8.55 5.241-13.991 5.241ZM484.116 176.506v-9.084l58.3-92.94H510.7l-6.296 25.855-18.89-.931L487.382 64h95.144v8.851l-56.433 92.94h33.114l6.762-28.185h18.889l-2.332 38.9z" />
        </g>
        <g fill="#6B7AA7">
          <path d="M17.723 176.506v-10.948l12.826-2.562c.155-5.746.233-11.88.233-18.402v-30.747c0-4.348-.04-7.92-.117-10.714-.078-2.796-.155-5.397-.233-7.804a472.511 472.511 0 0 0-.35-8.269l-14.225-2.096V75.88l45.94-15.607 4.197 2.562 2.1 27.486c3.264-9.938 7.85-17.43 13.758-22.478 5.907-5.046 11.737-7.57 17.49-7.57 5.13 0 9.56 1.437 13.292 4.31 3.73 2.872 6.063 7.181 6.996 12.927-.156 6.056-1.788 10.754-4.897 14.092-3.11 3.34-6.996 5.008-11.66 5.008-6.53 0-12.515-3.649-17.956-10.947l-1.4-1.864c-3.42 3.261-6.568 7.376-9.444 12.346-2.876 4.969-4.936 10.17-6.18 15.606v32.378c0 6.211.078 12.034.233 17.47l18.423 3.96v10.947H17.723ZM191.92 72.386c-4.352 0-8.356 2.678-12.009 8.036-3.653 5.357-5.713 15.18-6.18 29.466h19.822c5.597 0 9.367-1.126 11.31-3.378 1.943-2.252 2.915-6.017 2.915-11.297 0-7.765-1.555-13.51-4.664-17.237-3.11-3.727-6.84-5.59-11.193-5.59ZM192.388 180c-11.349 0-21.376-2.368-30.082-7.104-8.706-4.737-15.547-11.57-20.522-20.498-4.974-8.93-7.462-19.605-7.462-32.029 0-13.044 2.915-24.03 8.745-32.96 5.83-8.928 13.331-15.683 22.503-20.264 9.173-4.581 18.734-6.872 28.684-6.872 10.26 0 19.005 2.174 26.234 6.522 7.23 4.348 12.71 10.21 16.44 17.587 3.732 7.376 5.597 15.8 5.597 25.273 0 4.503-.466 8.618-1.399 12.345h-67.394c.778 12.268 4.159 21.313 10.144 27.137 5.986 5.823 13.02 8.734 21.105 8.734 6.374 0 11.815-1.203 16.323-3.61 4.509-2.407 8.473-5.396 11.893-8.968l8.162 7.454c-4.819 9.162-11.349 15.995-19.588 20.498-8.24 4.503-18.034 6.755-29.383 6.755Z" />
        </g>
      </g>
    </g>
  </svg>
);

const Index: React.FC<Props> = ({ examples }) => {
  return (
    <>
      <Head>
        <title>reviz: Examples</title>
      </Head>
      <div className="flex flex-col stack-md lg:stack-lg lg:justify-center p-12 md:p-20 lg:p-12">
        <header>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center underline decoration-accent">
            {RevizLogo}
            <span className="ml-4">Examples</span>
          </h1>
        </header>
        <main className="stack-md">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif">
            See how <code>reviz</code> generates partial Observable Plot
            programs from this collection of example data visualizations.
          </p>
          <ul className="grid grid-cols-12 gap-8 lg:gap-16 list-none">
            {examples.map((example) => {
              const name = normalizeExampleName(example);

              return (
                <li
                  key={example}
                  className="col-span-12 md:col-span-6 lg:col-span-4 self-center"
                >
                  <Card
                    name={name}
                    href={`examples/${example}`}
                    description={metadata[example].alt}
                    image={metadata[example]}
                  />
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const files = fs.readdirSync(path.join(process.cwd(), 'pages', 'examples'));
  const examples = files
    .filter(
      (file) =>
        path.extname(file) === '.tsx' && path.basename(file, '.tsx') !== 'index'
    )
    .map((file) => {
      return path.basename(file, '.tsx');
    })
    .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

  return {
    props: {
      examples,
    },
  };
}

export default Index;
