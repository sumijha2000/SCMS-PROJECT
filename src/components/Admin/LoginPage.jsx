import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/LoginPage.css';
import { FaUser, FaUserCog, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      setError('Please select a role.');
      return;
    }

    try {
      let apiUrl = '';
      let requestData = {};

      if (role === 'admin') {
        apiUrl = 'http://localhost:5164/admin/login';
        requestData = {
          Username: username,
          Password: password,
        };
      } else {
        apiUrl = 'http://localhost:5164/signin';
        requestData = {
          addInfo: {
            email: username,
            password: password,
            role: role,
          },
        };
      }

      const response = await axios.post(apiUrl, requestData);
      console.log('API response:', response.data); // Debugging statement

      if (role === 'admin') {
        const { token } = response.data;
        console.log('Admin token:', token); // Debugging statement
        if (token) {
          localStorage.setItem('token', token);
          window.location.href = "/admin/dashboard";
        } else {
          setError('Login failed.');
        }
      } else {
        const { rData } = response.data;
        console.log('Manager/Supplier rData:', rData); // Debugging statement
        if (rData && rData.TOKEN) {
          localStorage.setItem('token', rData.TOKEN);

          if (role === 'manager') {
            window.location.href = "/manager";
            localStorage.setItem('memail', username);
          } else if (role === 'supplier') {
            window.location.href = "/supplier";
            localStorage.setItem('semail', username);
          }
        } else {
          setError(rData ? rData.rMessage : 'Login failed.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials or server error.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Company Login</h2>
        <div className="role-selection">
          <button
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setRole('admin');
              setIsAdmin(true);
            }}
          >
            <FaUserShield className="role-icon" />
            <span>Admin</span>
          </button>
          <button
            className={`role-btn ${role === 'manager' ? 'active' : ''}`}
            onClick={() => {
              setRole('manager');
              setIsAdmin(false);
            }}
          >
            <FaUserCog className="role-icon" />
            <span>Manager</span>
          </button>
          <button
            className={`role-btn ${role === 'supplier' ? 'active' : ''}`}
            onClick={() => {
              setRole('supplier');
              setIsAdmin(false);
            }}
          >
            <FaUser className="role-icon" />
            <span>Supplier</span>
          </button>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">{isAdmin ? 'Username' : 'Email'}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash className="icon-eye" /> : <FaEye className="icon-eye" />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
