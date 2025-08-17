// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { Red_Hat_Display } from "next/font/google";
import Header from '@/components/Header';

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["600", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    // @ts-ignore simple pattern
    (Component as any).getLayout ||
    ((page: ReactNode) => (
      <div className={redHat.className}>
        <Header
          links={[
            { href: '/', label: 'About' },
            { href: '/signage', label: 'Signage' },
            { href: '/stationary', label: 'Stationary' },
            { href: '/contact', label: 'Contact' },
          ]}
        />
        <main className="container">{page}</main>
      </div>
    ));

  return getLayout(<Component {...pageProps} />);
}
