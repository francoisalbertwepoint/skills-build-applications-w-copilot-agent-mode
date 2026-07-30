import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiBaseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : '/api';
        const response = await fetch(`${apiBaseUrl}/activities/`);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 fw-bold mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item">
            <strong>{activity.title}</strong> <span className="text-muted">({activity.type})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
