import { NavItem } from './NavItem';
import { MdDashboard, MdSearch } from 'react-icons/md';

export function Aside() {
  return (
    <aside className="w-full bg-blue-400 text-white text-center flex flex-col items-center justify-between p-4 lg:w-1/5">
      <h1 className="text-3xl lg:mb-8 lg:text-4xl">Crypto Search</h1>

      <nav className="my-4 lg:my-0">
        <ul className="flex flex-row gap-6 lg:flex-col lg:gap-4">
          <NavItem icon={<MdDashboard />} title="Dashboard" link="/" />

          <NavItem
            icon={<MdSearch />}
            title="Search for Crypto"
            link="/search-crypto"
          />
        </ul>
      </nav>

      <p className="text-sm">
        Developed by:{' '}
        <a
          className="hover:color-white"
          href="https://www.github.com/BrunoSantoni"
          target="_blank"
          rel="noreferrer"
        >
          Bruno Santoni
        </a>
      </p>
    </aside>
  );
}
