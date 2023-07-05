import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import Head from 'next/head';

import Card from '../src/components/shared/Card';
import { normalizeExampleName } from '../src/helpers/isomorphic';
import { metadata } from '../src/helpers/metadata';
import { RevizLogo } from '../src/helpers/logos';

function getExamples(): string[] {
  const examples = fs
    .readdirSync(path.join(process.cwd(), 'app', 'examples'))
    .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

  return examples;
}

const Index: React.FC = () => {
  const examples = getExamples();

  return (
    <>
      <Head>
        <title>reviz: Examples</title>
      </Head>
      <div className="stack-md lg:stack-lg flex flex-col p-12 md:p-20 lg:justify-center lg:p-12">
        <header>
          <h1 className="decoration-accent flex items-center text-4xl font-bold underline md:text-5xl lg:text-6xl">
            {RevizLogo}
            <span className="ml-4">Examples</span>
          </h1>
        </header>
        <main className="stack-md">
          <p className="font-serif text-xl md:text-2xl lg:text-3xl">
            See how <code>reviz</code> generates partial Observable Plot
            programs from this collection of example data visualizations.
          </p>
          <ul className="grid list-none grid-cols-12 gap-8 lg:gap-16">
            {examples.map((example) => {
              const name = normalizeExampleName(example);

              return (
                <li
                  key={example}
                  className="col-span-12 self-center md:col-span-6 lg:col-span-4"
                >
                  <Card
                    name={name}
                    href={`examples/${example}`}
                    description={metadata[example].alt}
                    image={metadata[example]}
                    icon={metadata[example].icon}
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

export default Index;
