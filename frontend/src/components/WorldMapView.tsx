import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Layers } from 'lucide-react';

interface MapReportItem {
  id: string;
  title: string;
  category: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  location: string;
  reporter: string;
  impactMetric: string;
  status: string;
  lat: number;
  lng: number;
}

interface WorldMapViewProps {
  reports: any[];
  onSelectCoordinates?: (lat: number, lng: number) => void;
  onOpenReportModal?: () => void;
}

// Sample World & City Geolocation Data Points
const sampleWorldReports: MapReportItem[] = [
  {
    id: 'm1',
    title: 'Active Wildfire Outbreak Warning',
    category: 'FIRE',
    urgency: 'CRITICAL',
    location: 'Pine Ridge Forest (34.0522, -118.2437)',
    reporter: 'Bill Doody',
    impactMetric: '104.58 kg CO₂',
    status: 'IN_PROGRESS',
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 'm2',
    title: 'Urban Storm Drain & River Overflow',
    category: 'FLOOD',
    urgency: 'HIGH',
    location: 'Coastal District (51.5074, -0.1278)',
    reporter: 'Bill Doody',
    impactMetric: '809.69 kg CO₂',
    status: 'IN_REVIEW',
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 'm3',
    title: 'Illegal Chemical Waste Dumping',
    category: 'DUMPING',
    urgency: 'HIGH',
    location: 'Frankfurt Industrial Zone (50.1109, 8.6821)',
    reporter: 'Vincent de la Mar',
    impactMetric: '1028.83 kg CO₂',
    status: 'SUBMITTED',
    lat: 50.1109,
    lng: 8.6821,
  },
  {
    id: 'm4',
    title: 'Community Mangrove Planting & Flood Barrier',
    category: 'ECO',
    urgency: 'LOW',
    location: 'Singapore East Coast (1.3521, 103.8198)',
    reporter: 'Luke Bashford',
    impactMetric: '3147.4 kg CO₂',
    status: 'RESOLVED',
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: 'm5',
    title: 'Industrial Smog & Air Quality Spike',
    category: 'POLLUTION',
    urgency: 'HIGH',
    location: 'Tokyo Bay Industrial (35.6762, 139.6503)',
    reporter: 'Maggie Burnham',
    impactMetric: '2895.18 kg CO₂',
    status: 'IN_PROGRESS',
    lat: 35.6762,
    lng: 139.6503,
  },
];

// Helper to create Leaflet Custom DivIcons with emojis
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

export const WorldMapView: React.FC<WorldMapViewProps> = ({ onSelectCoordinates, onOpenReportModal }) => {
  const [tileProvider, setTileProvider] = useState<'osm' | 'esri' | 'satellite'>('osm');
  const [clickedPos, setClickedPos] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setClickedPos({ lat, lng });
    if (onSelectCoordinates) {
      onSelectCoordinates(lat, lng);
    }
  };

  const getTileUrl = () => {
    if (tileProvider === 'esri') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    }
    if (tileProvider === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header controls bar */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} className="text-emerald-600" />
            <span>Global Environmental & Fire Hazard World Map</span>
          </h3>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Live geospatial open-source tracking (Free OpenStreetMap & Esri layer - No API Key Needed)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Layers size={14} />
            <span>Tiles:</span>
          </div>
          <button
            className={`btn-outline ${tileProvider === 'osm' ? 'btn-sustaira' : ''}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
            onClick={() => setTileProvider('osm')}
          >
            OpenStreetMap Standard
          </button>
          <button
            className={`btn-outline ${tileProvider === 'esri' ? 'btn-sustaira' : ''}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
            onClick={() => setTileProvider('esri')}
          >
            Esri World Topo
          </button>
          <button
            className={`btn-outline ${tileProvider === 'satellite' ? 'btn-sustaira' : ''}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}
            onClick={() => setTileProvider('satellite')}
          >
            Esri Satellite
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', height: '600px', position: 'relative' }}>
        <MapContainer center={[20.0, 10.0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={getTileUrl()}
          />

          <ClickHandler onMapClick={handleMapClick} />

          {sampleWorldReports.map((report) => (
            <Marker
              key={report.id}
              position={[report.lat, report.lng]}
              icon={createCustomIcon(report.category)}
            >
              <Popup>
                <div style={{ minWidth: 200, padding: 4 }}>
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

        {/* Selected Coordinates Overlay Notice */}
        {clickedPos && (
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              zIndex: 1000,
              background: '#ffffff',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              fontSize: '0.8rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, color: '#15655b' }}>Picked Coordinates: </span>
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
