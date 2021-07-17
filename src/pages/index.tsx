import { Aside } from 'components/shared/Aside';
import { Dashboard } from 'components/Dashboard';

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen lg:flex-row">
      <Aside />
      <Dashboard />
    </section>
  );
}
