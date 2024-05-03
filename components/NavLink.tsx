import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => (
  <Link href={href}>{label}</Link>
);

export default NavLink;