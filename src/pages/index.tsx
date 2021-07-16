import { Aside } from 'components/shared/Aside';
import { Dashboard } from 'components/Dashboard';

export default function Home() {
  return (
    <section className="flex flex-col lg:flex-row">
      <Aside />
      <Dashboard />
    </section>
  );
}
