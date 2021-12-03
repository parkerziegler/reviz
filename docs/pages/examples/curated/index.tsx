import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import Head from 'next/head';

import { normalizeExampleName } from '../../../helpers/isomorphic';
import Card from '../../../components/Card';

import styles from './index.module.css';

interface Props {
  examples: {
    name: string;
  }[];
}

const Index: React.FC<Props> = ({ examples }) => {
  return (
    <>
      <Head>
        <title>reviz: Curated Examples</title>
      </Head>
      <ul className={styles['example-list']}>
        {examples.map((example) => (
          <li key={example.name}>
            <Card
              name={normalizeExampleName(example.name)}
              href={`curated/${example.name}`}
              description=""
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const files = fs.readdirSync(
    path.join(process.cwd(), 'pages', 'examples', 'curated')
  );
  const examples = files
    .filter(
      (file) =>
        path.extname(file) === '.tsx' && path.basename(file, '.tsx') !== 'index'
    )
    .map((file) => {
      const name = path.basename(file, '.tsx');

      return {
        name,
      };
    });

  return {
    props: {
      examples,
    },
  };
}

export default Index;
