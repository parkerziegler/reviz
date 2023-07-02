import * as React from 'react';
import Image, { type StaticImageData } from 'next/image';

interface Props {
  name: string;
  href: string;
  description: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  icon?: React.ReactNode;
}

const Card: React.FC<Props> = ({ name, href, description, image, icon }) => {
  return (
    <a
      href={href}
      className="stack-sm border-linework flex flex-col rounded-2xl border p-8 text-3xl font-bold text-black no-underline shadow-lg transition-transform hover:-translate-y-2"
    >
      <Image src={image.src} alt={image.alt} />
      {icon ? (
        <div className="flex items-center">
          {icon}
          <p className="ml-4">{name}</p>
        </div>
      ) : (
        name
      )}
      <p className="font-serif text-2xl font-normal">{description}</p>
    </a>
  );
};

export default Card;
