import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { api } from '../api/client';
import { REPORT_CATEGORIES } from '../types';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER: [number, number] = [12.9716, 77.5946];

function LocationPicker({
  position,
  onPick,
}: {
  position: [number, number] | null;
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function ReportPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(REPORT_CATEGORIES[0]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function useGps() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => setError('Could not get your location. Click the map instead.')
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!position) {
      setError('Please pick a location on the map or use your GPS.');
      return;
    }
    setBusy(true);
    try {
      await api.createReport({
        title,
        description,
        category,
        photoUrl: photoUrl.trim() || undefined,
        latitude: position[0],
        longitude: position[1],
      });
      navigate('/track');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">Report an issue</h1>
      <p className="page-subtitle">
        Click the map or use your GPS to mark the exact location.
      </p>

      {error && <div className="form-error">{error}</div>}

      <div className="grid-2">
        <MapContainer center={DEFAULT_CENTER} zoom={13} className="map-container tall">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker position={position} onPick={(lat, lng) => setPosition([lat, lng])} />
        </MapContainer>

        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                required
                maxLength={140}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Large pothole on Main Street"
              />
            </div>
            <div className="form-row">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {REPORT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue, how long it's been there, and any safety concerns…"
              />
            </div>
            <div className="form-row">
              <label htmlFor="photoUrl">Photo URL (optional)</label>
              <input
                id="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              {/* Cloudinary example:
              <button type="button" onClick={uploadToCloudinary}>Upload photo</button> */}
            </div>

            <div className="status-select-row">
              <button type="button" className="btn btn-ghost" onClick={useGps}>
                📍 Use my location
              </button>
              {position && (
                <span className="report-item-meta">
                  Pinned: {position[0].toFixed(5)}, {position[1].toFixed(5)}
                </span>
              )}
            </div>

            <button className="btn btn-primary" disabled={busy}>
              {busy ? 'Submitting…' : 'Submit report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
