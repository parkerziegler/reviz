import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import Head from 'next/head';

import { normalizeExampleName } from '../helpers/isomorphic';
import Card from '../components/Card';

import styles from './index.module.css';

interface Props {
  examples: {
    name: string;
    description: string;
    image: {
      src: string;
      width: number;
      height: number;
    };
  }[];
}

const Index: React.FC<Props> = ({ examples }) => {
  return (
    <>
      <Head>
        <title>reviz: Examples</title>
      </Head>
      <ul className={styles['example-list']}>
        {examples.map((example) => {
          const name = normalizeExampleName(example.name);

          return (
            <li key={example.name} className={styles['example-list__item']}>
              <Card
                name={name}
                href={`examples/${example.name}`}
                description={example.description}
                image={{
                  ...example.image,
                  alt: name,
                }}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const descriptions = {
    curated:
      "These examples were reproduced from Mike Bostock's collection of notebooks on Observeable's Plot library.",
    'real-world':
      'These examples were copied directly from published outlets like the New York Times, Washington Post and FiveThirtyEight.',
  };

  const thumbnails = {
    curated: {
      src: '/curated.png',
      width: 1302,
      height: 804,
    },
    'real-world': {
      src: '/real-world.png',
      width: 1080,
      height: 976,
    },
  };

  const files = fs.readdirSync(path.join(process.cwd(), 'pages', 'examples'));
  const examples = files.map((file) => {
    const name = path.basename(file);

    return {
      name,
      description: descriptions[name],
      image: thumbnails[name],
    };
  });

  return {
    props: {
      examples,
    },
  };
}

export default Index;
