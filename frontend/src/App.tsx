import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SustairaDashboard } from './components/SustairaDashboard';
import { MobileAnalyticsDashboard } from './components/MobileAnalyticsDashboard';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import { NewReportModal } from './components/NewReportModal';
import { AuthPage } from './components/AuthPage';
import { WorldMapView } from './components/WorldMapView';
import { ResourcesModal } from './components/ResourcesModal';
import { ProfileView } from './components/ProfileView';
import { RewardsView } from './components/RewardsView';
import { ShieldAlert } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: 'CITIZEN' | 'AUTHORITY' } | null>(null);
  const [activeTab, setActiveTab] = useState('launchpad');
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<string>('');

  const [reports, setReports] = useState([
    {
      id: '1',
      reporter: 'Bill Doody',
      category: 'FIRE',
      title: 'Wildfire outbreak warning near Pine Ridge forest trail',
      location: 'Ward 2 North Hills | Miles: 55',
      urgency: 'CRITICAL' as const,
      impactMetric: '104.58 kg CO₂',
      costOrImpact: '$0.18',
      status: 'IN_PROGRESS',
      date: '09/16/2026',
      lat: 34.0522,
      lng: -118.2437
    },
    {
      id: '2',
      reporter: 'Bill Doody',
      category: 'FLOOD',
      title: 'Storm drain blockage & urban street flooding',
      location: 'Logan International Airport to Los Angeles',
      urgency: 'HIGH' as const,
      impactMetric: '809.69 kg CO₂',
      costOrImpact: '$12.11',
      status: 'IN_REVIEW',
      date: '09/15/2026',
      lat: 51.5074,
      lng: -0.1278
    },
    {
      id: '3',
      reporter: 'Bill Doody',
      category: 'FIRE',
      title: 'Hotel electrical fire hazard & hydrant inspection needed',
      location: 'Hotel (2 Night(s))',
      urgency: 'HIGH' as const,
      impactMetric: '27.20 kg CO₂',
      costOrImpact: '$0.42',
      status: 'IN_PROGRESS',
      date: '09/14/2026',
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: '4',
      reporter: 'Bill Doody',
      category: 'DUMPING',
      title: 'Illegal hazardous waste dumping along riverbank',
      location: 'Gwadar International Airport To Frankfurt Main',
      urgency: 'MEDIUM' as const,
      impactMetric: '1028.83 kg CO₂',
      costOrImpact: '$15.39',
      status: 'SUBMITTED',
      date: '09/12/2026',
      lat: 50.1109,
      lng: 8.6821
    },
    {
      id: '5',
      reporter: 'Vincent de la Mar',
      category: 'POLLUTION',
      title: 'Industrial smog plume & particulate air pollution',
      location: 'Logan International Airport to Amsterdam Schiphol',
      urgency: 'HIGH' as const,
      impactMetric: '107.21 kg CO₂',
      costOrImpact: '$14.17',
      status: 'IN_REVIEW',
      date: '09/10/2026',
      lat: 35.6762,
      lng: 139.6503
    },
    {
      id: '6',
      reporter: 'Luke Bashford',
      category: 'ECO',
      title: 'Community mangrove planting & flood defense barrier',
      location: 'Flight | BOS -> DEN',
      urgency: 'LOW' as const,
      impactMetric: '664.46 kg CO₂',
      costOrImpact: '$11.46',
      status: 'RESOLVED',
      date: '09/08/2026',
      lat: 1.3521,
      lng: 103.8198
    },
    {
      id: '7',
      reporter: 'Maggie Burnham',
      category: 'ECO',
      title: 'Solar panel microgrid rebate installation in Ward 1',
      location: 'Flight | DEN -> LHR',
      urgency: 'LOW' as const,
      impactMetric: '2895.18 kg CO₂',
      costOrImpact: '$26.32',
      status: 'RESOLVED',
      date: '09/05/2026',
      lat: 51.5072,
      lng: -0.1276
    }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleAddReport = (newReport: any) => {
    let lat = (Math.random() - 0.5) * 160;
    let lng = (Math.random() - 0.5) * 360;

    if (newReport.location && newReport.location.includes('Picked GeoCoords')) {
      const match = newReport.location.match(/Picked GeoCoords \(([^,]+),\s*([^)]+)\)/);
      if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
      }
    }

    setReports([{ ...newReport, lat, lng }, ...reports]);
  };

  const handleMapCoordinatePick = (lat: number, lng: number) => {
    setPickedLocation(`Picked GeoCoords (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
  };

  if (!currentUser) {
    return (
      <AuthPage
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setActiveTab('launchpad');
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileSimulator={isMobileSimulator}
        setIsMobileSimulator={setIsMobileSimulator}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenResourcesModal={() => setIsResourcesModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* ✅ FIXED: Emergency Alert Banner wraps properly on mobile */}
      <div style={{
        background: '#fef2f2',
        borderBottom: '1px solid #fecaca',
        padding: '0.6rem 1rem',
        color: '#991b1b',
        fontSize: '0.85rem',
        fontWeight: 600,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          flex: 1,
          minWidth: 0
        }}>
          <ShieldAlert
            size={16}
            style={{ flexShrink: 0, marginTop: 2 }}
            className="text-red-600 animate-pulse"
          />
          <span style={{ lineHeight: 1.4 }}>
            Active Emergency Alert: Wildfire Watch & Air Quality Advisory in Ward 2 (North Hills). 15 Active Responders Dispatched.
          </span>
        </div>
        <button
          className="btn-sustaira"
          style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', background: '#dc2626', flexShrink: 0 }}
          onClick={() => setIsReportModalOpen(true)}
        >
          Dispatch Hazard Alert
        </button>
      </div>

      {/* ✅ FIXED: overflowX hidden prevents horizontal side-scroll on mobile */}
      <main className="main-content" style={{ overflowX: 'hidden' }}>
        {isMobileSimulator ? (
          <MobileFrameWrapper
            onOpenReportModal={() => setIsReportModalOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {activeTab === 'world_map' ? (
              <WorldMapView
                reports={reports}
                onSelectCoordinates={handleMapCoordinatePick}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            ) : activeTab === 'profile' ? (
              <ProfileView
                currentUser={currentUser}
                reports={reports}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                onLogout={() => setCurrentUser(null)}
              />
            ) : (
              <MobileAnalyticsDashboard />
            )}
          </MobileFrameWrapper>
        ) : (
          <>
            {activeTab === 'world_map' ? (
              <WorldMapView
                reports={reports}
                onSelectCoordinates={handleMapCoordinatePick}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            ) : activeTab === 'rewards' ? (
              <RewardsView currentUser={currentUser} />
            ) : (
              <SustairaDashboard
                reports={reports}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                activeTab={activeTab}
              />
            )}
          </>
        )}
      </main>

      <NewReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleAddReport}
        initialLocation={pickedLocation}
      />

      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
      />
    </div>
  );
}

export default App;