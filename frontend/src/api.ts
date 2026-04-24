
// 1. Grab the URL once at the top of the file
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 2. Export functions that use that URL
export const fetchReports = async () => {
  const response = await fetch(`${API_BASE_URL}/api/reports`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  return response.json();
};
export const fetchLeaderboard = async (_timePeriod: 'allTime' | 'monthly' | 'weekly') => {

  throw new Error('Backend endpoint not yet implemented');
};
export const createReport = async (newReport: any) => {
  const response = await fetch(`${API_BASE_URL}/api/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReport),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create report');
  }
  return response.json();
};