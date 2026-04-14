import { type LeaderboardEntry } from './LeaderboardTypes';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  sortBy: 'rank' | 'points' | 'username';
  onSortChange: (sortBy: 'rank' | 'points' | 'username') => void;
}

export function LeaderboardTable({ entries, sortBy, onSortChange }: LeaderboardTableProps) {
  // Sortera entries baserat på sortBy prop
  const sortedEntries = [...entries].sort((a, b) => {
    switch (sortBy) {
      case 'rank':
        return a.rank - b.rank; // lägast rank först
      case 'points':
        return b.points - a.points; // högst poäng först
      case 'username':
        return a.username.localeCompare(b.username); // Alphabetisk ordning
      default:
        return 0;
    }
  });

  return (
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th
              onClick={() => onSortChange('rank')}
              className={`sortable-header ${sortBy === 'rank' ? 'active' : ''}`}
            >
              Rank
            </th>
            <th
              onClick={() => onSortChange('username')}
              className={`sortable-header ${sortBy === 'username' ? 'active' : ''}`}
            >
              User
            </th>
            <th
              onClick={() => onSortChange('points')}
              className={`sortable-header ${sortBy === 'points' ? 'active' : ''}`}
            >
              Points
            </th>
            <th>Reports Submitted</th>
            <th>Reports Resolved</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry) => (
            <tr key={entry.id}>
              <td className="rank-cell">
                {entry.rank === 1 && '🥇'}
                {entry.rank === 2 && '🥈'}
                {entry.rank === 3 && '🥉'}
                {entry.rank > 3 && <span className="rank-number">#{entry.rank}</span>}
              </td>
              <td className="username-cell">{entry.username}</td>
              <td className="points-cell">
                <strong>{entry.points}</strong>
              </td>
              <td className="count-cell">{entry.reportsSubmitted}</td>
              <td className="count-cell">{entry.reportsResolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}