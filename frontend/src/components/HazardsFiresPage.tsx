import React, { useState } from 'react';
import { Search, MapPin, Flame, Waves, Trash2, Wind, PlusCircle } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  category: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  location: string;
  reporter: string;
  impactMetric: string;
  costOrImpact: string;
  status: string;
  date: string;
}

interface HazardsFiresPageProps {
  reports: ReportItem[];
  onOpenReportModal: () => void;
}

export const HazardsFiresPage: React.FC<HazardsFiresPageProps> = ({
  reports,
  onOpenReportModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || r.category.toUpperCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const criticalCount = reports.filter((r) => r.urgency === 'CRITICAL').length;
  const highCount = reports.filter((r) => r.urgency === 'HIGH').length;
  const fireCount = reports.filter((r) => r.category.toUpperCase() === 'FIRE').length;
  const floodCount = reports.filter((r) => r.category.toUpperCase() === 'FLOOD').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Hazards & Fires</h1>
          <p className="page-subtitle">Live tracking of environmental hazards, fires, and emergency submissions.</p>
        </div>
        <button className="btn-sustaira" style={{ background: '#dc2626' }} onClick={onOpenReportModal}>
          <PlusCircle size={15} />
          Report Hazard / Fire
        </button>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="dash-card" style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#fee2e2', color: '#991b1b', borderRadius: 10, padding: '0.6rem' }}>
            <Flame size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{fireCount}</div>
            <div className="dash-card-subtitle">Active fire reports</div>
          </div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#dbeafe', color: '#1d4ed8', borderRadius: 10, padding: '0.6rem' }}>
            <Waves size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{floodCount}</div>
            <div className="dash-card-subtitle">Flood incidents</div>
          </div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#fee2e2', color: '#991b1b', borderRadius: 10, padding: '0.6rem' }}>
            <Wind size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{criticalCount}</div>
            <div className="dash-card-subtitle">Critical urgency</div>
          </div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 3', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#ffedd5', color: '#9a3412', borderRadius: 10, padding: '0.6rem' }}>
            <Trash2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{highCount}</div>
            <div className="dash-card-subtitle">High urgency</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card" style={{ gridColumn: 'span 12' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Environmental & Emergency Incident Log</div>
              <div className="dash-card-subtitle">Search, filter, and track citizen hazard submissions</div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search reporter or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '0.45rem 0.6rem 0.45rem 2rem',
                    borderRadius: 8,
                    border: '1px solid var(--border-card)',
                    fontSize: '0.8rem',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                  }}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.45rem 0.6rem',
                  borderRadius: 8,
                  border: '1px solid var(--border-card)',
                  fontSize: '0.8rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                }}
              >
                <option value="ALL">All Categories</option>
                <option value="FIRE">Fires & Wildfires</option>
                <option value="FLOOD">Flooding</option>
                <option value="DUMPING">Illegal Dumping</option>
                <option value="POLLUTION">Water / Air Pollution</option>
                <option value="ECO">Tree / Eco Project</option>
              </select>
            </div>
          </div>

          <div className="custom-table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Reporter</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Urgency</th>
                  <th>Impact / Offset</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                      No reports found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.reporter}</td>
                      <td>
                        <span className="badge" style={{ background: '#f1f5f9', color: '#334155' }}>
                          {item.category}
                        </span>
                      </td>
                      <td>{item.title}</td>
                      <td>
                        <div className="flex items-center gap-1 text-slate-500">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge-urgency badge-${item.urgency.toLowerCase()}`}>
                          {item.urgency}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: '#16a34a' }}>{item.impactMetric}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background:
                              item.status === 'RESOLVED'
                                ? '#dcfce7'
                                : item.status === 'IN_PROGRESS'
                                ? '#dbeafe'
                                : '#fef3c7',
                            color:
                              item.status === 'RESOLVED'
                                ? '#166534'
                                : item.status === 'IN_PROGRESS'
                                ? '#1d4ed8'
                                : '#92400e',
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
