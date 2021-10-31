import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';

interface Props {
  examples: string[];
}

function normalizeExampleName(name: string): string {
  const parts = name.split('-');

  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const Index: React.FC<Props> = ({ examples }) => {
  return (
    <ul className="example-list">
      {examples.map((example) => (
        <li key={example} className="example-list__item">
          <a href={`examples/${example}`} className="example-list__link">
            {normalizeExampleName(example)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const files = fs.readdirSync(path.join(process.cwd(), 'pages', 'examples'));
  const examples = files.map((file) => path.basename(file, '.tsx'));

  return {
    props: {
      examples,
    },
  };
}

export default Index;
