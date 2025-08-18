// src/pages/_app.tsx
import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Red_Hat_Display } from "next/font/google";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const navLinks = [
  { href: "/", label: "About" },
  { href: "/signage", label: "Signage" },
  { href: "/stationery", label: "Stationery" },
  { href: "/medical", label: "Medical" },
  // { href: "/contact", label: "Contact" },
];

export default function App({ Component, pageProps }: AppProps) {
  type NextPageWithLayout = typeof Component & {
    getLayout?: (page: ReactNode) => ReactNode;
    pageHeader?: { title?: string; items?: string[] };
  };

  const Page = Component as NextPageWithLayout;

  const getLayout =
    Page.getLayout ||
    ((page: ReactNode) => (
      <div className={redHat.className}>
        <Header links={navLinks} />
        {/* Page-specific header */}
        {Page.pageHeader && <PageHeader {...Page.pageHeader} />}
        <main className="w-full px-7">{page}</main>
      </div>
    ));

  return getLayout(<Component {...pageProps} />);
}
