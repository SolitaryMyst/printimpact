// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-AU">
        <Head>
          {/* SVG for modern browsers; Safari ignores this */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          {/* PNG fallbacks */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          {/* Classic ICO fallback */}
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* Apple & Safari pinned tab */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0e7dc2" />
          {/* PWA manifest and theme */}
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
