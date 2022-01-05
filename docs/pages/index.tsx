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

const Index: React.FC<Props> = ({ examples }) => {
  return (
    <>
      <Head>
        <title>reviz: Examples</title>
      </Head>
      <div className="flex flex-col stack-md lg:stack-lg lg:justify-center p-12 md:p-20 lg:p-12">
        <header>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold underline decoration-accent">
            <code>reviz</code> Examples
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
