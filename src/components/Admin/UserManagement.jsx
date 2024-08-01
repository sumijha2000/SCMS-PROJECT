import React, { useEffect } from 'react';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import '../../styles/UserManagement.css';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();


  const token = localStorage.getItem('token'); // Get token from local storage

 useEffect(() => {
  if (!token) {
    console.log('No token found');
    navigate('/'); // Redirect to homepage if no token is found
    return;
  }
 }, [])
  return (
    <div className="user-management-container">
      <Navbar />
      <div className="user-management-content">
        <Sidebar />
        <main className="main-content">
          <h2>User Management</h2>
          {/* Add table or list to display users */}
          <p>Users will be displayed here.</p>
        </main>
      </div>
   
    </div>
  );
};

export default UserManagement;
