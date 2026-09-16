import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { REPORT_STATUSES, type Report, type ReportStatus } from '../types';

export default function AuthorityPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<ReportStatus>('IN_REVIEW');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getReports({ status: filter })
      .then(setReports)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [filter]);

  const selected = reports.find((r) => r.id === selectedId) ?? null;

  function openReport(r: Report) {
    setSelectedId(r.id);
    setNewStatus(r.status);
    setNote(r.authorityNote ?? '');
  }

  async function saveStatus() {
    if (!selected) return;
    setSaving(true);
    setError('');
    try {
      const updated = await api.updateStatus(selected.id, newStatus, note);
      setReports((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setSelectedId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">Authority dashboard</h1>
      <p className="page-subtitle">
        Review incoming reports, update their status, and add resolution notes.
      </p>

      {error && <div className="form-error">{error}</div>}

      <div className="chips">
        {(['ALL', ...REPORT_STATUSES] as Array<ReportStatus | 'ALL'>).map((f) => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'ALL' ? 'All' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid-2">
        <div className="report-list">
          {loading ? (
            <div className="loading">Loading reports…</div>
          ) : reports.length === 0 ? (
            <div className="empty-state">No reports in this view.</div>
          ) : (
            reports.map((r) => (
              <article
                key={r.id}
                className={`report-item ${selectedId === r.id ? 'selected' : ''}`}
                onClick={() => openReport(r)}
              >
                <h3 className="report-item-title">
                  {r.title}
                  <span className={`badge badge-${r.status.toLowerCase()}`}>
                    {r.status.replace('_', ' ')}
                  </span>
                </h3>
                <p className="report-item-meta">
                  {r.category} · 👍 {r.upvoteCount} ·{' '}
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </article>
            ))
          )}
        </div>

        <div className="card">
          {!selected ? (
            <div className="empty-state">
              Select a report on the left to review it.
            </div>
          ) : (
            <div className="form">
              <h3 style={{ margin: 0 }}>{selected.title}</h3>
              <p className="report-item-meta">
                {selected.category} · {selected.latitude.toFixed(5)},{' '}
                {selected.longitude.toFixed(5)}
              </p>
              <p>{selected.description}</p>
              {selected.photoUrl && (
                <img
                  className="report-photo"
                  src={selected.photoUrl}
                  alt={selected.title}
                />
              )}

              <div className="form-row">
                <label htmlFor="status">New status</label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ReportStatus)}
                >
                  {REPORT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="note">Note to citizen (optional)</label>
                <textarea
                  id="note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Crew assigned, expected fix by Friday…"
                />
              </div>

              <div className="status-select-row">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={saveStatus}
                >
                  {saving ? 'Saving…' : 'Update status'}
                </button>
                <button className="btn btn-ghost" onClick={() => setSelectedId(null)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
