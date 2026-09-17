import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Layers } from 'lucide-react';

interface WorldMapViewProps {
  reports: any[];
  onSelectCoordinates?: (lat: number, lng: number) => void;
  onOpenReportModal?: () => void;
}

const createCustomIcon = (category: string) => {
  let emoji = '⚠️';
  let bgColor = '#ef4444';

  if (category === 'FIRE') { emoji = '🔥'; bgColor = '#dc2626'; }
  else if (category === 'FLOOD') { emoji = '🌊'; bgColor = '#0284c7'; }
  else if (category === 'DUMPING') { emoji = '🗑️'; bgColor = '#8b5cf6'; }
  else if (category === 'POLLUTION') { emoji = '💨'; bgColor = '#ec4899'; }
  else if (category === 'ECO') { emoji = '🌳'; bgColor = '#16a34a'; }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${bgColor};
        color: white;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
};

function ClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e: any) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const WorldMapView: React.FC<WorldMapViewProps> = ({ reports, onSelectCoordinates, onOpenReportModal }) => {
  const [tileProvider, setTileProvider] = useState<'osm' | 'esri' | 'satellite'>('osm');
  const [clickedPos, setClickedPos] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setClickedPos({ lat, lng });
    if (onSelectCoordinates) onSelectCoordinates(lat, lng);
  };

  const getTileUrl = () => {
    if (tileProvider === 'esri')
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    if (tileProvider === 'satellite')
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Header controls bar */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}> {/* ✅ FIXED: column layout */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} className="text-emerald-600" />
            <span>Global Environmental & Fire Hazard World Map</span>
          </h3>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Live geospatial open-source tracking (Free OpenStreetMap & Esri layer - No API Key Needed)
          </div>
        </div>

        {/* ✅ FIXED: Tile buttons wrap on mobile */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Layers size={14} />
            <span>Tiles:</span>
          </div>
          {(['osm', 'esri', 'satellite'] as const).map((provider) => (
            <button
              key={provider}
              className={`btn-outline ${tileProvider === provider ? 'btn-sustaira' : ''}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
              onClick={() => setTileProvider(provider)}
            >
              {{ osm: 'OpenStreetMap Standard', esri: 'Esri World Topo', satellite: 'Esri Satellite' }[provider]}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ FIXED: Map height is responsive — tall on desktop, shorter on mobile */}
      <div
        className="card"
        style={{
          padding: 0,
          overflow: 'hidden',
          height: 'clamp(320px, 55vh, 600px)', // ✅ min 320px, preferred 55% viewport height, max 600px
          position: 'relative',
        }}
      >
        <MapContainer
          center={[20.0, 10.0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={getTileUrl()}
          />
          <ClickHandler onMapClick={handleMapClick} />

          {reports
            .filter((r: any) => r.lat !== undefined && r.lng !== undefined)
            .map((report: any) => (
              <Marker
                key={report.id}
                position={[report.lat, report.lng]}
                icon={createCustomIcon(report.category)}
              >
                <Popup>
                  <div style={{ minWidth: 180, padding: 4 }}> {/* ✅ FIXED: reduced minWidth for mobile */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span className={`badge-urgency badge-${report.urgency.toLowerCase()}`}>
                        {report.urgency}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{report.category}</span>
                    </div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '4px 0', color: '#0f172a' }}>
                      {report.title}
                    </h4>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 4 }}>
                      📍 {report.location}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#16a34a', marginBottom: 8 }}>
                      🌱 Offset / Impact: {report.impactMetric}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#475569' }}>
                      Reported by: <strong>{report.reporter}</strong>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        {/* ✅ FIXED: Coordinate overlay — responsive, won't overflow */}
        {clickedPos && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 8,
              right: 8,           // ✅ FIXED: stretches to right edge instead of overflowing
              zIndex: 1000,
              background: '#ffffff',
              padding: '0.6rem 0.8rem',
              borderRadius: 8,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              fontSize: '0.78rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexWrap: 'wrap',    // ✅ FIXED: wraps on tiny screens
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: '#15655b' }}>Picked: </span>
              <span>{clickedPos.lat.toFixed(4)}, {clickedPos.lng.toFixed(4)}</span>
            </div>
            {onOpenReportModal && (
              <button
                className="btn-sustaira"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: '#dc2626' }}
                onClick={onOpenReportModal}
              >
                + Report Hazard Here
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};