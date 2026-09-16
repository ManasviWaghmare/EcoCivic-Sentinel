import React, { useState, useEffect } from 'react';
import { X, Flame, ShieldAlert } from 'lucide-react';

interface NewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
  initialLocation?: string;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialLocation = '',
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('FIRE');
  const [urgency, setUrgency] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [location, setLocation] = useState(initialLocation);
  const [reporter, setReporter] = useState('Maggie Burnham');
  const [description, setDescription] = useState('');
  const [impactMetric, setImpactMetric] = useState('25 kg CO2 offset');

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
    }
  }, [initialLocation]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    onSubmit({
      id: String(Date.now()),
      title,
      category,
      urgency,
      location,
      reporter,
      description,
      impactMetric,
      costOrImpact: '$0.00',
      status: urgency === 'CRITICAL' ? 'SUBMITTED' : 'IN_PROGRESS',
      date: new Date().toLocaleDateString(),
    });

    setTitle('');
    setLocation('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
            <ShieldAlert size={22} className="text-red-600" />
            <span>Report Environmental Hazard / Emergency Fire</span>
          </div>
          <button className="btn-outline" style={{ padding: '0.2rem 0.5rem' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label>Report Type / Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="FIRE">Wildfire / Building Fire</option>
              <option value="FLOOD">Urban Flooding / Storm Damage</option>
              <option value="DUMPING">Illegal Waste Dumping</option>
              <option value="POLLUTION">Water / Air Pollution</option>
              <option value="ECO">Community Sustainability Project</option>
            </select>
          </div>

          <div className="form-row">
            <label>Title / Brief Summary</label>
            <input
              type="text"
              placeholder="e.g. Active wildfire outbreak near Ward 2 forest perimeter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-row">
              <label>Urgency Triage Level</label>
              <select value={urgency} onChange={(e) => setUrgency(e.target.value as any)}>
                <option value="CRITICAL">CRITICAL (Immediate Action)</option>
                <option value="HIGH">HIGH (24h Dispatch)</option>
                <option value="MEDIUM">MEDIUM (Standard)</option>
                <option value="LOW">LOW (Informational)</option>
              </select>
            </div>

            <div className="form-row">
              <label>Location / City Ward</label>
              <input
                type="text"
                placeholder="e.g. Ward 2 North Hills, Miles: 12"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label>Reporter Name</label>
            <input
              type="text"
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Estimated Impact / CO₂ Metric</label>
            <input
              type="text"
              placeholder="e.g. 150 kg CO2 / Emergency Hazard Level 4"
              value={impactMetric}
              onChange={(e) => setImpactMetric(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Detailed Description & Emergency Response Notes</label>
            <textarea
              rows={3}
              placeholder="Provide context, visible smoke level, water depth, or affected area..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-sustaira" style={{ background: '#dc2626' }}>
              <Flame size={16} />
              Submit Incident Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
