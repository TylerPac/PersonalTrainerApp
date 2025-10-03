import { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin, onNavigateToRegister, onNavigateToWelcome }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await onLogin(formData.username, formData.password);

    if (!result.success) setError(result.error || 'Login failed');
    setLoading(false);
  };

  return (
        
    <div className="login-container">
    
      <button className="back-link" onClick={onNavigateToWelcome}>← Back to Welcome</button>
      <div className="login-card">
        
        <div className="login-header">
          <div className="app-title">Personal Trainer App</div>
          <div className="page-title">Welcome Back</div>
          <p className="page-subtitle">Sign in to continue your fitness journey</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ width: '100%' }}>
            <label className="form-label">Username</label>
            <input
              className="text-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />

            <label className="form-label" style={{ marginTop: 8 }}>Password</label>
            <input
              className="text-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />

            {error && <div className="error-box">{error}</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <button type="button" className="create-account" onClick={onNavigateToRegister}>
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default LoginPage;