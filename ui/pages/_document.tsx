import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html className="no-fouc">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
