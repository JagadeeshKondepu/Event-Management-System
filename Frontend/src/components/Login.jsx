import { useState } from 'react';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginType, setLoginType] = useState('user');
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    businessName: '',
    businessType: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { username: formData.username, password: formData.password, loginType }
        : { ...formData, role: userType };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok) {
        setError('');
        onLogin(data.user, data.token);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const renderSignupForm = () => {
    switch (userType) {
      case 'admin':
        return (
          <div className="blue-form">
            <input 
              type="text" 
              placeholder="Admin Full Name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
            <input 
              type="email" 
              placeholder="Admin Email Address" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
            <input 
              type="password" 
              placeholder="Create Admin Password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Admin Category</option>
              <option value="catering">Catering Manager</option>
              <option value="florist">Florist Manager</option>
              <option value="decoration">Decoration Manager</option>
              <option value="lighting">Lighting Manager</option>
              <option value="general">General Admin</option>
            </select>
            <button type="submit" className="signup-btn">Create Admin Account</button>
          </div>
        );
      
      case 'vendor':
        return (
          <div className="blue-form">
            <input 
              type="text" 
              placeholder="Vendor Name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder="Business Name" 
              value={formData.businessName} 
              onChange={(e) => setFormData({...formData, businessName: e.target.value})} 
            />
            <input 
              type="email" 
              placeholder="Business Email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
            <input 
              type="password" 
              placeholder="Create Vendor Password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
            <input 
              type="tel" 
              placeholder="Contact Number" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              required
            >
              <option value="">Select Business Category</option>
              <option value="catering">Catering Services</option>
              <option value="florist">Florist Services</option>
              <option value="decoration">Decoration Services</option>
              <option value="lighting">Lighting Services</option>
            </select>
            <textarea 
              placeholder="Business Address" 
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
            />
            <button type="submit" className="signup-btn">Create Vendor Account</button>
          </div>
        );
      
      default: // user
        return (
          <div className="blue-form">
            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Create Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            <input type="tel" placeholder="Phone Number (Optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <textarea placeholder="Address (Optional)" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            <button type="submit" className="signup-btn">Create User Account</button>
          </div>
        );
    }
  };

  const renderLoginForm = () => {
    const placeholders = {
      user: { username: 'Username or Email', password: 'Password' },
      admin: { username: 'Admin Username', password: 'Admin Password' },
      vendor: { username: 'Vendor Username', password: 'Vendor Password' }
    };

    return (
      <div className="blue-form">
        <div className="login-type-selector">
          <label>Login as:</label>
          <div className="login-type-buttons">
            <button type="button" className={loginType === 'user' ? 'active' : ''} onClick={() => setLoginType('user')}>👤 User</button>
            <button type="button" className={loginType === 'admin' ? 'active' : ''} onClick={() => setLoginType('admin')}>⚙️ Admin</button>
            <button type="button" className={loginType === 'vendor' ? 'active' : ''} onClick={() => setLoginType('vendor')}>🏪 Vendor</button>
          </div>
        </div>
        <input
          type="text"
          placeholder={placeholders[loginType].username}
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder={placeholders[loginType].password}
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? 'Processing...' : `Login as ${loginType.charAt(0).toUpperCase() + loginType.slice(1)}`}
        </button>
      </div>
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          <h1>Event Management System</h1>
          <p>Your complete solution for event planning and management</p>
        </div>
        <div className="auth-illustration">
          🎉
        </div>
        <div style={{ textAlign: 'center', opacity: 0.8 }}>
          <p>Manage events, vendors, and customers all in one place</p>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Sign in to your account' : 'Join our platform today'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {isLogin ? renderLoginForm() : renderSignupForm()}
            {error && <div className="error-message">{error}</div>}
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up here' : 'Login here'}
              </span>
            </p>
            {!isLogin && (
              <div className="user-type-tabs">
                <button type="button" className={userType === 'user' ? 'active' : ''} onClick={() => setUserType('user')}>User SignUp</button>
                <button type="button" className={userType === 'admin' ? 'active' : ''} onClick={() => setUserType('admin')}>Admin Signup</button>
                <button type="button" className={userType === 'vendor' ? 'active' : ''} onClick={() => setUserType('vendor')}>Vendor</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;