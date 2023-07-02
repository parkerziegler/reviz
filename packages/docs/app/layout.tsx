// eslint-disable-next-line camelcase
import { Source_Serif_4 } from 'next/font/google';

import './index.css';

const sourceSerifPro = Source_Serif_4({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className={sourceSerifPro.className}>
        <div className="mx-auto w-full max-w-screen-xl">{children}</div>
      </body>
    </html>
  );
}
