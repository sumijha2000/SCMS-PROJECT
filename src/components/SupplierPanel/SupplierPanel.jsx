import React, { useEffect } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/supplier.css';
import { useNavigate } from 'react-router-dom';
import SupplierTransactionChart from '../Charts/SupplierTransactionChart';

const SupplierPanel = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/'); // Redirect to homepage if no token is found
      return;
    }
  }, [token, navigate]);

  return (
    <div className="supplier-panel-container">
      <Navbar profileName="Supplier" />
      <div className="supplier-content-wrapper">
        <Sidebar role="supplier" />
        <main className="supplier-main-content">
          <h2 className="supplier-dashboard-heading">Supplier Dashboard</h2>
          <div className="dashboard-summary">
            <p>Welcome to the Supplier Dashboard!</p>
          </div>
          <div className="charts-wrapper">
            <div className="chart-container">
              <SupplierTransactionChart />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SupplierPanel;
