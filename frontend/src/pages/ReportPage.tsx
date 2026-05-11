import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportMap from '../components/Map/ReportMap';
import { ReportList } from '../components/ReportList';

export const ReportsPage = () => {
  const [position, setPosition] = useState<[number, number]>([59.3293, 18.0686]);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Report Trash</h1>

      <section className="mb-8">
        <ReportMap position={position} setPosition={setPosition} />
      </section>

      <section className="mb-8">
        <button
          onClick={() => navigate('/add-picture')}
          className="w-full py-3 px-4 rounded-md font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          + Add New Report
        </button>
      </section>

      <section className="mt-4 bg-white rounded-lg shadow-md">
        <ReportList />
      </section>
    </div>
  );
}