import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLink = { href: string; label: string };

export default function Header({ links }: { links: NavLink[] }) {
  const { pathname } = useRouter();

  return (
    <header
      className="
        flex flex-wrap sm:flex-nowrap
        items-center
        gap-8
        p-6
        sticky top-0 left-0 w-full
        z-50 backdrop-stationery-sm
        bg-[#e8e5e2]/40
        border-b-2 border-[#7c7c7c]/80
        
      "// border-b-3 border-[#0e7dc2]
    >
      <img src="/logos/full.svg" alt="Print Impact" className="h-15 w-auto" />

      <nav className="flex flex-wrap gap-5">
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + '/');
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`
                px-4 py-1
                rounded-full
                border-2 border-transparent
                text-lg
                ${
                  active
                    ? 'border-[#0e7dc2] text-[#e8e5e2]'
                    : 'hover:border-[#0e7dc2] hover:text-[#e8e5e2]'
                }
              `}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
