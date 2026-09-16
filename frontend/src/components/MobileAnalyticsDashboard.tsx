import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis 
} from 'recharts';
import { MapPin } from 'lucide-react';

const turnoverTrendData = [
  { name: 'Jan', rate: 41.9, resignations: 18.3, active: 8.1 },
  { name: 'Feb', rate: 43.5, resignations: 19.1, active: 8.4 },
  { name: 'Mar', rate: 39.8, resignations: 17.5, active: 8.0 },
  { name: 'Apr', rate: 41.9, resignations: 18.3, active: 8.1 },
];

const opsBarData = [
  { month: 'Jan', val: 45 },
  { month: 'Feb', val: 52 },
  { month: 'Mar', val: 60 },
  { month: 'Apr', val: 68 },
  { month: 'May', val: 74 },
  { month: 'Jun', val: 80 },
  { month: 'Jul', val: 85 },
  { month: 'Aug', val: 88 },
  { month: 'Sept', val: 92 },
];

const salesTableData = [
  { name: 'Alice', score: 2104.00, resTime: 1210.00, open: 894.00, total: 4845.00, delta: -2741.00 },
  { name: 'Zoey', score: 1342.95, resTime: 800.00, open: 542.95, total: 565.50, delta: 777.45 },
  { name: 'April', score: 916.40, resTime: 584.00, open: 332.40, total: 4113.70, delta: -3197.30 },
  { name: 'Bob', score: 858.00, resTime: 521.00, open: 337.00, total: 23.80, delta: 834.20 },
  { name: 'Jack', score: 45.00, resTime: 21.00, open: 24.00, total: 0.00, delta: 45.00 },
];

export const MobileAnalyticsDashboard: React.FC = () => {
  const [mobileSubTab, setMobileSubTab] = useState<'turnover' | 'dark_ward' | 'ops_center' | 'map_drill'>('turnover');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* View Selector Header inside Mobile Dashboard */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <button
          className={`btn-outline ${mobileSubTab === 'turnover' ? 'btn-sustaira' : ''}`}
          onClick={() => setMobileSubTab('turnover')}
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
        >
          1. Issue Turnover
        </button>
        <button
          className={`btn-outline ${mobileSubTab === 'dark_ward' ? 'btn-sustaira' : ''}`}
          onClick={() => setMobileSubTab('dark_ward')}
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
        >
          2. Ward Dark Ops
        </button>
        <button
          className={`btn-outline ${mobileSubTab === 'ops_center' ? 'btn-sustaira' : ''}`}
          onClick={() => setMobileSubTab('ops_center')}
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
        >
          3. Env Ops Center
        </button>
        <button
          className={`btn-outline ${mobileSubTab === 'map_drill' ? 'btn-sustaira' : ''}`}
          onClick={() => setMobileSubTab('map_drill')}
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
        >
          4. Map & Sales Drill
        </button>
      </div>

      {/* Screen 1: Employee / Issue Turnover Analysis */}
      {mobileSubTab === 'turnover' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a' }}>
              Employee & Hazard Turnover Analysis
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>17:42</div>
          </div>

          {/* Date Selector Row */}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#ffffff', padding: '0.5rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ flex: 1, fontSize: '0.75rem' }}>
              <span style={{ color: '#64748b' }}>Start Date: </span>
              <span style={{ fontWeight: 600 }}>2026-05</span>
            </div>
            <div style={{ flex: 1, fontSize: '0.75rem' }}>
              <span style={{ color: '#64748b' }}>End Date: </span>
              <span style={{ fontWeight: 600 }}>2026-09</span>
            </div>
          </div>

          {/* Metric Grid Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            <div style={{ background: '#3b82f6', color: '#fff', padding: '0.6rem 0.4rem', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>New Hire Turnover</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>47.3%</div>
            </div>
            <div style={{ background: '#0284c7', color: '#fff', padding: '0.6rem 0.4rem', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>High Perf. Dispatch</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>21.3%</div>
            </div>
            <div style={{ background: '#6366f1', color: '#fff', padding: '0.6rem 0.4rem', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>High Rank Response</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>19.3%</div>
            </div>
            <div style={{ background: '#10b981', color: '#fff', padding: '0.6rem 0.4rem', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>Senior Officer Active</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>13.3%</div>
            </div>
          </div>

          {/* Line Charts */}
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Turnover Rate</span>
              <span style={{ fontWeight: 800, color: '#0284c7', fontSize: '1rem' }}>41.9%</span>
            </div>
            <div style={{ height: 70, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnoverTrendData}>
                  <Line type="monotone" dataKey="rate" stroke="#0284c7" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Number of Resignations / Hazard Reports</span>
              <span style={{ fontWeight: 800, color: '#3b82f6', fontSize: '1rem' }}>18.3%</span>
            </div>
            <div style={{ height: 70, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnoverTrendData}>
                  <Line type="monotone" dataKey="resignations" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Number of Active Response Officers</span>
              <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>8.1%</span>
            </div>
            <div style={{ height: 70, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={turnoverTrendData}>
                  <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reason Analysis Chips */}
          <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>Reason Analysis</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', fontSize: '0.7rem' }}>
              <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.5rem', borderRadius: 4 }}>Not satisfied with resolution speed</span>
              <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.5rem', borderRadius: 4 }}>Bottleneck in personal reporting</span>
              <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.2rem 0.5rem', borderRadius: 4 }}>Not adapted to ward safety culture</span>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Retail Groups / City Ward Dashboard (Sleek Dark Mode) */}
      {mobileSubTab === 'dark_ward' && (
        <div style={{ background: '#0b132b', color: '#ffffff', padding: '1rem', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>20:02</span>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>City Wards Dashboard</div>
          </div>

          {/* Navigation Pill Bar */}
          <div style={{ display: 'flex', background: '#1c2541', padding: 4, borderRadius: 8, fontSize: '0.75rem' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '0.35rem', background: '#3a506b', borderRadius: 6, fontWeight: 700 }}>Overview</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '0.35rem', color: '#94a3b8' }}>Ward 1</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '0.35rem', color: '#94a3b8' }}>Ward 2</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '0.35rem', color: '#94a3b8' }}>Ward 3</div>
          </div>

          {/* Central Circular Donut */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
            <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="58" fill="none" stroke="#1c2541" strokeWidth="12" />
                <circle cx="70" cy="70" r="58" fill="none" stroke="#38bdf8" strokeWidth="12" strokeDasharray="364" strokeDashoffset="90" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Target Year</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Last Year</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              <span>• Ward 1</span>
              <span>• Ward 2</span>
              <span>• Ward 3</span>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{ background: '#1c2541', padding: '1rem', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Ward 1 (Central Hub)</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>441 k</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
              <span>This Month: 4,414</span>
              <span style={{ color: '#4ade80' }}>MoM ↑ 55.60</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
              <span>This Year: 11,456</span>
              <span style={{ color: '#4ade80' }}>YoY ↑ 55.60</span>
            </div>
          </div>

          <div style={{ background: '#1c2541', padding: '1rem', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Ward 2 (North Zone)</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>214 k</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
              <span>This Month: 2,451</span>
              <span style={{ color: '#4ade80' }}>MoM ↑ 42.32</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
              <span>This Year: 6,432</span>
              <span style={{ color: '#ef4444' }}>YoY ↓ 55.45</span>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Retail Operation / Environmental Operations Center Overview */}
      {mobileSubTab === 'ops_center' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)', color: '#ffffff', padding: '1.25rem', borderRadius: 12, textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Operation Center Overview</h3>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Real-Time City Hazard Response Metrics</div>
          </div>

          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Eco & Safety Budget</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>$3.4 billion</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Engaged Citizens</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>0.15 billion</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Resolved Incidents</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>1543</span>
            </div>
          </div>

          {/* Bar Chart Overview */}
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sales / Incident Overview</div>
            <div style={{ height: 160, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={opsBarData}>
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Bar dataKey="val" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Screen 4: Overall Sales Performance & Geospatial Map Drilldown */}
      {mobileSubTab === 'map_drill' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Sales & Response Performance (Drilldown)
            </div>
            <div className="custom-table-wrapper">
              <table className="custom-table" style={{ fontSize: '0.75rem' }}>
                <thead>
                  <tr>
                    <th>Officer</th>
                    <th>Score</th>
                    <th>Response Time</th>
                    <th>Resolved</th>
                    <th>Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTableData.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{row.name}</td>
                      <td>{row.score.toFixed(2)}</td>
                      <td>{row.resTime.toFixed(2)}</td>
                      <td>{row.open.toFixed(2)}</td>
                      <td style={{ color: row.delta >= 0 ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                        {row.delta.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Map Drilldown Visual */}
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Market & Ward Segmentation (Geospatial Linkage)
            </div>
            <div style={{ height: 180, background: '#eff6ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #bfdbfe' }}>
              <div style={{ textAlign: 'center' }}>
                <MapPin size={32} style={{ margin: '0 auto', color: '#3b82f6' }} />
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e40af', marginTop: 4 }}>
                  Southeast City Wards Map View
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Interactive Hazard Heatmap Overlay Active</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
