// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    // @ts-ignore simple pattern
    (Component as any).getLayout ||
    ((page: ReactNode) => (
      <>
        <Header links={[
          { href: '/', label: 'Home' },
          { href: '/brand-assets', label: 'Brand Assets' },
          { href: '/contact', label: 'Contact' },
        ]}/>
        <main className="container">{page}</main>
      </>
    ));
  return getLayout(<Component {...pageProps} />);
}
