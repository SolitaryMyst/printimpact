// src/pages/_app.tsx
import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Red_Hat_Display } from "next/font/google";

import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import type { PageHeaderConfig } from "@/types/page";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import Footer from "@/components/Footer";

import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const navLinks = [
  { href: "/", label: "Print" },
  { href: "/design-perth", label: "Design" },
  { href: "/signage-perth", label: "Signage" },
  { href: "/corporate-print-perth", label: "Corporate" },
  { href: "/medical-supply-perth", label: "Medical" },
  // { href: "/contact", label: "Contact" },
];

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }: AppProps) {
  // Allow per-page layout and header config
  type NextPageWithLayout = typeof Component & {
    getLayout?: (page: ReactNode) => ReactNode;
    pageHeader?: PageHeaderConfig;
  };
  const Page = Component as NextPageWithLayout;

  // Track SPA navigations for GA4
  const router = useRouter();
  useEffect(() => {
    if (!GA_ID) return;
    const onRouteChange = (url: string) => {
      (window as any).gtag?.("config", GA_ID, { page_path: url });
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [router.events]);

  const getLayout =
    Page.getLayout ??
    ((page: ReactNode) => (
      <div
        className={redHat.className}
        style={{ letterSpacing: "0.0250em", fontKerning: "normal" }}
      >
        {/* GA4 */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}

        <LocalBusinessJsonLd />
        <Header links={navLinks} />
        {Page.pageHeader ? <PageHeader {...Page.pageHeader} /> : null}
        {/* Do NOT wrap with <main>; pages render <main id="main"> themselves */}
        <div className="w-full px-7">{page}</div>
        <Footer />
      </div>
    ));

  return getLayout(<Component {...pageProps} />);
}
