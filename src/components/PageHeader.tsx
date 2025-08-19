// src/components/PageHeader.tsx
import Head from "next/head";
import { useRouter } from "next/router";

type PageHeaderProps = {
  /** Main page title (renders as <h1>) */
  title?: string;
  /** Section link bullets. Each becomes an anchor link to #slug */
  items?: string[];
  /** SEO description */
  description?: string;
  /** Canonical path like "/signage-perth". Falls back to current route. */
  canonical?: string;
  /** Base site URL. Defaults to NEXT_PUBLIC_SITE_URL. No hard-coded fallback. */
  siteUrl?: string;
  /** Toggle ItemList JSON-LD for bullets */
  emitStructuredData?: boolean;
};

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PageHeader({
  title = "",
  items = [],
  description,
  canonical,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "",
  emitStructuredData = true,
}: PageHeaderProps) {
  const { asPath } = useRouter();

  // Canonical: strip query/hash and normalize leading slash
  const rawPath = (canonical ?? asPath) || "";
  const pathOnly = rawPath.split("#")[0].split("?")[0];
  const normalizedPath = pathOnly ? (pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`) : "";
  const canonicalUrl = siteUrl && normalizedPath ? `${siteUrl}${normalizedPath}` : undefined;

  // ItemList JSON-LD for bullets
  const itemListJsonLd =
    emitStructuredData && items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title ? `${title} services` : "Services",
          itemListElement: items.map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            url: canonicalUrl ? `${canonicalUrl}#${slugify(name)}` : undefined,
          })),
        }
      : null;

  return (
    <>
      {(title || description || canonicalUrl || itemListJsonLd) && (
        <Head>
          {title && <title>{title} | Print Impact</title>}
          {description && <meta name="description" content={description} />}
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

          {/* Open Graph / Twitter */}
          {title && <meta property="og:title" content={`${title} | Print Impact`} />}
          {description && <meta property="og:description" content={description} />}
          {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Print Impact" />
          <meta property="og:locale" content="en_AU" />
          <meta name="twitter:card" content="summary_large_image" />

          {itemListJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
          )}
        </Head>
      )}

      <div className="bg-[#f8f8f8]">
        <div className="flex flex-col md:flex-row justify-center gap-6 px-16 py-8">
          {title && <h1 className="text-3xl font-bold text-[#333333]">{title}</h1>}

          {items.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-9 gap-y-3 text-xl text-[#333333] list-disc list-inside mt-[0.5rem] p-0">
              {items.map((text) => {
                const id = slugify(text);
                return (
                  <li key={id} className="whitespace-nowrap">
                    {/* No id here to avoid duplicate IDs with <section id={id}> in the page */}
                    <h2 className="inline text-xl font-semibold">
                      <a href={`#${id}`}>{text}</a>
                    </h2>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {(title || items.length > 0) && <div className="h-px w-full bg-[#333333]" />}

        <div className="mt-[0.5rem]" />
      </div>
    </>
  );
}
