import React, { useState } from 'react';
import { FaTachometerAlt, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/adminNavbar.css';

const AdminNavbar = ({ profileName = 'Admin', onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No token found');
        navigate('/'); // Redirect to homepage if no token is found
        return;
      }

      const payload = {
        eventID: '1001',
        addInfo: {
          TOKEN: token,
        },
      };

      const response = await axios.post('http://localhost:5164/admin/logout', payload);
      console.log(response);

      localStorage.removeItem('token');
      localStorage.removeItem('memail');
      localStorage.removeItem('semail');
      console.log(response.data.rMessage);
      navigate('/'); // Redirect to homepage after successful logout
    } catch (error) {
      console.error('Logout error:', error);
    }

    if (onLogout) onLogout(); // Call the onLogout prop if it is provided
  };

  return (
    <nav className="admin-navbar-container">
      <div className="admin-navbar-content">
        <div className="admin-navbar-title">
          <FaTachometerAlt className="admin-dashboard-icon" />
          <Link to="/admin/dashboard">
            <span className="admin-title-text" style={{color:'white'}}>Admin Panel</span>
          </Link>
        </div>
        <div className="admin-navbar-links">
          <a href="/admin/dashboard" className="admin-navbar-item">Dashboard</a>
          <a href="/admin/reports" className="admin-navbar-item">Reports</a>
        </div>
        <div className="admin-profile-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle className="admin-profile-icon" />
          <span className="admin-profile-name">{profileName}</span>
          <div className={`admin-dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
            <a href="/settings" className="admin-dropdown-item">Settings</a>
            <a href="#" onClick={handleLogout} className="admin-dropdown-item">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
