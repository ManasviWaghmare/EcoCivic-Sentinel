import React, { useState } from 'react';
import { Trees, ShieldAlert, User as UserIcon, ArrowRight, Flame, Droplets, Leaf, Factory, Trash2 } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (user: { email: string; name: string; role: 'CITIZEN' | 'AUTHORITY' }) => void;
}

const interests = [
  { label: 'Fire & Rescue', icon: Flame },
  { label: 'Flood Response', icon: Droplets },
  { label: 'Eco Initiatives', icon: Leaf },
  { label: 'Air Pollution', icon: Factory },
  { label: 'Illegal Dumping', icon: Trash2 },
];

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'CITIZEN' | 'AUTHORITY'>('CITIZEN');
  const [error, setError] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const handleQuickLogin = (userRole: 'AUTHORITY' | 'CITIZEN') => {
    if (userRole === 'AUTHORITY') {
      onLoginSuccess({
        email: 'authority@city.gov',
        name: 'City Authority Dispatcher',
        role: 'AUTHORITY',
      });
    } else {
      onLoginSuccess({
        email: 'citizen@city.gov',
        name: 'Maggie Burnham (Citizen)',
        role: 'CITIZEN',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }

    onLoginSuccess({
      email,
      name: name || (email.split('@')[0]),
      role: mode === 'register' ? role : (email.includes('authority') ? 'AUTHORITY' : 'CITIZEN'),
    });
  };

  // Styles
  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #020a13 0%, #081b2a 30%, #0a1628 60%, #030d1a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const bgGlowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(0, 230, 200, 0.06) 0%, transparent 60%)',
    pointerEvents: 'none',
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '520px',
    background: 'rgba(8, 18, 32, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(0, 200, 180, 0.15)',
    boxShadow: '0 0 60px rgba(0, 200, 180, 0.05), 0 20px 60px rgba(0, 0, 0, 0.5)',
    padding: '2.25rem',
    position: 'relative' as const,
    zIndex: 1,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Outfit', 'Inter', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    textAlign: 'center' as const,
    marginBottom: '0.25rem',
    color: '#e2e8f0',
  };

  const gradientTitleStyle: React.CSSProperties = {
    fontFamily: "'Outfit', 'Inter', sans-serif",
    fontSize: '1.7rem',
    fontWeight: 800,
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    background: 'linear-gradient(90deg, #00e6c8, #38bdf8, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.04em',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#00d4b8',
    marginBottom: '0.4rem',
    display: 'block',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.7rem 0.9rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(0, 200, 180, 0.2)',
    borderRadius: '10px',
    color: '#e2e8f0',
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(0, 230, 200, 0.5)';
    e.target.style.boxShadow = '0 0 16px rgba(0, 230, 200, 0.1)';
  };

  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(0, 200, 180, 0.2)';
    e.target.style.boxShadow = 'none';
  };

  const gridRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const singleRowStyle: React.CSSProperties = {
    marginBottom: '1rem',
  };

  const submitBtnStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1.5rem',
    background: 'linear-gradient(90deg, #00c9b0, #0ea5e9)',
    border: 'none',
    borderRadius: '12px',
    color: '#020a13',
    fontSize: '0.95rem',
    fontWeight: 800,
    fontFamily: "'Outfit', 'Inter', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.75rem',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 0 30px rgba(0, 200, 180, 0.2)',
  };

  const tabBtnStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '0.65rem',
    background: 'none',
    border: 'none',
    borderBottom: isActive ? '2px solid #00d4b8' : '2px solid transparent',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? '#00d4b8' : '#64748b',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.04em',
    transition: 'color 0.25s ease, border-color 0.25s ease',
  });

  const quickDemoStyle: React.CSSProperties = {
    background: 'rgba(0, 200, 180, 0.04)',
    border: '1px solid rgba(0, 200, 180, 0.12)',
    borderRadius: '14px',
    padding: '1rem',
    marginBottom: '1.5rem',
  };

  const quickDemoLabelStyle: React.CSSProperties = {
    fontSize: '0.65rem',
    fontWeight: 700,
    color: '#64748b',
    textAlign: 'center' as const,
    marginBottom: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
  };

  const quickBtnBase: React.CSSProperties = {
    padding: '0.5rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.78rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  };

  const chipStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.35rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: isSelected ? '1px solid #00d4b8' : '1px solid rgba(100, 116, 139, 0.3)',
    background: isSelected ? 'rgba(0, 212, 184, 0.1)' : 'transparent',
    color: isSelected ? '#00d4b8' : '#94a3b8',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', sans-serif",
  });

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    paddingRight: '2rem',
  };

  return (
    <div style={pageStyle}>
      {/* Background glow effects */}
      <div style={bgGlowStyle} />
      <div style={{ ...bgGlowStyle, top: '60%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)' }} />

      {/* Floating particles decoration */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: '3px', height: '3px', borderRadius: '50%', background: '#00d4b8', opacity: 0.4, animation: 'floatBounce 6s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', top: '70%', right: '15%', width: '2px', height: '2px', borderRadius: '50%', background: '#38bdf8', opacity: 0.3, animation: 'floatBounce 8s ease-in-out infinite alternate-reverse' }} />
      <div style={{ position: 'absolute', top: '40%', right: '8%', width: '4px', height: '4px', borderRadius: '50%', background: '#a78bfa', opacity: 0.25, animation: 'floatBounce 5s ease-in-out infinite alternate' }} />

      <div style={cardStyle}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00c9b0, #0ea5e9)',
              color: '#020a13',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 0 30px rgba(0, 200, 180, 0.25)',
            }}
          >
            <Trees size={28} />
          </div>
          <div style={titleStyle}>EcoCivic Sentinel</div>
          <div style={gradientTitleStyle}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </div>
        </div>

        {/* Quick Demo Section */}
        <div style={quickDemoStyle}>
          <div style={quickDemoLabelStyle}>Quick Demo Access</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              style={{ ...quickBtnBase, background: 'rgba(0, 200, 180, 0.12)', color: '#00d4b8', border: '1px solid rgba(0, 200, 180, 0.25)' }}
              onClick={() => handleQuickLogin('CITIZEN')}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 200, 180, 0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <UserIcon size={14} />
              Login Citizen
            </button>
            <button
              type="button"
              style={{ ...quickBtnBase, background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.25)' }}
              onClick={() => handleQuickLogin('AUTHORITY')}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <ShieldAlert size={14} />
              Login Authority
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0, 200, 180, 0.2), transparent)', marginBottom: '1.25rem' }} />

        {/* Auth Tabs */}
        <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
          <button type="button" style={tabBtnStyle(mode === 'login')} onClick={() => setMode('login')}>
            Sign In
          </button>
          <button type="button" style={tabBtnStyle(mode === 'register')} onClick={() => setMode('register')}>
            Register Account
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '0.65rem 0.9rem',
            color: '#f87171',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              {/* Full Name + Account Role side by side */}
              <div style={gridRowStyle}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Account Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    style={selectStyle}
                    onFocus={inputFocusHandler as any}
                    onBlur={inputBlurHandler as any}
                  >
                    <option value="CITIZEN">Citizen Reporter</option>
                    <option value="AUTHORITY">City Authority</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Email + Password side by side */}
          <div style={gridRowStyle}>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Password *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div style={singleRowStyle}>
              <label style={labelStyle}>Areas of Interest</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                {interests.map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedInterests.includes(item.label);
                  return (
                    <button
                      type="button"
                      key={item.label}
                      style={chipStyle(isActive)}
                      onClick={() => toggleInterest(item.label)}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = 'rgba(0, 212, 184, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                      }}
                    >
                      <Icon size={13} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="submit"
            style={submitBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 200, 180, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 200, 180, 0.2)';
            }}
          >
            <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Register Now'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer hint */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.78rem', color: '#64748b' }}>
          {mode === 'login' ? (
            <>
              <span>Demo credentials: </span>
              <span style={{ color: '#00d4b8', fontWeight: 600 }}>authority@city.gov</span>
              <span> / </span>
              <span style={{ color: '#00d4b8', fontWeight: 600 }}>authority123</span>
            </>
          ) : (
            <span style={{ color: '#94a3b8' }}>
              Your data stays local — this is a demo platform.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
