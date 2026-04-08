import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUser();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
    
    // Check if admin is logged in
    const admin =
      JSON.parse(localStorage.getItem('admin')) ||
      JSON.parse(sessionStorage.getItem('admin'));

    if (admin?.isAdmin) {
      alert('Please logout from your user account first to access another login');
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const backend_url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${backend_url}/api/users/login`, {
        email,
        password
      });

      localStorage.removeItem('admin');
      sessionStorage.removeItem('admin');
      
      login(res.data, res.data.token);

      // Redirect to checkout or home
      navigate("/checkout");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        }}>Login to Your Account</h2>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              marginBottom: '20px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '15px',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.currentTarget.style.border = '1px solid #4b2e2e'}
            onBlur={e => e.currentTarget.style.border = '1px solid #ccc'}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#4b2e2e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background 0.3s',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => !loading && (e.currentTarget.style.background = '#3b1f1f')}
            onMouseLeave={e => !loading && (e.currentTarget.style.background = '#4b2e2e')}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#666' }}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{
                color: '#4b2e2e',
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline'
              }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;