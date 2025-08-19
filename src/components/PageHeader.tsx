import Head from "next/head";
import { useRouter } from "next/router";

type PageHeaderProps = {
  title?: string;
  items?: string[];
  /** Optional SEO */
  description?: string;
  /** Canonical path like "/signage". Falls back to current route. */
  canonical?: string;
  /** Base site URL. Defaults to NEXT_PUBLIC_SITE_URL. */
  siteUrl?: string;
  /** Toggle ItemList JSON-LD. */
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
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://new.printimpact.com.au",
  emitStructuredData = true,
}: PageHeaderProps) {
  const { asPath } = useRouter();
  const canonicalUrl =
    siteUrl && (canonical || asPath)
      ? `${siteUrl}${(canonical || asPath).startsWith("/") ? (canonical || asPath) : `/${canonical || asPath}`}`
      : undefined;

  const itemListJsonLd =
    items.length > 0
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
          {emitStructuredData && itemListJsonLd && (
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
                    {/* Promote each bullet to an H2 for semantic weight while keeping the inline bullet layout */}
                    <h2 id={id} className="inline text-xl font-semibold">
                      <a href={`#${id}`}>{text}</a>
                    </h2>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {(title || items.length > 0) && <div className="h-px w-full bg-[#333333]" />}

        <div className="mt-[2rem]" />
      </div>
    </>
  );
}
