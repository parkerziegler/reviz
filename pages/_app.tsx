import * as React from 'react';
import type { AppProps } from 'next/app';

import '../styles/index.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
