import * as React from 'react';
import type { AppProps } from 'next/app';

import '../styles/index.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const removeFouc = (foucElement): void => {
      foucElement.className = foucElement.className.replace('no-fouc', 'fouc');
    };

    removeFouc(document.documentElement);
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
