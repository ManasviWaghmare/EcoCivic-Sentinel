import React from 'react';
import { User, Shield, Moon, Sun, LogOut, Award, Calendar, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  currentUser: { email: string; name: string; role: 'CITIZEN' | 'AUTHORITY' };
  reports: any[];
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  reports,
  isDarkMode,
  setIsDarkMode,
  onLogout
}) => {
  // Stats
  const userReports = reports.filter(r => r.reporter === currentUser.name || currentUser.role === 'AUTHORITY');
  const resolvedReports = userReports.filter(r => r.status === 'RESOLVED').length;
  
  return (
    <div style={{ padding: '1.5rem', paddingBottom: '6rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
        My Profile
      </h2>

      {/* User Info Card */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00c9b0, #0ea5e9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#020a13',
          boxShadow: '0 4px 10px rgba(0, 200, 180, 0.3)'
        }}>
          <User size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{currentUser.name}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{currentUser.email}</div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.25rem', 
            marginTop: '0.5rem',
            padding: '0.2rem 0.6rem', 
            borderRadius: '999px',
            background: currentUser.role === 'AUTHORITY' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(0, 212, 184, 0.1)',
            color: currentUser.role === 'AUTHORITY' ? '#dc2626' : '#00d4b8',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {currentUser.role === 'AUTHORITY' ? <Shield size={12} /> : <Award size={12} />}
            {currentUser.role}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <FileText size={16} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Reports</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {userReports.length}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={16} color="#10b981" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Resolved</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>
            {resolvedReports}
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Settings & Preferences
      </h3>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        {/* Dark Mode Toggle */}
        <div 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
            {isDarkMode ? <Moon size={18} color="#a855f7" /> : <Sun size={18} color="#eab308" />}
            Dark Mode
          </div>
          
          {/* Custom Toggle Switch */}
          <div style={{
            width: '44px',
            height: '24px',
            borderRadius: '12px',
            background: isDarkMode ? '#00d4b8' : '#cbd5e1',
            position: 'relative',
            transition: 'background 0.3s ease'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#ffffff',
              position: 'absolute',
              top: '2px',
              left: isDarkMode ? '22px' : '2px',
              transition: 'left 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>

        {/* Member Since */}
        <div style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
          }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontWeight: 600 }}>
            <Calendar size={18} color="#3b82f6" />
            Member Since
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sept 2026</div>
        </div>

        {/* Logout Button */}
        <div 
          onClick={onLogout}
          style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            background: 'rgba(220, 38, 38, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
            <LogOut size={18} />
            Sign Out
          </div>
          <ChevronRight size={18} color="#dc2626" />
        </div>
      </div>
    </div>
  );
};
