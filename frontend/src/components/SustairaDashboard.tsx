import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import {
  Trees,
  Cloud,
  Calendar,
  Search,
  ShieldCheck,
  Zap,
  MapPin
} from 'lucide-react';

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

interface SustairaDashboardProps {
  reports: ReportItem[];
  onOpenReportModal: () => void;
  activeTab?: string;
}

const scoreData = [
  { month: 'Jan', Engagement: 35, Tracking: 45, Actions: 20 },
  { month: 'Feb', Engagement: 40, Tracking: 50, Actions: 25 },
  { month: 'Mar', Engagement: 45, Tracking: 55, Actions: 28 },
  { month: 'Apr', Engagement: 48, Tracking: 60, Actions: 30 },
  { month: 'May', Engagement: 52, Tracking: 64, Actions: 34 },
  { month: 'Jun', Engagement: 56, Tracking: 68, Actions: 38 },
  { month: 'Jul', Engagement: 60, Tracking: 72, Actions: 42 },
  { month: 'Aug', Engagement: 65, Tracking: 78, Actions: 46 },
  { month: 'Sept', Engagement: 70, Tracking: 82, Actions: 50 },
];

const timelineData = [
  { date: 'Jan 2026', SysAdmin: 1200, User: 800, Admin: 400, Maggie: 900 },
  { date: 'Mar 2026', SysAdmin: 1800, User: 1300, Admin: 750, Maggie: 1500 },
  { date: 'May 2026', SysAdmin: 2600, User: 1900, Admin: 1200, Maggie: 2200 },
  { date: 'Jul 2026', SysAdmin: 3500, User: 2700, Admin: 1800, Maggie: 3200 },
  { date: 'Aug 2026', SysAdmin: 4600, User: 3500, Admin: 2400, Maggie: 4100 },
  { date: 'Sept 2026', SysAdmin: 5800, User: 4200, Admin: 2900, Maggie: 4895 },
];

const raceData = [
  { name: 'Ward 1 (East)', value: 37.0, color: '#8b5cf6' },
  { name: 'Ward 2 (North)', value: 31.8, color: '#ec4899' },
  { name: 'Ward 3 (Central)', value: 18.2, color: '#eab308' },
  { name: 'Ward 4 (West)', value: 13.0, color: '#3b82f6' },
];

// ✅ Responsive grid span helper
// Returns inline gridColumn style based on window width
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

const useIsTablet = () => {
  const [isTablet, setIsTablet] = React.useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  React.useEffect(() => {
    const handler = () =>
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isTablet;
};

// ✅ Returns gridColumn span string based on breakpoint
// mobile: always full width (span 12)
// tablet: half width (span 6)
// desktop: whatever was originally set
function span(mobile: number, tablet: number, desktop: number, isMobile: boolean, isTablet: boolean) {
  const cols = isMobile ? mobile : isTablet ? tablet : desktop;
  return { gridColumn: `span ${cols}` };
}

export const SustairaDashboard: React.FC<SustairaDashboardProps> = ({
  reports,
  activeTab = 'launchpad',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || r.category.toUpperCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const showAnalytics = activeTab !== 'reports';
  const showHazards = activeTab === 'reports';

  return (
    <div className="dashboard-grid">
      {showAnalytics && (
        <>
          {/* 1. EcoCivic Impact Score — full width on mobile/tablet, 4 cols on desktop */}
          <div className="dash-card" style={span(12, 12, 4, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div>
                <div className="dash-card-title">EcoCivic Impact Score</div>
                <div className="dash-card-subtitle">Monthly engagement & eco-actions</div>
              </div>
              <Zap size={18} className="text-amber-500" />
            </div>
            <div style={{ height: 210, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="Engagement" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Tracking" stackId="a" fill="#10b981" />
                  <Bar dataKey="Actions" stackId="a" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Tree Counter — full on mobile, half on tablet, 3 cols on desktop */}
          <div className="dash-card tree-counter-card" style={span(12, 6, 3, isMobile, isTablet)}>
            <div className="tree-canopy-visual">
              <Trees size={32} className="tree-icon-anim" style={{ color: '#166534' }} />
              <Trees size={48} className="tree-icon-anim" style={{ color: '#22c55e', animationDelay: '0.4s' }} />
              <Trees size={36} className="tree-icon-anim" style={{ color: '#15803d', animationDelay: '0.8s' }} />
            </div>
            <div className="tree-counter-number">2,031</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d', marginTop: 4 }}>
              Trees Planted & Tons CO₂ Offset
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Community Eco Goal 2026</div>
          </div>

          {/* 3. Carbon Offsets Timeline — full on mobile, half on tablet, 5 cols on desktop */}
          <div className="dash-card" style={span(12, 6, 5, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div>
                <div className="dash-card-title">Carbon Offsets & Emergency Frequency</div>
                <div className="dash-card-subtitle">Cumulative offsets by active citizens</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                <Calendar size={14} />
                <span>Date Range</span>
              </div>
            </div>
            <div style={{ height: 210, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Maggie" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="SysAdmin" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. DEI & City Equity Score — full on mobile, half on tablet, 4 cols on desktop */}
          <div className="dash-card" style={span(12, 6, 4, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div className="dash-card-title">City DEI & Equity Score</div>
              <ShieldCheck size={18} className="text-emerald-500" />
            </div>
            {/* ✅ Stack SVG and legend vertically on mobile */}
            <div className="dei-radial-container" style={isMobile ? { flexDirection: 'column', alignItems: 'center' } : {}}>
              <svg width="150" height="150" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#f3e8ff" strokeWidth="10" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="#a855f7" strokeWidth="10"
                  strokeDasharray="440" strokeDashoffset="44" strokeLinecap="round" />
                <circle cx="80" cy="80" r="54" fill="none" stroke="#fee2e2" strokeWidth="10" />
                <circle cx="80" cy="80" r="54" fill="none" stroke="#ef4444" strokeWidth="10"
                  strokeDasharray="340" strokeDashoffset="44" strokeLinecap="round" />
                <circle cx="80" cy="80" r="38" fill="none" stroke="#e0f2fe" strokeWidth="10" />
                <circle cx="80" cy="80" r="38" fill="none" stroke="#0284c7" strokeWidth="10"
                  strokeDasharray="240" strokeDashoffset="52" strokeLinecap="round" />
                <circle cx="80" cy="80" r="22" fill="none" stroke="#fef3c7" strokeWidth="10" />
                <circle cx="80" cy="80" r="22" fill="none" stroke="#eab308" strokeWidth="10"
                  strokeDasharray="138" strokeDashoffset="53" strokeLinecap="round" />
              </svg>
              <div className="dei-legend-list">
                <div className="dei-legend-item">
                  <span className="dei-dot" style={{ background: '#0284c7' }}></span>
                  <span>Gender Equity: 78%</span>
                </div>
                <div className="dei-legend-item">
                  <span className="dei-dot" style={{ background: '#ef4444' }}></span>
                  <span>Race Equity: 87%</span>
                </div>
                <div className="dei-legend-item">
                  <span className="dei-dot" style={{ background: '#eab308' }}></span>
                  <span>Resource Access: 61%</span>
                </div>
                <div className="dei-legend-item">
                  <span className="dei-dot" style={{ background: '#a855f7' }}></span>
                  <span>Inclusion Index: 90%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Ward Participation — full on mobile, half on tablet, 3 cols on desktop */}
          <div className="dash-card" style={span(12, 6, 3, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div className="dash-card-title">Ward Participation</div>
            </div>
            <div className="headcount-stack">
              <div className="hc-pill-bar hc-male">
                <span>Male Headcount</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>46</span>
              </div>
              <div className="hc-pill-bar hc-female">
                <span>Female Headcount</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>54</span>
              </div>
              <div className="hc-pill-bar hc-other">
                <span>Other Headcount</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>0</span>
              </div>
            </div>
          </div>

          {/* 6. Demographics Donut — full on mobile, half on tablet, 2 cols on desktop */}
          {/* ✅ "Demogi" was being cut off because span 2 out of 12 = tiny on mobile */}
          <div className="dash-card" style={span(12, 6, 2, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div className="dash-card-title">Demographics</div>
            </div>
            <div style={{ height: 160, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={raceData} innerRadius={35} outerRadius={65} paddingAngle={4} dataKey="value">
                    {raceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7. Carbon Offset Target — full on mobile, half on tablet, 3 cols on desktop */}
          <div className="dash-card cloud-meter-card" style={span(12, 6, 3, isMobile, isTablet)}>
            <div className="dash-card-title">Carbon Offset Target</div>
            <div className="cloud-visual-box">
              <Cloud className="cloud-svg-icon" />
              <div className="cloud-overlay-text">
                40 <span style={{ fontSize: '0.8rem' }}>MTCO₂e</span>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Current City Target Milestone</div>
          </div>
        </>
      )}

      {showHazards && (
        <>
          {/* 8. KPI Projects — full width on mobile, half on tablet, 6 cols on desktop */}
          <div className="dash-card" style={span(12, 12, 6, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div>
                <div className="dash-card-title">Sustainability & Fire Readiness KPIs</div>
                <div className="dash-card-subtitle">Active community goals and milestone progress</div>
              </div>
            </div>
            <div className="kpi-projects-list">
              <div className="kpi-project-item">
                <div className="kpi-title-row">
                  <span>Reduce dependence on non-renewable energy sources</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>84%</span>
                </div>
                <div className="kpi-subtext">Choose a provider generating majority from renewable sources</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '84%' }}>84%</div>
                </div>
              </div>
              <div className="kpi-project-item">
                <div className="kpi-title-row">
                  <span>Reduce GHG emissions by 100 MTCO₂e in 2026</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>40%</span>
                </div>
                <div className="kpi-subtext">Curb urban congestion and encourage electric transit</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '40%' }}>40%</div>
                </div>
              </div>
              <div className="kpi-project-item">
                <div className="kpi-title-row">
                  <span>Community Fire Hydrant Readiness & Flood Defense</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>59%</span>
                </div>
                <div className="kpi-subtext">Inspect hydrants and plant flood barrier mangroves in Ward 2</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '59%' }}>59%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Action Items Table — full width on mobile, half on tablet, 6 cols on desktop */}
          <div className="dash-card" style={span(12, 12, 6, isMobile, isTablet)}>
            <div className="dash-card-header">
              <div>
                <div className="dash-card-title">Action Items & Preparedness Pledges</div>
                <div className="dash-card-subtitle">Volunteer pledges and due dates</div>
              </div>
            </div>
            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Action Item</th>
                    <th>Due Date</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Discuss renewable installation plans with stakeholders</td>
                    <td>11/29/2026</td>
                    <td><div className="progress-track" style={{ height: 8 }}><div className="progress-fill" style={{ width: '40%' }}></div></div></td>
                  </tr>
                  <tr>
                    <td>Finalize solar rooftop agreements</td>
                    <td>12/30/2026</td>
                    <td><div className="progress-track" style={{ height: 8 }}><div className="progress-fill" style={{ width: '25%' }}></div></div></td>
                  </tr>
                  <tr>
                    <td>Install community fire alarm sirens in Ward 1</td>
                    <td>12/14/2026</td>
                    <td><div className="progress-track" style={{ height: 8 }}><div className="progress-fill" style={{ width: '65%' }}></div></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 10. Incident Log — always full width */}
          <div className="dash-card" style={{ gridColumn: 'span 12' }}>
            <div className="dash-card-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div className="dash-card-title">Environmental & Emergency Incident Log</div>
                <div className="dash-card-subtitle">Search, filter, and track citizen hazard submissions</div>
              </div>
              {/* ✅ Search + filter wrap on mobile */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
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
                      width: isMobile ? '100%' : 'auto', // ✅ full width on mobile
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
                    width: isMobile ? '100%' : 'auto', // ✅ full width on mobile
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b' }}>
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
                                item.status === 'RESOLVED' ? '#dcfce7'
                                : item.status === 'IN_PROGRESS' ? '#dbeafe'
                                : '#fef3c7',
                              color:
                                item.status === 'RESOLVED' ? '#166534'
                                : item.status === 'IN_PROGRESS' ? '#1d4ed8'
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
        </>
      )}
    </div>
  );
};