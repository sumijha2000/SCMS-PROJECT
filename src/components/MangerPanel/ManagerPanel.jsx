// import React, { useEffect } from 'react';
// import Footer from '../Common/UserFooter';
// import Sidebar from '../Common/UserSidebar';
// import Navbar from '../Common/UserNavbar';

// import '../../styles/manager.css';
// import { useNavigate } from 'react-router-dom';
// import TransactionChart from '../Charts/TransactionChart';

// const ManagerPanel = () => {
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token'); // Get token from local storage

//   useEffect(() => {
//     if (!token) {
//       console.log('No token found');
//       navigate('/'); // Redirect to homepage if no token is found
//       return;
//     }
//   }, [token, navigate]);
//   const handleLogout = () => {
//     // Add logout functionality
//   };

//   return (
//     <div className="manager-container">
//       <Navbar profileName="Manager" onLogout={handleLogout} />
//       <div className="manager-content">
//         <Sidebar role="manager" />
//         <main className="main-content" style={{padding:'100px'}}>
//           <h2>Manager Dashboard</h2>
//           <div className="dashboard-summary">
//             {/* Add content or summary statistics for the dashboard */}
//             <p>Welcome to the Manager Dashboard!</p>
//           </div>
//           <div className="charts-container">
            
//             <div className="chart-item">
//               <TransactionChart />
//             </div>
          
            
//           </div>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ManagerPanel;

import React, { useEffect } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/manager.css';
import { useNavigate } from 'react-router-dom';
import TransactionChart from '../Charts/TransactionChart';

const ManagerPanel = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/'); // Redirect to homepage if no token is found
      return;
    }
  }, [token, navigate]);

  const handleLogout = () => {
    // Add logout functionality
  };

  return (
    <div className="manager-panel-container">
      <Navbar profileName="Manager" onLogout={handleLogout} />
      <div className="manager-content-wrapper">
        <Sidebar role="manager" />
        <main className="dashboard-main-content">
          <h2 className="dashboard-heading">Manager Dashboard</h2>
          <div className="dashboard-summary">
            <p>Welcome to the Manager Dashboard!</p>
          </div>
          <div className="charts-wrapper">
            <div className="chart-container">
              <TransactionChart />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerPanel;

