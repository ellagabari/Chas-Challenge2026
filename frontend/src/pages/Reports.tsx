import { useState } from 'react';
import ReportMap from '../components/Map/ReportMap';
import { ReportList } from '../components/ReportList';

export function ReportsPage() {
  const [position, setPosition] = useState<[number, number]>([59.3293, 18.0686]);

  return (
    <div className="min-h-screen pb-36" style={{ backgroundColor: '#EEFCF3' }}>
      <div className="w-full max-w-4xl px-4 pt-6 text-left">
        <h2
          className="font-bold text-12xl mb-5 ml-4"
          style={{ color: '#1D8244', margin: '0 0 20px' }}
        >
          All reports
        </h2>

      <section className="mb-8">
        <ReportMap position={position} setPosition={setPosition} />
      </section>

          <section className="rounded-2xl">
          <ReportList />
        </section>
      </div>
    </div>
  );
}