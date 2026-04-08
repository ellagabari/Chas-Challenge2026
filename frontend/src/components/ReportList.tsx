
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

  if (isLoading) return <div className="p-4">Loading reports... ⏳</div>;
  
  if (isError) {
    return <div className="p-4 text-red-500">Error: {(error as Error).message} ❌</div>;
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reports from the Database</h2>
      <div className="grid gap-4">
        {data?.map((report) => (
          <div key={report.id} className="border p-4 rounded shadow-sm">
            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Description:</strong> {report.description}</p>
            <p className="text-sm text-gray-500 italic">Size: {report.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
}