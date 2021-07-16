import { ReactElement } from 'react';
import Link from 'next/link';

type NavItemProps = {
  icon: ReactElement;
  title: string;
  link: string;
};

export function NavItem({ icon, title, link }: NavItemProps) {
  return (
    <li className="flex items-center justify-center gap-1 text-lg transform transition transform duration-200 hover:translate-x-2 lg:text-xl">
      {icon}
      <Link href={link}>{title}</Link>
    </li>
  );
}
