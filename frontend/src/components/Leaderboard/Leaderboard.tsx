import { useState } from 'react';
import { useLeaderboard, type TimePeriod } from '../../hooks/useLeaderboard';
import { LeaderboardTable } from './LeaderboardTable';
import { TimePeriodFilter } from './TimePeriodFilter';

export function Leaderboard() {
  // State för vald tidsperiod
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('allTime');

  // State för sorting
  const [sortBy, setSortBy] = useState<'rank' | 'points' | 'username'>('rank');

  // Fetch data 
  const { data, isLoading, isError, error } = useLeaderboard(selectedPeriod);

  // hantera loading state
  if (isLoading) {
    return (
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <div className="loading-message">Loading leaderboard data... ⏳</div>
      </div>
    );
  }

  // hantera error state
  if (isError) {
    return (
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <div className="error-message">
          Error loading leaderboard: {(error as Error).message} ❌
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      
      {/* tids filter knappar */}
      <TimePeriodFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

      {/* Main table */}
      {data && data.entries.length > 0 ? (
        <LeaderboardTable entries={data.entries} sortBy={sortBy} onSortChange={setSortBy} />
      ) : (
        <div className="empty-message">No leaderboard data available</div>
      )}

      {/* Footer med information om senaste uppdatering */}
      <p className="last-updated">Last updated: {data?.lastUpdated}</p>
    </div>
  );
}