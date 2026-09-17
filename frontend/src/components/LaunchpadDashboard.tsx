import React from 'react';
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
  CartesianGrid,
} from 'recharts';
import { Trees, Cloud, Calendar, ShieldCheck, Zap } from 'lucide-react';

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

export const LaunchpadDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>
        Launchpad
      </h1>
      <p className="page-subtitle" style={{ marginBottom: '1.25rem' }}>
        Your city-wide sustainability & civic engagement overview.
      </p>

      <div className="dashboard-grid">
        <div className="dash-card" style={{ gridColumn: 'span 4' }}>
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

        <div className="dash-card tree-counter-card" style={{ gridColumn: 'span 3' }}>
          <div className="tree-canopy-visual">
            <Trees size={32} className="tree-icon-anim" style={{ color: '#166534' }} />
            <Trees size={48} className="tree-icon-anim" style={{ color: '#22c55e', animationDelay: '0.4s' }} />
            <Trees size={36} className="tree-icon-anim" style={{ color: '#15803d', animationDelay: '0.8s' }} />
          </div>
          <div className="tree-counter-number">2,031</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#15803d', marginTop: 4 }}>
            Trees Planted & Tons CO2 Offset
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Community Eco Goal 2026</div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 5' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Carbon Offsets & Emergency Frequency</div>
              <div className="dash-card-subtitle">Cumulative offsets by active citizens</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
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

        <div className="dash-card" style={{ gridColumn: 'span 4' }}>
          <div className="dash-card-header">
            <div className="dash-card-title">City DEI & Equity Score</div>
            <ShieldCheck size={18} className="text-emerald-500" />
          </div>
          <div className="dei-radial-container">
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

        <div className="dash-card" style={{ gridColumn: 'span 3' }}>
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

        <div className="dash-card" style={{ gridColumn: 'span 2' }}>
          <div className="dash-card-header">
            <div className="dash-card-title">Demographics</div>
          </div>
          <div style={{ height: 160, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={raceData}
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {raceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card cloud-meter-card" style={{ gridColumn: 'span 3' }}>
          <div className="dash-card-title">Carbon Offset Target</div>
          <div className="cloud-visual-box">
            <Cloud className="cloud-svg-icon" />
            <div className="cloud-overlay-text">40 <span style={{ fontSize: '0.8rem' }}>MTCO2e</span></div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Current City Target Milestone</div>
        </div>
      </div>
    </div>
  );
};
