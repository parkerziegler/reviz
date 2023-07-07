import * as React from 'react';

import RevizOutput from './RevizOutput';

interface Props {
  href: string;
  title: string;
}

const Visualization: React.FC<React.PropsWithChildren<Props>> = ({
  href,
  title,
  children,
}) => {
  return (
    <div className="lg:viz-grid absolute inset-0 flex flex-col lg:grid">
      <div className="flex flex-col items-center">
        <div className="flex flex-1 items-center p-8 pb-0">{children}</div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="decoration-accent border-t-linework w-full p-4 text-center text-xl font-semibold underline decoration-2 md:text-2xl lg:border-t lg:p-8 lg:text-4xl"
        >
          {title}
        </a>
      </div>
      <RevizOutput />
    </div>
  );
};

export default Visualization;
