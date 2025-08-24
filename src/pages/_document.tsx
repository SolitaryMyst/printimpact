// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-AU">
        <Head>
          <link rel="icon" href="/favicon25.ico" sizes="any"/>
          <link rel="icon" href="/favicon25.svg" type="image/svg+xml"/>
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon25-48x48.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon25-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon25-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#333333" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
