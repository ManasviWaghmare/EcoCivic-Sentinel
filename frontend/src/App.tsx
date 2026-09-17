import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LaunchpadDashboard } from './components/LaunchpadDashboard';
import { HazardsFiresPage } from './components/HazardsFiresPage';
import { ActionsPage } from './components/ActionsPage';
import { RewardsPage } from './components/RewardsPage';
import { MobileAnalyticsDashboard } from './components/MobileAnalyticsDashboard';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import { NewReportModal } from './components/NewReportModal';
import { AuthPage } from './components/AuthPage';
import { WorldMapView } from './components/WorldMapView';
import { ResourcesModal } from './components/ResourcesModal';
import { WardAnalytics } from './components/WardAnalytics';
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
      impactMetric: '104.58 kg CO\u2082',
      costOrImpact: '$0.18',
      status: 'IN_PROGRESS',
      date: '09/16/2026'
    },
    {
      id: '2',
      reporter: 'Bill Doody',
      category: 'FLOOD',
      title: 'Storm drain blockage & urban street flooding',
      location: 'Logan International Airport to Los Angeles',
      urgency: 'HIGH' as const,
      impactMetric: '809.69 kg CO\u2082',
      costOrImpact: '$12.11',
      status: 'IN_REVIEW',
      date: '09/15/2026'
    },
    {
      id: '3',
      reporter: 'Bill Doody',
      category: 'FIRE',
      title: 'Hotel electrical fire hazard & hydrant inspection needed',
      location: 'Hotel (2 Night(s))',
      urgency: 'HIGH' as const,
      impactMetric: '27.20 kg CO\u2082',
      costOrImpact: '$0.42',
      status: 'IN_PROGRESS',
      date: '09/14/2026'
    },
    {
      id: '4',
      reporter: 'Bill Doody',
      category: 'DUMPING',
      title: 'Illegal hazardous waste dumping along riverbank',
      location: 'Gwadar International Airport To Frankfurt Main',
      urgency: 'MEDIUM' as const,
      impactMetric: '1028.83 kg CO\u2082',
      costOrImpact: '$15.39',
      status: 'SUBMITTED',
      date: '09/12/2026'
    },
    {
      id: '5',
      reporter: 'Vincent de la Mar',
      category: 'POLLUTION',
      title: 'Industrial smog plume & particulate air pollution',
      location: 'Logan International Airport to Amsterdam Schiphol',
      urgency: 'HIGH' as const,
      impactMetric: '107.21 kg CO\u2082',
      costOrImpact: '$14.17',
      status: 'IN_REVIEW',
      date: '09/10/2026'
    },
    {
      id: '6',
      reporter: 'Luke Bashford',
      category: 'ECO',
      title: 'Community mangrove planting & flood defense barrier',
      location: 'Flight | BOS -> DEN',
      urgency: 'LOW' as const,
      impactMetric: '664.46 kg CO\u2082',
      costOrImpact: '$11.46',
      status: 'RESOLVED',
      date: '09/08/2026'
    },
    {
      id: '7',
      reporter: 'Maggie Burnham',
      category: 'ECO',
      title: 'Solar panel microgrid rebate installation in Ward 1',
      location: 'Flight | DEN -> LHR',
      urgency: 'LOW' as const,
      impactMetric: '2895.18 kg CO\u2082',
      costOrImpact: '$26.32',
      status: 'RESOLVED',
      date: '09/05/2026'
    }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleAddReport = (newReport: any) => {
    setReports([newReport, ...reports]);
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

      <div style={{ background: '#fef2f2', borderBottom: '1px solid #fecaca', padding: '0.6rem 1.5rem', color: '#991b1b', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={16} className="text-red-600 animate-pulse" />
          <span>Active Emergency Alert: Wildfire Watch & Air Quality Advisory in Ward 2 (North Hills). 15 Active Responders Dispatched.</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn-sustaira"
            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', background: '#dc2626' }}
            onClick={() => setIsReportModalOpen(true)}
          >
            Dispatch Hazard Alert
          </button>
        </div>
      </div>

      <main className="main-content">
        {isMobileSimulator ? (
          <MobileFrameWrapper>
            <MobileAnalyticsDashboard />
          </MobileFrameWrapper>
        ) : (
          <>
            {activeTab === 'world_map' ? (
              <WorldMapView
                reports={reports}
                onSelectCoordinates={handleMapCoordinatePick}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            ) : activeTab === 'ward_ops' ? (
              <WardAnalytics />
            ) : activeTab === 'reports' ? (
              <HazardsFiresPage
                reports={reports}
                onOpenReportModal={() => setIsReportModalOpen(true)}
              />
            ) : activeTab === 'actions' ? (
              <ActionsPage onOpenReportModal={() => setIsReportModalOpen(true)} />
            ) : activeTab === 'rewards' ? (
              <RewardsPage
                reports={reports}
                currentUserName={currentUser.name}
                currentXp={25}
              />
            ) : (
              <LaunchpadDashboard />
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
