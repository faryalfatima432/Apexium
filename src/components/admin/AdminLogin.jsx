
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

    try {
      const { data } = await API.post('/users/login', {
        email: credentials.email,
        password: credentials.password
      });

      if (!data.isAdmin) {
        alert('Not an admin account');
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
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #f8f9fa, #e0e0e0)'
    }}>
      <div style={{
        background: '#fff',
        padding: '3rem 2rem',
        borderRadius: '12px',
        width: '400px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        transition: 'transform 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#4b2e2e',
          fontFamily: 'Arial, sans-serif'
        }}>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '15px',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.currentTarget.style.border = '1px solid #4b2e2e'}
            onBlur={e => e.currentTarget.style.border = '1px solid #ccc'}
          />

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.2s',
                paddingRight: '45px'
              }}
              onFocus={e => e.currentTarget.style.border = '1px solid #4b2e2e'}
              onBlur={e => e.currentTarget.style.border = '1px solid #ccc'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4b2e2e',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center'
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
              style={{ marginRight: '10px' }}
            />
            <label htmlFor="rememberMe" style={{ fontSize: '14px', color: '#555' }}>Remember Me</label>
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            background: '#4b2e2e', // Dark brown
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'background 0.3s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#3b1f1f'}
            onMouseLeave={e => e.currentTarget.style.background = '#4b2e2e'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;