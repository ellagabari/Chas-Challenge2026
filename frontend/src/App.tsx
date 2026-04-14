
import './App.css'
import { ReportList } from './components/ReportList';
import LeaderboardPage from './pages/LeaderboardPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    
      <BrowserRouter>
      <Routes>
        <Route path="/leaderboard" element={<LeaderboardPage />} />

      </Routes>
    </BrowserRouter>

      <section style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ReportList />
      </section>

    </>
  )
}

export default App