

// Enhanced AdminLogin.js - Updated button color
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'Apexiums' && credentials.password === 'apexium3841') {
      onLogin();
      navigate('/admin'); // Redirect after login
    } else {
      alert('Invalid admin credentials.');
    }
  };

  return (
    <div className="admin-login-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8f9fa'
    }}>
      <div className="login-container" style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            />
          </div>
          <button 
            type="submit" 
            style={{
              width: '100%',
              background: '#49aea2',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;