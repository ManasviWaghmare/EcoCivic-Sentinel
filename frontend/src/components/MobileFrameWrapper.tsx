import React from 'react';
import { Signal, Wifi, Battery, Home, Users, Store, Compass } from 'lucide-react';

interface MobileFrameWrapperProps {
  children: React.ReactNode;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({ children }) => {
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

        {/* Bottom Phone Navigation */}
        <div className="phone-bottom-nav">
          <button className="phone-nav-btn active">
            <Home size={18} />
            <span>Homepage</span>
          </button>
          <button className="phone-nav-btn">
            <Users size={18} />
            <span>Manager</span>
          </button>
          <button className="phone-nav-btn">
            <Store size={18} />
            <span>Store Ops</span>
          </button>
          <button className="phone-nav-btn">
            <Compass size={18} />
            <span>Shop Ops</span>
          </button>
        </div>
      </div>
    </div>
  );
};
