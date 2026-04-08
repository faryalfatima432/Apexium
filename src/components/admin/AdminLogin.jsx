
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api/api'; 

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await API.post('/api/users/login', {
  //       email: credentials.email,
  //       password: credentials.password
  //     });

  //     if (!data.isAdmin) {
  //       alert('Not an admin account');
  //       return;
  //     }

  //     // Store in localStorage or sessionStorage based on "Remember Me"
  //     if (credentials.rememberMe) {
  //       localStorage.setItem('admin', JSON.stringify(data));
  //     } else {
  //       sessionStorage.setItem('admin', JSON.stringify(data));
  //     }

  //     onLogin(); 
  //     navigate('/admin');

  //   } catch (error) {
  //     console.error(error);
  //     alert('Invalid credentials');
  //   }
  // };

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

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              marginBottom: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '15px',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.currentTarget.style.border = '1px solid #4b2e2e'}
            onBlur={e => e.currentTarget.style.border = '1px solid #ccc'}
          />

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