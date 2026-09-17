**
 * WardAnalytics.tsx
 * Proper multi-ward analysis for EcoCivic Sentinel.
 *
 * Drop this into: frontend/src/components/WardAnalytics.tsx
 * Then import and render it inside SustairaDashboard (or on the Ward Analytics route).
 */

import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts';
import {
  MapPin,
  Flame,
  Droplets,
  Trees,
  AlertTriangle,
  CheckCircle2,
  Users,
  Shield,
  TrendingUp,
  Activity,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Mock ward dataset (replace with API later)
───────────────────────────────────────────── */
export interface WardStats {
  id: string;
  name: string;
  area: string;
  totalReports: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  resolved: number;
  inProgress: number;
  resolutionRate: number; // %
  activeCitizens: number;
  male: number;
  female: number;
  other: number;
  treesPlanted: number;
  co2OffsetKg: number;
  fireReadiness: number; // %
  floodDefense: number; // %
  participationScore: number; // 0–100
  equityIndex: number; // 0–100
  topHazard: string;
}

const WARD_DATA: WardStats[] = [
  {
    id: 'w1',
    name: 'Ward 1',
    area: 'East Hills',
    totalReports: 42,
    critical: 4,
    high: 11,
    medium: 18,
    low: 9,
    resolved: 28,
    inProgress: 10,
    resolutionRate: 67,
    activeCitizens: 186,
    male: 92,
    female: 88,
    other: 6,
    treesPlanted: 520,
    co2OffsetKg: 1840,
    fireReadiness: 72,
    floodDefense: 58,
    participationScore: 78,
    equityIndex: 81,
    topHazard: 'FIRE',
  },
  {
    id: 'w2',
    name: 'Ward 2',
    area: 'North Hills',
    totalReports: 61,
    critical: 9,
    high: 17,
    medium: 22,
    low: 13,
    resolved: 35,
    inProgress: 18,
    resolutionRate: 57,
    activeCitizens: 241,
    male: 118,
    female: 112,
    other: 11,
    treesPlanted: 680,
    co2OffsetKg: 2450,
    fireReadiness: 59,
    floodDefense: 71,
    participationScore: 85,
    equityIndex: 76,
    topHazard: 'FIRE',
  },
  {
    id: 'w3',
    name: 'Ward 3',
    area: 'Central',
    totalReports: 33,
    critical: 2,
    high: 8,
    medium: 14,
    low: 9,
    resolved: 26,
    inProgress: 5,
    resolutionRate: 79,
    activeCitizens: 154,
    male: 71,
    female: 79,
    other: 4,
    treesPlanted: 410,
    co2OffsetKg: 1320,
    fireReadiness: 81,
    floodDefense: 64,
    participationScore: 71,
    equityIndex: 88,
    topHazard: 'POLLUTION',
  },
  {
    id: 'w4',
    name: 'Ward 4',
    area: 'West Bay',
    totalReports: 27,
    critical: 1,
    high: 6,
    medium: 12,
    low: 8,
    resolved: 22,
    inProgress: 4,
    resolutionRate: 81,
    activeCitizens: 128,
    male: 60,
    female: 64,
    other: 4,
    treesPlanted: 355,
    co2OffsetKg: 980,
    fireReadiness: 88,
    floodDefense: 76,
    participationScore: 68,
    equityIndex: 84,
    topHazard: 'FLOOD',
  },
  {
    id: 'w5',
    name: 'Ward 5',
    area: 'South Ridge',
    totalReports: 38,
    critical: 3,
    high: 10,
    medium: 16,
    low: 9,
    resolved: 24,
    inProgress: 11,
    resolutionRate: 63,
    activeCitizens: 172,
    male: 84,
    female: 82,
    other: 6,
    treesPlanted: 466,
    co2OffsetKg: 1560,
    fireReadiness: 65,
    floodDefense: 52,
    participationScore: 74,
    equityIndex: 79,
    topHazard: 'DUMPING',
  },
];

const URGENCY_COLORS = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export const WardAnalytics: React.FC = () => {
  const [selectedWardId, setSelectedWardId] = useState<string>('w2');
  const selected = useMemo(
    () => WARD_DATA.find((w) => w.id === selectedWardId) ?? WARD_DATA[1],
    [selectedWardId]
  );

  // Comparison chart data
  const comparisonData = WARD_DATA.map((w) => ({
    name: w.name.replace('Ward ', 'W'),
    Reports: w.totalReports,
    Resolved: w.resolved,
    Citizens: Math.round(w.activeCitizens / 5), // scale for chart readability
    'Fire Ready %': w.fireReadiness,
  }));

  // Radar data for selected ward
  const radarData = [
    { metric: 'Resolution', value: selected.resolutionRate },
    { metric: 'Fire Ready', value: selected.fireReadiness },
    { metric: 'Flood Def.', value: selected.floodDefense },
    { metric: 'Participation', value: selected.participationScore },
    { metric: 'Equity', value: selected.equityIndex },
  ];

  // Ranking by resolution rate
  const ranked = [...WARD_DATA].sort((a, b) => b.resolutionRate - a.resolutionRate);

  // City totals
  const cityTotals = useMemo(() => {
    return WARD_DATA.reduce(
      (acc, w) => ({
        reports: acc.reports + w.totalReports,
        resolved: acc.resolved + w.resolved,
        citizens: acc.citizens + w.activeCitizens,
        trees: acc.trees + w.treesPlanted,
        co2: acc.co2 + w.co2OffsetKg,
        critical: acc.critical + w.critical,
      }),
      { reports: 0, resolved: 0, citizens: 0, trees: 0, co2: 0, critical: 0 }
    );
  }, []);

  return (
    <div className="dashboard-grid" style={{ marginTop: '1rem' }}>
      {/* ── Header strip ── */}
      <div className="dash-card" style={{ gridColumn: 'span 12', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="dash-card-title" style={{ fontSize: '1.15rem' }}>
              Ward Analytics
            </div>
            <div className="dash-card-subtitle">
              Multi-ward comparison · incident load · readiness · participation
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {WARD_DATA.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelectedWardId(w.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 8,
                  border: selectedWardId === w.id ? '2px solid #0d9488' : '1px solid var(--border-card, #334155)',
                  background: selectedWardId === w.id ? 'rgba(13, 148, 136, 0.15)' : 'var(--bg-card, #1e293b)',
                  color: selectedWardId === w.id ? '#2dd4bf' : 'var(--text-main, #e2e8f0)',
                  fontWeight: selectedWardId === w.id ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                {w.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── City overview KPIs ── */}
      <div className="dash-card" style={{ gridColumn: 'span 2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Activity size={16} color="#38bdf8" />
          <span className="dash-card-subtitle">City Reports</span>
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{cityTotals.reports}</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{cityTotals.critical} critical open</div>
      </div>
      <div className="dash-card" style={{ gridColumn: 'span 2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <CheckCircle2 size={16} color="#22c55e" />
          <span className="dash-card-subtitle">Resolved</span>
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{cityTotals.resolved}</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          {Math.round((cityTotals.resolved / cityTotals.reports) * 100)}% city rate
        </div>
      </div>
      <div className="dash-card" style={{ gridColumn: 'span 2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Users size={16} color="#a78bfa" />
          <span className="dash-card-subtitle">Active Citizens</span>
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{cityTotals.citizens}</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>across 5 wards</div>
      </div>
      <div className="dash-card" style={{ gridColumn: 'span 3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Trees size={16} color="#22c55e" />
          <span className="dash-card-subtitle">Trees Planted</span>
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{cityTotals.trees.toLocaleString()}</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{(cityTotals.co2 / 1000).toFixed(1)} t CO₂ offset</div>
      </div>
      <div className="dash-card" style={{ gridColumn: 'span 3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Shield size={16} color="#f59e0b" />
          <span className="dash-card-subtitle">Avg Fire Readiness</span>
        </div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          {Math.round(WARD_DATA.reduce((s, w) => s + w.fireReadiness, 0) / WARD_DATA.length)}%
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>city-wide average</div>
      </div>

      {/* ── Selected ward detail card ── */}
      <div className="dash-card" style={{ gridColumn: 'span 5' }}>
        <div className="dash-card-header">
          <div>
            <div className="dash-card-title">
              {selected.name} — {selected.area}
            </div>
            <div className="dash-card-subtitle">Selected ward deep-dive</div>
          </div>
          <MapPin size={18} color="#2dd4bf" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
          <Metric label="Total Reports" value={selected.totalReports} />
          <Metric label="Resolution Rate" value={`${selected.resolutionRate}%`} accent="#22c55e" />
          <Metric label="Critical Open" value={selected.critical} accent="#ef4444" />
          <Metric label="In Progress" value={selected.inProgress} accent="#3b82f6" />
          <Metric label="Active Citizens" value={selected.activeCitizens} />
          <Metric label="Top Hazard" value={selected.topHazard} accent="#f59e0b" />
          <Metric label="Fire Readiness" value={`${selected.fireReadiness}%`} />
          <Metric label="Flood Defense" value={`${selected.floodDefense}%`} />
          <Metric label="Trees Planted" value={selected.treesPlanted} accent="#22c55e" />
          <Metric label="CO₂ Offset" value={`${selected.co2OffsetKg} kg`} accent="#22c55e" />
        </div>

        {/* Gender participation for this ward */}
        <div style={{ marginTop: 16 }}>
          <div className="dash-card-subtitle" style={{ marginBottom: 8 }}>Participation by Gender</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Pill label="Male" value={selected.male} color="#3b82f6" />
            <Pill label="Female" value={selected.female} color="#a855f7" />
            <Pill label="Other" value={selected.other} color="#f43f5e" />
          </div>
        </div>

        {/* Urgency breakdown bars */}
        <div style={{ marginTop: 16 }}>
          <div className="dash-card-subtitle" style={{ marginBottom: 8 }}>Urgency Breakdown</div>
          <UrgencyBar label="Critical" count={selected.critical} total={selected.totalReports} color={URGENCY_COLORS.critical} />
          <UrgencyBar label="High" count={selected.high} total={selected.totalReports} color={URGENCY_COLORS.high} />
          <UrgencyBar label="Medium" count={selected.medium} total={selected.totalReports} color={URGENCY_COLORS.medium} />
          <UrgencyBar label="Low" count={selected.low} total={selected.totalReports} color={URGENCY_COLORS.low} />
        </div>
      </div>

      {/* ── Radar performance ── */}
      <div className="dash-card" style={{ gridColumn: 'span 3' }}>
        <div className="dash-card-header">
          <div className="dash-card-title">Performance Radar</div>
        </div>
        <div style={{ height: 260, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
              <Radar
                name={selected.name}
                dataKey="value"
                stroke="#2dd4bf"
                fill="#2dd4bf"
                fillOpacity={0.35}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Ward ranking ── */}
      <div className="dash-card" style={{ gridColumn: 'span 4' }}>
        <div className="dash-card-header">
          <div>
            <div className="dash-card-title">Resolution Ranking</div>
            <div className="dash-card-subtitle">Wards by resolution rate</div>
          </div>
          <TrendingUp size={18} color="#22c55e" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {ranked.map((w, i) => (
            <div
              key={w.id}
              onClick={() => setSelectedWardId(w.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '0.55rem 0.75rem',
                borderRadius: 10,
                background: w.id === selectedWardId ? 'rgba(13, 148, 136, 0.12)' : 'rgba(30, 41, 59, 0.6)',
                border: w.id === selectedWardId ? '1px solid #0d9488' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: i === 0 ? '#22c55e' : i === 1 ? '#3b82f6' : i === 2 ? '#a855f7' : '#475569',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {w.name} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({w.area})</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {w.resolved}/{w.totalReports} resolved · {w.critical} critical
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#22c55e' }}>
                {w.resolutionRate}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison bar chart ── */}
      <div className="dash-card" style={{ gridColumn: 'span 7' }}>
        <div className="dash-card-header">
          <div>
            <div className="dash-card-title">Ward Comparison</div>
            <div className="dash-card-subtitle">Reports, resolved cases & fire readiness</div>
          </div>
        </div>
        <div style={{ height: 280, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="Reports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Fire Ready %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Hazard type by ward ── */}
      <div className="dash-card" style={{ gridColumn: 'span 5' }}>
        <div className="dash-card-header">
          <div>
            <div className="dash-card-title">Top Hazard by Ward</div>
            <div className="dash-card-subtitle">Primary risk category</div>
          </div>
          <AlertTriangle size={18} color="#f59e0b" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {WARD_DATA.map((w) => (
            <div
              key={w.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.8rem',
                borderRadius: 10,
                background: 'rgba(30, 41, 59, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HazardIcon type={w.topHazard} />
                <div>
                  <div style={{ fontWeight: 600 }}>{w.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{w.area}</div>
                </div>
              </div>
              <span
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: 6,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: hazardBg(w.topHazard),
                  color: hazardColor(w.topHazard),
                }}
              >
                {w.topHazard}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full comparison table ── */}
      <div className="dash-card" style={{ gridColumn: 'span 12' }}>
        <div className="dash-card-header">
          <div>
            <div className="dash-card-title">Ward Comparison Table</div>
            <div className="dash-card-subtitle">All key metrics side-by-side</div>
          </div>
        </div>
        <div className="custom-table-wrapper" style={{ overflowX: 'auto' }}>
          <table className="custom-table" style={{ width: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>Ward</th>
                <th>Area</th>
                <th>Reports</th>
                <th>Critical</th>
                <th>Resolved</th>
                <th>Rate</th>
                <th>Citizens</th>
                <th>Fire Ready</th>
                <th>Flood Def.</th>
                <th>Trees</th>
                <th>CO₂ (kg)</th>
                <th>Equity</th>
                <th>Top Hazard</th>
              </tr>
            </thead>
            <tbody>
              {WARD_DATA.map((w) => (
                <tr
                  key={w.id}
                  onClick={() => setSelectedWardId(w.id)}
                  style={{
                    cursor: 'pointer',
                    background: w.id === selectedWardId ? 'rgba(13, 148, 136, 0.1)' : undefined,
                  }}
                >
                  <td style={{ fontWeight: 700 }}>{w.name}</td>
                  <td>{w.area}</td>
                  <td>{w.totalReports}</td>
                  <td style={{ color: w.critical > 5 ? '#ef4444' : undefined, fontWeight: w.critical > 5 ? 700 : 400 }}>
                    {w.critical}
                  </td>
                  <td>{w.resolved}</td>
                  <td style={{ fontWeight: 700, color: w.resolutionRate >= 75 ? '#22c55e' : w.resolutionRate < 60 ? '#f59e0b' : undefined }}>
                    {w.resolutionRate}%
                  </td>
                  <td>{w.activeCitizens}</td>
                  <td>{w.fireReadiness}%</td>
                  <td>{w.floodDefense}%</td>
                  <td>{w.treesPlanted}</td>
                  <td>{w.co2OffsetKg}</td>
                  <td>{w.equityIndex}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: 4,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: hazardBg(w.topHazard),
                        color: hazardColor(w.topHazard),
                      }}
                    >
                      {w.topHazard}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ── Small helpers ── */
function Metric({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div style={{ padding: '0.5rem 0.65rem', borderRadius: 8, background: 'rgba(30, 41, 59, 0.5)' }}>
      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: accent || 'inherit' }}>{value}</div>
    </div>
  );
}

function Pill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        flex: 1,
        padding: '0.5rem 0.75rem',
        borderRadius: 10,
        background: color,
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '0.85rem',
      }}
    >
      <span>{label}</span>
      <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{value}</span>
    </div>
  );
}

function UrgencyBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 2 }}>
        <span style={{ color: '#94a3b8' }}>{label}</span>
        <span style={{ fontWeight: 600 }}>
          {count} ({pct}%)
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: 'rgba(51, 65, 85, 0.6)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4 }} />
      </div>
    </div>
  );
}

function HazardIcon({ type }: { type: string }) {
  const size = 16;
  if (type === 'FIRE') return <Flame size={size} color="#ef4444" />;
  if (type === 'FLOOD') return <Droplets size={size} color="#3b82f6" />;
  if (type === 'POLLUTION') return <AlertTriangle size={size} color="#eab308" />;
  return <Trees size={size} color="#22c55e" />;
}

function hazardBg(type: string) {
  const map: Record<string, string> = {
    FIRE: 'rgba(239, 68, 68, 0.15)',
    FLOOD: 'rgba(59, 130, 246, 0.15)',
    POLLUTION: 'rgba(234, 179, 8, 0.15)',
    DUMPING: 'rgba(168, 85, 247, 0.15)',
    ECO: 'rgba(34, 197, 94, 0.15)',
  };
  return map[type] || 'rgba(148, 163, 184, 0.15)';
}

function hazardColor(type: string) {
  const map: Record<string, string> = {
    FIRE: '#ef4444',
    FLOOD: '#3b82f6',
    POLLUTION: '#eab308',
    DUMPING: '#a855f7',
    ECO: '#22c55e',
  };
  return map[type] || '#94a3b8';
}

export default WardAnalytics;
