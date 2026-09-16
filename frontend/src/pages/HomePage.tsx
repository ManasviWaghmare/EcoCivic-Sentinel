import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { REPORT_STATUSES, type Report, type ReportStatus } from '../types';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FILTERS: Array<ReportStatus | 'ALL'> = ['ALL', ...REPORT_STATUSES];

export default function HomePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    api
      .getReports({ status: filter })
      .then(setReports)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [filter]);

  const selected = reports.find((r) => r.id === selectedId);

  return (
    <div>
      <h1 className="page-title">Community issue map</h1>
      <p className="page-subtitle">
        See what neighbours have reported near you.{' '}
        {isAuthenticated ? (
          <Link to="/report">Report an issue →</Link>
        ) : (
          <Link to="/login">Log in to report an issue →</Link>
        )}
      </p>

      <div className="chips">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'ALL' ? 'All' : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="grid-2">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={12}
          className="map-container tall"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reports.map((r) => (
            <Marker
              key={r.id}
              position={[r.latitude, r.longitude]}
              eventHandlers={{ click: () => setSelectedId(r.id) }}
            >
              <Popup>
                <strong>{r.title}</strong>
                <br />
                <span className={`badge badge-${r.status.toLowerCase()}`}>
                  {r.status.replace('_', ' ')}
                </span>
                <br />
                👍 {r.upvoteCount}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div>
          {loading ? (
            <div className="loading">Loading reports…</div>
          ) : reports.length === 0 ? (
            <div className="empty-state">
              No reports found{filter !== 'ALL' ? ' for this filter' : ''} yet.
            </div>
          ) : (
            <div className="report-list">
              {reports.map((r) => (
                <article
                  key={r.id}
                  className={`report-item ${selectedId === r.id ? 'selected' : ''}`}
                  onClick={() => setSelectedId(r.id)}
                >
                  <h3 className="report-item-title">
                    {r.title}
                    <span className={`badge badge-${r.status.toLowerCase()}`}>
                      {r.status.replace('_', ' ')}
                    </span>
                  </h3>
                  <p className="report-item-meta">
                    {r.category} · 👍 {r.upvoteCount} ·{' '}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  {selectedId === r.id && (
                    <>
                      <p>{r.description}</p>
                      {r.photoUrl && (
                        <img className="report-photo" src={r.photoUrl} alt={r.title} />
                      )}
                      {r.authorityNote && (
                        <p className="form-hint">📋 {r.authorityNote}</p>
                      )}
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
          {selected && null}
        </div>
      </div>
    </div>
  );
}
