
import { useQuery } from '@tanstack/react-query';
import { fetchReports } from '../api'; // <--- THIS is the import

type Report = {
  id: number;
  location: string;
  description: string | null;
  size: string | null;
};

export function ReportList() {
  const { data, isLoading, isError, error } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: fetchReports, // use the name of the function here
  });

  if (isLoading) return <div className="p-4 text-emerald-400">Loading reports... ⏳</div>;
  
  if (isError) {
    return <div className="p-4 text-red-400">Error: {(error as Error).message} ❌</div>;
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-emerald-400">Reports from the Database</h2>
      <div className="grid gap-4">
        {data?.map((report) => (
          <div key={report.id} className="bg-slate-800 border border-slate-700 p-4 rounded shadow-sm hover:bg-slate-700 transition">
            <p className="text-slate-100"><strong>Location:</strong> {report.location}</p>
            <p className="text-slate-100"><strong>Description:</strong> {report.description}</p>
            <p className="text-sm text-emerald-400 italic">Size: {report.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
}