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
      className="text-3xl font-bold text-black flex flex-col stack-sm p-8 shadow-lg border border-linework rounded-2xl transition-transform hover:-translate-y-2 no-underline"
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
      <p className="text-2xl font-normal font-serif">{description}</p>
    </a>
  );
};

export default Card;
