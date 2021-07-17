import { Aside } from '../components/shared/Aside';
import { Search } from '../components/Search';

export default function SearchCrypto() {
  return (
    <section className="flex flex-col min-h-screen lg:flex-row">
      <Aside />
      <Search />
    </section>
  );
}
