// src/components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";

type NavLink = { href: string; label: string };

/**
 * Behavior:
 * - md and up: single inline row, no wrap, compact spacing so items fit.
 * - sm to md: inline row that wraps into two+ rows as needed (no slider).
 * - <sm: vertical list, small, no stretching (links keep intrinsic width).
 */
export default function Header({ links }: { links: NavLink[] }) {
  const { pathname } = useRouter();

  return (
    <header
      className="
        w-full bg-[#333333] backdrop-blur-sm
        flex items-center gap-4 px-7 py-6
        flex-col sm:flex-row
        sm:flex-wrap md:flex-nowrap
        sm:sticky sm:top-0 sm:z-50
      "
    >
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-neutral-900 focus:text-white"
      >
        Skip to content
      </a>

      {/* Logo links home; decorative image uses empty alt */}
      <Link href="/" aria-label="Print Impact home" className="inline-flex">
        <img src="/logos/wrect.svg" alt="" className="h-12 w-auto" />
      </Link>

      {/* Nav */}
      <nav
        aria-label="Primary"
        className="
          order-2 sm:order-none
          w-full sm:w-auto
          flex
          flex-col sm:flex-row
          gap-2 sm:gap-2 md:gap-3
          ml-8
          sm:flex-wrap md:flex-nowrap
        "
      >
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`
                inline-flex items-center rounded-full border-[2px] transition
                whitespace-nowrap
                px-3 py-1 text-[0.9rem]
                sm:px-2 md:px-3 lg:px-4
                sm:text-[0.95rem]
                md:text-[clamp(0.95rem,1vw,1.05rem)]
                ${active
                  ? "border-[#0e7dc2] bg-[#444444] text-white"
                  : "border-[#f8f8f8] text-[#f8f8f8] bg-[#333333] hover:border-[#0e7dc2] hover:text-[#333333] hover:bg-white"
                }
              `}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="sm:ml-auto mr-4">
        <Link
          href="/contact"
          className="
            inline-block rounded-sm px-4 py-2
            text-[#f8f8f8] bg-[#0e7dc2]
            text-lg sm:text-xl md:text-2xl border-2 border-transparent
            hover:border-white
          "
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
