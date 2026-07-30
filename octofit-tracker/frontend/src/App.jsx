import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">Track workouts, teams, and progress in one place.</h1>
          <p className="lead text-muted mb-4">
            A modern multi-tier fitness application with a React frontend, an Express API, and MongoDB-backed data services.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
              Explore Vite
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://expressjs.com/" target="_blank" rel="noreferrer">
              View API Stack
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-bold mb-3">What’s included</h2>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">✅ React 19 + Vite presentation tier</li>
                <li className="mb-2">✅ Express + TypeScript logic tier</li>
                <li className="mb-2">✅ Mongoose-ready MongoDB data access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
