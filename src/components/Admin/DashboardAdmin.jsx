

// import React, { useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import OrderChart from '../Charts/OrderChart';
// import UserRoleChart from '../Charts/UserRoleChart';
// import TransactionChart from '../Charts/TransactionChart';
// import Navbar from '../Common/Navbar';
// import Sidebar from '../Common/Sidebar';
// import '../../styles/DashboardAdmin.css';
// import SupplierTransactionChart from '../Charts/SupplierTransactionChart';
// // import OrdersChart from '../Charts/OrdersChart';

// const DashboardAdmin = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       console.log('No token found');
//       navigate('/');
//     }
//   }, [token, navigate]);

//   return (
//     <div className="dashboard-container">
//       <Navbar />
//       <div className="dashboard-content">
//         <Sidebar />
//         <main className="main-content">
//           <h2>Admin Dashboard</h2>
//           <div className="stats-cards">
//             <div className="card purple">
//               <h3>354+ Users</h3>
//             </div>
//             <div className="card blue">
//               <h3>50,000 Visits</h3>
//             </div>
//             <div className="card orange">
//               <h3>2.49% Conversion Rate</h3>
//             </div>
//             <div className="card red">
//               <h3>44k Sales</h3>
//             </div>
//           </div>
//           <div className="charts-container">
//             <div className="chart-item">
//               <OrderChart />
//             </div>
//             {/* <div className="chart-item">
//               <OrdersChart />
//             </div> */}
//             <div className="chart-item">
//               <UserRoleChart />
//             </div>
        
//             <div className="chart-item">
//               <TransactionChart />
//             </div>
          
//             <div className="chart-item">
//               <SupplierTransactionChart />
//             </div>
//           </div>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardAdmin;




import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import OrderChart from '../Charts/OrderChart';
import UserRoleChart from '../Charts/UserRoleChart';
import TransactionChart from '../Charts/TransactionChart';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import '../../styles/DashboardAdmin.css';
import SupplierTransactionChart from '../Charts/SupplierTransactionChart';
// import OrdersChart from '../Charts/OrdersChart';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userCount, setUserCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:5164/totalusersservice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token if required
          },
          body: JSON.stringify({ eventID: '1001', addInfo: {} }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.rData && data.rData.totalCount) {
          setUserCount(data.rData.totalCount);
        } else {
          setError('Failed to fetch user count.');
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchUserCount();
  }, [token]);
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h2>Admin Dashboard</h2>
          <div className="stats-cards">
            <div className="card purple">
            <h3>{userCount !== null ? `${userCount}+ Users` : 'Loading Users...'}</h3>
            {error && <p className="error-message">{error}</p>}
            </div>
           
            <div className="card red">
              <h3>0k Sales</h3>
            </div>
          </div>
          <div className="charts-container">
            <div className="chart-item">
              <OrderChart />
            </div>
           
            <div className="chart-item">
              <UserRoleChart />
            </div>
        
            <div className="chart-item">
              <TransactionChart />
            </div>
          
            <div className="chart-item">
              <SupplierTransactionChart />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
