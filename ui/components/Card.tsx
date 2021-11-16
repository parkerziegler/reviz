import * as React from 'react';
import Image from 'next/image';

import styles from './Card.module.css';

interface Props {
  name: string;
  href: string;
  description: string;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}

const Card: React.FC<Props> = ({ image, name, href, description }) => (
  <a href={href} className={`${styles['card']} ${styles['card__link']}`}>
    {image && <Image {...image} className={styles['card__image']} />}
    {name}
    <p className={styles['card__description']}>{description}</p>
  </a>
);

export default Card;
