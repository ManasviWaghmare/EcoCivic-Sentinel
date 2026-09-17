import React from 'react';
import { Award, Star, Gift, Trees, Leaf, Flame, Droplets, CheckCircle2 } from 'lucide-react';

interface RewardsViewProps {
  currentUser: { email: string; name: string; role: 'CITIZEN' | 'AUTHORITY' } | null;
}

export const RewardsView: React.FC<RewardsViewProps> = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Civic Rewards & Achievements
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Earn XP by reporting hazards and participating in community eco-actions.
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
          padding: '1rem 2rem',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          color: 'white'
        }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, opacity: 0.9 }}>
            Current Balance
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={32} /> 25 <span style={{ fontSize: '1.2rem' }}>XP</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Achievements Section */}
        <div className="dash-card" style={{ gridColumn: 'span 6' }}>
          <div className="dash-card-header">
            <div className="dash-card-title">My Badges & Achievements</div>
            <Star size={18} className="text-amber-400" />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '120px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: 5, right: 5 }}><CheckCircle2 size={14} color="#10b981" /></div>
              <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <Flame size={24} color="#f59e0b" />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>First Responder</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Reported a fire hazard</div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '120px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: 5, right: 5 }}><CheckCircle2 size={14} color="#10b981" /></div>
              <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <Trees size={24} color="#10b981" />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Eco Warrior</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Offset 1,000kg CO₂</div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px dashed var(--border-card)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '120px',
              textAlign: 'center',
              opacity: 0.5
            }}>
              <div style={{ background: '#e0f2fe', padding: '0.75rem', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <Droplets size={24} color="#0ea5e9" />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Flood Watch</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>0/3 Floods reported</div>
            </div>
          </div>
        </div>

        {/* Redeem Rewards Section */}
        <div className="dash-card" style={{ gridColumn: 'span 6' }}>
          <div className="dash-card-header">
            <div className="dash-card-title">Redeem XP</div>
            <Gift size={18} className="text-purple-400" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#f3e8ff', padding: '0.75rem', borderRadius: '12px' }}>
                  <Leaf size={24} color="#9333ea" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Plant a Real Tree</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>City partners will plant a tree in your name</div>
                </div>
              </div>
              <button className="btn-sustaira" style={{ padding: '0.5rem 1rem' }}>
                50 XP
              </button>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#e0f2fe', padding: '0.75rem', borderRadius: '12px' }}>
                  <Award size={24} color="#0ea5e9" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Transit Pass Discount</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get 15% off your next monthly transit pass</div>
                </div>
              </div>
              <button className="btn-sustaira" style={{ padding: '0.5rem 1rem' }}>
                100 XP
              </button>
            </div>
            
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: 0.6
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#f1f5f9', padding: '0.75rem', borderRadius: '12px' }}>
                  <Gift size={24} color="#64748b" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Local Business Voucher</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>$10 off at participating eco-friendly stores</div>
                </div>
              </div>
              <button className="btn-outline" style={{ padding: '0.5rem 1rem', cursor: 'not-allowed' }}>
                250 XP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
