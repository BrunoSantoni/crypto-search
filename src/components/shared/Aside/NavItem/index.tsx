import { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItemProps = {
  icon: ReactElement;
  title: string;
  link: string;
};

export function NavItem({ icon, title, link }: NavItemProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (asPath === link) {
    isActive = true;
  }

  // Caso seja o link selecionado atualmente, muda a estilização
  if (isActive) {
    return (
      <li className="flex items-center text-yellow-300 justify-center gap-1 text-lg translate-x-0 transition color duration-200 lg:text-xl">
        {icon}
        <Link href={link}>{title}</Link>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-center gap-1 text-lg translate-x-0 transition color duration-200 hover:text-yellow-100 lg:text-xl">
      {icon}
      <Link href={link}>{title}</Link>
    </li>
  );
}
