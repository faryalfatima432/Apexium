
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect to dashboard if admin is already logged in
  // Block access if regular user is logged in
  useEffect(() => {
    const admin =
      JSON.parse(localStorage.getItem('admin')) ||
      JSON.parse(sessionStorage.getItem('admin'));
    const userToken = localStorage.getItem('token');

    if (admin?.isAdmin) {
      navigate('/admin/dashboard');
    } else if (userToken) {
      // Regular user is logged in, block admin login
      alert('You are logged in as a regular user. Please logout first to access admin login.');
      navigate('/');
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await API.post('/users/login', {
        email: credentials.email,
        password: credentials.password
      });

      if (!data.isAdmin) {
        setError('Not an admin account');
        setLoading(false);
        return;
      }

      const admin = {
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: data.token,
      };

      // Clear any regular user session when admin logs in
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');

      if (credentials.rememberMe) {
        localStorage.setItem('admin', JSON.stringify(admin));
      } else {
        sessionStorage.setItem('admin', JSON.stringify(admin));
      }

      onLogin();
      navigate('/admin/dashboard');

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid credentials or connection error. Please try again.';
      setError(errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e0e0e0 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 5vw, 2.5rem)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.12)';
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#4b2e2e',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          fontWeight: '600'
        }}>Admin Login</h2>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px 15px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '14px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '16px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.3s',
              boxSizing: 'border-box'
            }}
            onFocus={e => {
              e.currentTarget.style.border = '2px solid #4b2e2e';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
            onBlur={e => {
              e.currentTarget.style.border = '2px solid #e0e0e0';
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          />

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                paddingRight: '50px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={e => {
                e.currentTarget.style.border = '2px solid #4b2e2e';
                e.currentTarget.style.backgroundColor = '#fafafa';
              }}
              onBlur={e => {
                e.currentTarget.style.border = '2px solid #e0e0e0';
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4b2e2e',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                padding: '5px'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <input
              type="checkbox"
              checked={credentials.rememberMe}
              onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
              id="rememberMe"
              style={{ 
                marginRight: '10px',
                cursor: 'pointer',
                width: '18px',
                height: '18px'
              }}
            />
            <label htmlFor="rememberMe" style={{ 
              fontSize: '14px', 
              color: '#666',
              cursor: 'pointer',
              fontWeight: '500'
            }}>Remember Me</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#4b2e2e',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(75, 46, 46, 0.2)'
            }}
            onMouseEnter={e => !loading && (e.currentTarget.style.background = '#3b1f1f')}
            onMouseLeave={e => !loading && (e.currentTarget.style.background = '#4b2e2e')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;