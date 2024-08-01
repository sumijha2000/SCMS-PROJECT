import React, { useEffect } from 'react';

import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import '../../styles/Reports.css';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
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
    <div className="reports-container">
      <Navbar />
      <div className="reports-content">
        <Sidebar />
        <main className="main-content">
          <h2>Reports</h2>
         
        </main>
      </div>

    </div>
  );
};

export default Reports;
