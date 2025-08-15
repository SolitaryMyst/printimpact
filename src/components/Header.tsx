import Link from 'next/link';
import { useRouter } from 'next/router';
type NavLink = { href: string; label: string };

export default function Header({ links }: { links: NavLink[] }) {
  const { pathname } = useRouter();
  return (
    <header className="nav">
      {links.map(l => {
        const active = pathname === l.href || pathname.startsWith(l.href + '/');
        return (
          <Link key={l.href} href={l.href} className={active ? 'a active' : 'a'}>
            {l.label}
          </Link>
        );
      })}
    </header>
  );
}
