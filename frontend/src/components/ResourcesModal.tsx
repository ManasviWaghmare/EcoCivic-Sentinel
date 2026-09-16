import React from 'react';
import { X, ExternalLink, Code2, Layers, MapPin, ShieldCheck, Database, FileText } from 'lucide-react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const resourcesList = [
  {
    name: 'OpenStreetMap & CartoDB Voyager',
    category: 'Geospatial Map Tile Provider',
    description: 'Provides vector and raster map tiles for the interactive global hazard map.',
    url: 'https://www.openstreetmap.org',
    icon: MapPin,
    badge: 'Map Tiles',
  },
  {
    name: 'Leaflet JS & React-Leaflet',
    category: 'Mapping Engine & React Wrappers',
    description: 'Mobile-friendly interactive map library used to render live markers, popups, and click handlers.',
    url: 'https://leafletjs.com',
    icon: Layers,
    badge: 'Mapping Engine',
  },
  {
    name: 'Recharts Library',
    category: 'Data Analytics & Charts',
    description: 'Composable charting library for React rendering EcoCivic Sentinel Score stacked bars and timeline curves.',
    url: 'https://recharts.org',
    icon: Code2,
    badge: 'Visualization',
  },
  {
    name: 'Lucide Icons Set',
    category: 'SVG UI Icon Library',
    description: 'Clean and consistent icon pack used across navigation, badges, and alerts.',
    url: 'https://lucide.dev',
    icon: ShieldCheck,
    badge: 'Icons Pack',
  },
  {
    name: 'Google Fonts (Outfit & Inter)',
    category: 'Typography Design System',
    description: 'Modern sans-serif typefaces for rich dashboard hierarchy and readability.',
    url: 'https://fonts.google.com',
    icon: FileText,
    badge: 'Typography',
  },
  {
    name: 'MongoDB GeoJSON 2dsphere Spec',
    category: 'Backend Database & Spatial Indexing',
    description: 'Supports $near queries and spatial indexing for distance-based hazard search (`/api/reports/nearby`).',
    url: 'https://www.mongodb.com/docs/manual/geospatial-queries/',
    icon: Database,
    badge: 'Database Spec',
  },
  {
    name: 'JSON Web Token (JWT RFC 7519)',
    category: 'Stateless Security Standard',
    description: 'Stateless authentication standard used for role-based access control (CITIZEN & AUTHORITY).',
    url: 'https://jwt.io',
    icon: ShieldCheck,
    badge: 'Security Spec',
  },
];

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Project Resource & Documentation Links
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Libraries, open-source tile providers, frameworks, and specs used in EcoCivic Sentinel
            </div>
          </div>
          <button className="btn-outline" style={{ padding: '0.2rem 0.5rem' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '65vh', overflowY: 'auto' }}>
          {resourcesList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 10,
                  padding: '0.9rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      background: '#eff6ff',
                      color: '#15655b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {item.name}
                      </span>
                      <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.65rem' }}>
                        {item.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {item.description}
                    </div>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  <span>Visit Link</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
