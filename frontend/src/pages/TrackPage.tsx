import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import type { Report } from '../types';

export default function TrackPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function refresh() {
    setLoading(true);
    api
      .getMyReports()
      .then(setReports)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function toggleUpvote(id: string) {
    try {
      const updated = await api.upvote(id);
      setReports((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upvote failed');
    }
  }

  return (
    <div>
      <h1 className="page-title">My reports</h1>
      <p className="page-subtitle">
        Track the status of issues you reported, {user?.name?.split(' ')[0]}.
      </p>

      {error && <div className="form-error">{error}</div>}
      {loading ? (
        <div className="loading">Loading your reports…</div>
      ) : reports.length === 0 ? (
        <div className="empty-state">
          You haven't reported anything yet.{' '}
          <Link to="/report">Report your first issue →</Link>
        </div>
      ) : (
        <div className="report-list">
          {reports.map((r) => (
            <article key={r.id} className="report-item">
              <h3 className="report-item-title">
                {r.title}
                <span className={`badge badge-${r.status.toLowerCase()}`}>
                  {r.status.replace('_', ' ')}
                </span>
              </h3>
              <p className="report-item-meta">
                {r.category} · reported {new Date(r.createdAt).toLocaleDateString()}
              </p>
              <p>{r.description}</p>
              {r.photoUrl && (
                <img className="report-photo" src={r.photoUrl} alt={r.title} />
              )}
              {r.authorityNote && (
                <p className="form-hint">📋 Authority note: {r.authorityNote}</p>
              )}
              <div className="status-select-row">
                <button className="upvote-btn" onClick={() => toggleUpvote(r.id)}>
                  👍 {r.upvoteCount} upvote{r.upvoteCount === 1 ? '' : 's'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
