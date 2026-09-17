import React from 'react';
import { Signal, Wifi, Battery, Home, Users, Store, Compass } from 'lucide-react';

// ✅ FIXED: Added activeTab, setActiveTab, onOpenReportModal to props
interface MobileFrameWrapperProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({
  children,
  activeTab,
  setActiveTab,
  onOpenReportModal,
}) => {
  return (
    <div className="mobile-simulator-wrapper">
      <div className="phone-container">
        {/* Phone Notch & Status Bar */}
        <div className="phone-notch-bar">
          <span>17:42</span>
          <div className="phone-notch"></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={14} />
          </div>
        </div>

        {/* Inner Viewport Screen */}
        <div className="phone-screen">
          {children}
        </div>

        {/* ✅ FIXED: Bottom nav now uses activeTab to highlight active tab */}
        <div className="phone-bottom-nav">
          <button
            className={`phone-nav-btn ${activeTab === 'launchpad' ? 'active' : ''}`}
            onClick={() => setActiveTab('launchpad')}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          <button
            className={`phone-nav-btn ${activeTab === 'world_map' ? 'active' : ''}`}
            onClick={() => setActiveTab('world_map')}
          >
            <Compass size={18} />
            <span>Map</span>
          </button>
          <button
            className={`phone-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Users size={18} />
            <span>Profile</span>
          </button>
          <button
            className="phone-nav-btn"
            onClick={onOpenReportModal}
          >
            <Store size={18} />
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};