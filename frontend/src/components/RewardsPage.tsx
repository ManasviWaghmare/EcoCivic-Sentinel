import React, { useMemo, useState } from 'react';
import { Award, Trophy, Lock, Gift, Flame, Trees, ShieldCheck, Sprout } from 'lucide-react';

interface ReportItem {
  id: string;
  reporter: string;
  category: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
}

interface RewardsPageProps {
  reports: ReportItem[];
  currentUserName?: string;
  currentXp?: number;
}

const badges = [
  { name: 'First Report', desc: 'Submitted your first hazard report', icon: Flame, earned: true, color: '#ef4444' },
  { name: 'Fire Spotter', desc: 'Reported 1+ fire hazard', icon: Flame, earned: true, color: '#f59e0b' },
  { name: 'Flood Guardian', desc: 'Reported 3+ flood incidents', icon: ShieldCheck, earned: false, color: '#0284c7' },
  { name: 'Tree Planter', desc: 'Logged an eco / tree-planting action', icon: Trees, earned: false, color: '#16a34a' },
  { name: 'Eco Sprout', desc: 'Earned your first 25 XP', icon: Sprout, earned: true, color: '#22c55e' },
  { name: 'Century Club', desc: 'Reached 100 lifetime XP', icon: Trophy, earned: false, color: '#a855f7' },
];

const catalog = [
  { name: 'Reusable Water Bottle', cost: 20, desc: 'EcoCivic-branded steel bottle' },
  { name: 'Tree Planting Kit', cost: 50, desc: 'Sapling + planting guide for your ward' },
  { name: 'Solar Consultation Voucher', cost: 100, desc: '1-hour session with a city energy advisor' },
  { name: 'City Council Recognition', cost: 200, desc: 'Featured as a Ward Sustainability Champion' },
];

export const RewardsPage: React.FC<RewardsPageProps> = ({
  reports,
  currentUserName = 'You',
  currentXp = 25,
}) => {
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const nextLevelXp = 50;
  const progressPct = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  const leaderboard = useMemo(() => {
    const counts: Record<string, number> = {};
    reports.forEach((r) => {
      counts[r.reporter] = (counts[r.reporter] || 0) + 1;
    });
    const rows = Object.entries(counts).map(([name, count]) => ({
      name,
      xp: count * 15 + (name === currentUserName ? currentXp : 0),
      reports: count,
    }));
    rows.push({ name: currentUserName, xp: currentXp, reports: 0 });
    return rows
      .reduce<typeof rows>((acc, row) => {
        const existing = acc.find((r) => r.name === row.name);
        if (existing) {
          existing.xp = Math.max(existing.xp, row.xp);
          existing.reports += row.reports;
        } else {
          acc.push({ ...row });
        }
        return acc;
      }, [])
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 6);
  }, [reports, currentUserName, currentXp]);

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Rewards</h1>
      <p className="page-subtitle" style={{ marginBottom: '1.25rem' }}>
        Earn XP for reporting hazards and completing eco-actions, then redeem it for real rewards.
      </p>

      <div className="dashboard-grid">
        <div className="dash-card" style={{ gridColumn: 'span 5' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Your Impact XP</div>
              <div className="dash-card-subtitle">Level up by reporting hazards & completing pledges</div>
            </div>
            <Award size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.75rem 0' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{currentXp}</span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/ {nextLevelXp} XP to next level</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }}>{progressPct}%</div>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
            Current title: <strong style={{ color: 'var(--text-main)' }}>Community Scout</strong> — next up: <strong>Ward Guardian</strong>
          </div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 7' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Achievements</div>
              <div className="dash-card-subtitle">Badges earned from civic & environmental action</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.name}
                  style={{
                    border: '1px solid var(--border-card)',
                    borderRadius: 10,
                    padding: '0.75rem',
                    opacity: b.earned ? 1 : 0.5,
                    background: 'var(--bg-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ background: `${b.color}22`, color: b.color, borderRadius: 8, padding: '0.4rem' }}>
                      <Icon size={16} />
                    </div>
                    {!b.earned && <Lock size={13} color="#94a3b8" />}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-main)' }}>
                    {b.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>{b.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 7' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Redeem Rewards</div>
              <div className="dash-card-subtitle">Spend your XP on real-world perks</div>
            </div>
            <Gift size={18} style={{ color: '#22c55e' }} />
          </div>

          <div className="custom-table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Reward</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {catalog.map((r) => {
                  const isRedeemed = redeemed.includes(r.name);
                  const canAfford = currentXp >= r.cost && !isRedeemed;
                  return (
                    <tr key={r.name}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.desc}</div>
                      </td>
                      <td style={{ fontWeight: 700, color: '#16a34a' }}>{r.cost} XP</td>
                      <td>
                        <button
                          className="btn-sustaira"
                          disabled={!canAfford}
                          style={{
                            padding: '0.35rem 0.7rem',
                            fontSize: '0.75rem',
                            opacity: canAfford ? 1 : 0.5,
                            cursor: canAfford ? 'pointer' : 'not-allowed',
                          }}
                          onClick={() => canAfford && setRedeemed((prev) => [...prev, r.name])}
                        >
                          {isRedeemed ? 'Redeemed' : 'Redeem'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-card" style={{ gridColumn: 'span 5' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Community Leaderboard</div>
              <div className="dash-card-subtitle">Top contributors by XP this season</div>
            </div>
            <Trophy size={18} style={{ color: '#eab308' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {leaderboard.map((row, idx) => (
              <div
                key={row.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.6rem',
                  borderRadius: 8,
                  background: row.name === currentUserName ? 'var(--bg-subtle)' : 'transparent',
                  border: row.name === currentUserName ? '1px solid var(--border-card)' : '1px solid transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontWeight: 800, color: '#94a3b8', width: 18 }}>#{idx + 1}</span>
                  <div className="avatar-circle" style={{ width: 28, height: 28, fontSize: '0.7rem' }}>
                    {row.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    {row.name}{row.name === currentUserName ? ' (you)' : ''}
                  </span>
                </div>
                <span style={{ fontWeight: 700, color: '#16a34a', fontSize: '0.85rem' }}>{row.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
