import './App.css'
import LeaderboardPage from './pages/LeaderboardPage';
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NavBar } from './components/NavBar'
import { ReportsPage } from './pages/Reports'
import UserProfile from './pages/UserProfile'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<UserProfile />} />
<<<<<<< HEAD
        <Route path="/login" element={<LoginPage />} />
=======
        <Route path="/leaderboard" element={<LeaderboardPage />} />
>>>>>>> df3dad959fa194ddc2d23ccd23069fadab7e4c75
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App