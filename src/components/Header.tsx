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
        z-50 backdrop-blur-sm
        bg-[#333333]
      "// border-b-3 border-[#0e7dc2]
    >
      <img src="/logos/wrect.svg" alt="Print Impact" className="h-13 w-auto" />

      <nav className="flex flex-wrap gap-5">
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + '/');
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`
                px-4 py-0
                rounded-full
                border-2
                text-lg
               
              
                ${active
                  ? 'border-[#0e7dc2] bg-[#ffffff] text-[#333333]'
                  : 'border-white text-white hover:border-[#0e7dc2] bg-[#333333] hover:text-[#333333]  hover:bg-[#ffffff]'
                }
              `}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="ml-auto px-20">
        <Link
          href="/contact"
          className="px-6 py-1 my-[5rem] rounded-full border-2 text-white bg-[#0e7dc2] text-3xl border-white"
        >
          Contact
        </Link>
      </div>

    </header>
  );
}
