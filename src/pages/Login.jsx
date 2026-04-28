import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        }}>Welcome Back</h2>

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

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{
                color: '#4b2e2e',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'none',
                transition: '0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
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