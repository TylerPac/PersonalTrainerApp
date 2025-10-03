import { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = ({ onRegister, onNavigateToLogin, onNavigateToWelcome }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await onRegister(formData.username, formData.email, formData.password);

    if (!result.success) setError(result.error || 'Registration failed');
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="back-link" onClick={onNavigateToWelcome}>← Back to Welcome</button>

        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="page-subtitle">Join and manage clients easily</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="form-label">Username</label>
          <input className="text-input" type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label className="form-label">Email</label>
          <input className="text-input" type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label className="form-label">Password</label>
          <input className="text-input" type="password" name="password" value={formData.password} onChange={handleChange} required />

          {error && <div className="error-box">{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
            <button type="button" className="create-account" onClick={onNavigateToLogin}>Have an account? Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;