import React from 'react';
import { 
  Award, 
  Sun, 
  Moon, 
  Smartphone, 
  PlusCircle, 
  CheckCircle2, 
  Flame, 
  Trees, 
  BarChart3, 
  Compass,
  MapPin,
  ExternalLink,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileSimulator: boolean;
  setIsMobileSimulator: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenReportModal: () => void;
  onOpenResourcesModal: () => void;
  currentUser: { email: string; name: string; role: 'CITIZEN' | 'AUTHORITY' } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMobileSimulator,
  setIsMobileSimulator,
  isDarkMode,
  setIsDarkMode,
  onOpenReportModal,
  onOpenResourcesModal,
  currentUser,
  onLogout,
}) => {
  return (
    <header className="sustaira-header">
      <div className="header-brand">
        <Trees size={22} className="text-emerald-400" />
        <span>EcoCivic Sentinel</span>
        <span className="header-brand-tag">ENVIRONMENTAL &amp; FIRE SAFE</span>
      </div>

      <nav className="header-nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'launchpad' ? 'active' : ''}`}
          onClick={() => setActiveTab('launchpad')}
        >
          <Compass size={16} />
          Launchpad
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'world_map' ? 'active' : ''}`}
          onClick={() => setActiveTab('world_map')}
        >
          <MapPin size={16} />
          World Map
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <Flame size={16} />
          Hazards & Fires
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
        >
          <CheckCircle2 size={16} />
          Actions
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('rewards')}
        >
          <Award size={16} />
          Rewards
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'ward_ops' ? 'active' : ''}`}
          onClick={() => setActiveTab('ward_ops')}
        >
          <BarChart3 size={16} />
          Ward Analytics
        </button>
      </nav>

      <div className="header-right">
        <div className="xp-badge" title="Citizen Community Impact XP">
          <Trees size={14} />
          <span>25 XP</span>
        </div>

        <button
          className="nav-tab-btn"
          style={{ height: 'auto', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
          title="Open Resources Directory"
          onClick={onOpenResourcesModal}
        >
          <ExternalLink size={15} />
          <span>Resources</span>
        </button>

        <button
          className="btn-sustaira"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#dc2626' }}
          onClick={onOpenReportModal}
        >
          <PlusCircle size={15} />
          Report Hazard / Fire
        </button>

        <button
          className="nav-tab-btn"
          style={{ height: 'auto', padding: '0.35rem' }}
          title={isMobileSimulator ? 'Switch to Desktop View' : 'Switch to Mobile Simulator'}
          onClick={() => setIsMobileSimulator(!isMobileSimulator)}
        >
          <Smartphone size={18} className={isMobileSimulator ? 'text-emerald-400' : ''} />
        </button>

        <button
          className="nav-tab-btn"
          style={{ height: 'auto', padding: '0.35rem' }}
          title="Toggle Theme"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {currentUser && (
          <div className="user-profile-pill" style={{ position: 'relative' }}>
            <div className="avatar-circle">
              {currentUser.role === 'AUTHORITY' ? 'AU' : 'MB'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.75rem', lineHeight: 1.1 }}>
              <span style={{ fontWeight: 700 }}>{currentUser.name}</span>
              <span style={{ fontSize: '0.65rem', color: currentUser.role === 'AUTHORITY' ? '#fca5a5' : '#86efac' }}>
                {currentUser.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 2 }}
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
