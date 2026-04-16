
import './App.css'
import { ReportList } from './components/ReportList';
import LeaderboardPage from './pages/LeaderboardPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </BrowserRouter>

      <section style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ReportList />
      </section>
    </div>
  )
}

export default App