import { readdirSync } from 'node:fs';
import path from 'node:path';

import * as React from 'react';
import type { Metadata } from 'next';

import Card from '../src/components/shared/Card';
import { normalizeExampleName } from '../src/helpers/isomorphic';
import { RevizLogo } from '../src/helpers/logos';
import { metadata as examplesMetadata } from '../src/helpers/metadata';

export const metadata: Metadata = {
  title: 'reviz: Examples',
  description:
    'A collection of examples showing how reviz can reverse engineer diverse SVG visualizations from the DOM.',
};

/**
 * Fetch and sort examples from the filesystem.
 *
 * @returns – A sorted array of example names.
 */
function getExamples(): string[] {
  const examples = readdirSync(
    path.join(process.cwd(), 'app', 'examples')
  ).sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

  return examples;
}

const Index: React.FC = () => {
  const examples = getExamples();

  return (
    <div className="stack stack-base lg:stack-lg p-12 md:p-20 lg:justify-center lg:p-12">
      <header>
        <h1 className="decoration-accent flex items-center text-4xl font-semibold underline md:text-5xl lg:text-6xl">
          {RevizLogo}
          <span className="ml-4">Examples</span>
        </h1>
      </header>
      <main className="stack stack-base">
        <p className="font-serif text-xl md:text-2xl lg:text-3xl">
          See how <code>reviz</code> generates partial Observable Plot programs
          from this collection of example data visualizations.
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
                  description={examplesMetadata[example].alt}
                  image={examplesMetadata[example]}
                  icon={examplesMetadata[example].icon}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Index;
