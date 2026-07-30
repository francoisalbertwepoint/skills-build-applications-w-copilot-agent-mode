import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
              <h1 className="h3 fw-bold">Multi-tier fitness dashboard</h1>
              <p className="text-muted mt-3">
                Configure VITE_CODESPACE_NAME in .env.local to use the Codespaces API URL. Without it, the app uses localhost:8000.
              </p>
              <nav className="d-grid gap-2 mt-4">
                <NavLink className="btn btn-outline-primary" to="/users">Users</NavLink>
                <NavLink className="btn btn-outline-primary" to="/teams">Teams</NavLink>
                <NavLink className="btn btn-outline-primary" to="/activities">Activities</NavLink>
                <NavLink className="btn btn-outline-primary" to="/leaderboard">Leaderboard</NavLink>
                <NavLink className="btn btn-outline-primary" to="/workouts">Workouts</NavLink>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
