import React from 'react';
import { PlusCircle, ListChecks } from 'lucide-react';

interface ActionsPageProps {
  onOpenReportModal: () => void;
}

const kpis = [
  {
    title: 'Reduce dependence on non-renewable energy sources',
    subtext: 'Choose a provider generating majority from renewable sources',
    progress: 84,
  },
  {
    title: 'Reduce GHG emissions by 100 MTCO₂e in 2026',
    subtext: 'Curb urban congestion and encourage electric transit',
    progress: 40,
  },
  {
    title: 'Community Fire Hydrant Readiness & Flood Defense',
    subtext: 'Inspect hydrants and plant flood barrier mangroves in Ward 2',
    progress: 59,
  },
];

const actionItems = [
  { item: 'Discuss renewable installation plans with stakeholders', due: '11/29/2026', progress: 40 },
  { item: 'Finalize solar rooftop agreements', due: '12/30/2026', progress: 25 },
  { item: 'Install community fire alarm sirens in Ward 1', due: '12/14/2026', progress: 65 },
];

export const ActionsPage: React.FC<ActionsPageProps> = ({ onOpenReportModal }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Actions</h1>
          <p className="page-subtitle">Sustainability KPIs, volunteer pledges, and preparedness milestones.</p>
        </div>
        <button className="btn-sustaira" onClick={onOpenReportModal}>
          <PlusCircle size={15} />
          Pledge a New Action
        </button>
      </div>

      <div className="dashboard-grid">
        {/* KPI Projects & Initiatives */}
        <div className="dash-card" style={{ gridColumn: 'span 6' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Sustainability & Fire Readiness KPIs</div>
              <div className="dash-card-subtitle">Active community goals and milestone progress</div>
            </div>
          </div>

          <div className="kpi-projects-list">
            {kpis.map((kpi) => (
              <div className="kpi-project-item" key={kpi.title}>
                <div className="kpi-title-row">
                  <span>{kpi.title}</span>
                  <span className="text-emerald-600 font-bold">{kpi.progress}%</span>
                </div>
                <div className="kpi-subtext">{kpi.subtext}</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${kpi.progress}%` }}>{kpi.progress}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items & Preparedness Pledges */}
        <div className="dash-card" style={{ gridColumn: 'span 6' }}>
          <div className="dash-card-header">
            <div>
              <div className="dash-card-title">Action Items & Preparedness Pledges</div>
              <div className="dash-card-subtitle">Volunteer pledges and due dates</div>
            </div>
            <ListChecks size={18} className="text-emerald-500" />
          </div>

          <div className="custom-table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Action Item</th>
                  <th>Due Date</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {actionItems.map((row) => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td>{row.due}</td>
                    <td>
                      <div className="progress-track" style={{ height: 8 }}>
                        <div className="progress-fill" style={{ width: `${row.progress}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
