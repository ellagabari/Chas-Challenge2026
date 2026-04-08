import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ReportList } from './components/ReportList';

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Project: LiiterHero</h1>
          <p>Connecting Frontend to Backend with TanStack Query</p>
        </div>
      </section>

      {/* 2. This is where the magic happens! */}
      <section style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ReportList />
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Project Stats</h2>
          <p>Your database connection is live.</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App