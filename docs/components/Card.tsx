import * as React from 'react';
import Image from 'next/image';

interface Props {
  name: string;
  href: string;
  description: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
}

const Card: React.FC<Props> = ({ image, name, href, description }) => {
  return (
    <a
      href={href}
      className="flex flex-col stack-sm p-8 shadow-lg border border-linework rounded-2xl transition-transform hover:-translate-y-2 no-underline font-bold text-black text-3xl"
    >
      <Image src={image.src} alt={image.alt} />
      {name}
      <p className="font-normal font-serif text-2xl">{description}</p>
    </a>
  );
};

export default Card;
