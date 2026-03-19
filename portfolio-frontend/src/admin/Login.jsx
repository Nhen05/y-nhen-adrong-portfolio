// src/admin/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
import'./Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;

      // Save JWT token
      localStorage.setItem('token', token);

      // Redirect to admin dashboard
      navigate('/admin');

    } catch (err) {
      // Try to get error message from backend
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        color: '#e2e8f0',
      }}
    >
      <div
        style={{
          background: '#1e293b',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          border: '1px solid rgba(59,130,246,0.15)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontWeight: 700,
              color: '#3b82f6',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <FaSignInAlt size={28} />
            Admin Login
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Đăng nhập để quản lý portfolio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.6rem',
                fontWeight: 500,
                color: '#cbd5e1',
              }}
            >
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem 0.9rem 2.8rem',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.6rem',
                fontWeight: 500,
                color: '#cbd5e1',
              }}
            >
              Mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem 0.9rem 2.8rem',
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                color: '#f87171',
                background: 'rgba(248,113,113,0.12)',
                padding: '0.75rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                textAlign: 'center',
                fontSize: '0.9rem',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.95rem',
              background: loading ? '#2563eb88' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1.05rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
            }}
          >
            {loading ? 'Đang đăng nhập...' : (
              <>
                <FaSignInAlt /> Đăng nhập
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;