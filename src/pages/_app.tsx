// src/pages/_app.tsx
import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Red_Hat_Display } from "next/font/google";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import type { PageHeaderConfig } from "@/types/page";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const navLinks = [
  { href: "/printing-perth", label: "Print" },
  { href: "/design-perth", label: "Design" },
  { href: "/signage-perth", label: "Signage" },
  { href: "/corporate-print-perth", label: "Corporate" },
  { href: "/medical-supply-perth", label: "Medical" },
  // { href: "/contact", label: "Contact" },
];

export default function App({ Component, pageProps }: AppProps) {
  // Define the augmentation here so it can safely reference Component’s type.
  type NextPageWithLayout = typeof Component & {
    getLayout?: (page: ReactNode) => ReactNode;
    pageHeader?: PageHeaderConfig;
  };

  const Page = Component as NextPageWithLayout;

  const getLayout =
  Page.getLayout ??
  ((page: ReactNode) => (
    <div
      className={redHat.className}
      style={{ letterSpacing: "0.0250em", fontKerning: "normal" }} // kerning at browser default
    >
      <Header links={navLinks} />
      {Page.pageHeader ? <PageHeader {...Page.pageHeader} /> : null}
      <main className="w-full px-7">{page}</main>
    </div>
  ));

return getLayout(<Component {...pageProps} />);
}
