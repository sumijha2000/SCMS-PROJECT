// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   FaHome,
//   FaUser,
//   FaCog,
//   FaClipboardList,
//   FaChartLine,
//   FaAlignLeft,
//   FaChevronDown,
//   FaChevronUp,
//   FaMoon,
//   FaSun,
//   FaSignOutAlt,
// } from 'react-icons/fa';
// import '../../styles/adminSidebar.css';

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       console.log('No token found');
//       navigate('/');
//     }
//   }, [token, navigate]);

//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isUserManagementExpanded, setIsUserManagementExpanded] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleSidebarToggle = () => {
//     setIsSidebarCollapsed(!isSidebarCollapsed);
//   };

//   const handleUserManagementToggle = () => {
//     setIsUserManagementExpanded(!isUserManagementExpanded);
//   };

//   const handleDarkModeToggle = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
//       <button className="admin-sidebar-toggle" onClick={handleSidebarToggle}>
//         <FaAlignLeft />
//       </button>
//       <div className="admin-sidebar-header">
//         <h2 className={`admin-sidebar-title ${isSidebarCollapsed ? 'hidden' : ''}`}>Admin Panel</h2>
//       </div>
//       <ul className="admin-sidebar-menu">
//         <li className="admin-sidebar-item">
//           <Link to="/admin/dashboard" className="admin-sidebar-link">
//             <FaHome className="admin-sidebar-icon" />
//             <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Dashboard</span>
//           </Link>
//         </li>
//         <li className="admin-sidebar-item">
//           <Link to="/admin/create-user" className="admin-sidebar-link">
//             <FaUser className="admin-sidebar-icon" />
//             <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Create User</span>
//           </Link>
//         </li>
//         <li className="admin-sidebar-item">
//           <button onClick={handleUserManagementToggle} className="admin-sidebar-dropdown">
//             <FaCog className="admin-sidebar-icon" />
//             <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>User Management</span>
//             {isUserManagementExpanded ? <FaChevronUp /> : <FaChevronDown />}
//           </button>
//           {isUserManagementExpanded && (
//             <ul className="admin-sidebar-submenu">
//               <li className="admin-sidebar-subitem">
//                 <Link to="/admin/user-management/view-supplier" className="admin-sidebar-sublink">Supplier List</Link>
//               </li>
//               <li className="admin-sidebar-subitem">
//                 <Link to="/admin/user-management/suppliers-profile" className="admin-sidebar-sublink">Supplier Profiles</Link>
//               </li>
//               <li className="admin-sidebar-subitem">
//                 <Link to="/admin/user-management/view-manager" className="admin-sidebar-sublink">Manager List</Link>
//               </li>
//               <li className="admin-sidebar-subitem">
//                 <Link to="/admin/user-management/manager-profile" className="admin-sidebar-sublink">Manager Profiles</Link>
//               </li>
//             </ul>
//           )}
//         </li>
//         <li className="admin-sidebar-item">
//           <Link to="/admin/orders-form" className="admin-sidebar-link">
//             <FaClipboardList className="admin-sidebar-icon" />
//             <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Create Order</span>
//           </Link>
//         </li>
//         <li className="admin-sidebar-item">
//           <Link to="/admin/reports" className="admin-sidebar-link">
//             <FaChartLine className="admin-sidebar-icon" />
//             <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Reports</span>
//           </Link>
//         </li>
//       </ul>
//       <div className="admin-sidebar-footer">
//         <button className="admin-sidebar-mode-toggle" onClick={handleDarkModeToggle}>
//           {isDarkMode ? <FaSun className="admin-mode-icon" /> : <FaMoon className="admin-mode-icon" />}
//         </button>
//         <button className="admin-sidebar-logout" onClick={handleLogout}>
//           <FaSignOutAlt className="admin-logout-icon" />
//           <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaCog,
  FaClipboardList,
  FaChartLine,
  FaAlignLeft,
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from 'react-icons/fa';
import '../../styles/adminSidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/');
    }
  }, [token, navigate]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserManagementExpanded, setIsUserManagementExpanded] = useState(false);
  const [isReportsExpanded, setIsReportsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleUserManagementToggle = () => {
    setIsUserManagementExpanded(!isUserManagementExpanded);
  };

  const handleReportsToggle = () => {
    setIsReportsExpanded(!isReportsExpanded);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="admin-sidebar-toggle" onClick={handleSidebarToggle}>
        <FaAlignLeft />
      </button>
      <div className="admin-sidebar-header">
        <h2 className={`admin-sidebar-title ${isSidebarCollapsed ? 'hidden' : ''}`}>Admin Panel</h2>
      </div>
      <ul className="admin-sidebar-menu">
        <li className="admin-sidebar-item">
          <Link to="/admin/dashboard" className="admin-sidebar-link">
            <FaHome className="admin-sidebar-icon" />
            <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Dashboard</span>
          </Link>
        </li>
        <li className="admin-sidebar-item">
          <Link to="/admin/create-user" className="admin-sidebar-link">
            <FaUser className="admin-sidebar-icon" />
            <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Create User</span>
          </Link>
        </li>
        <li className="admin-sidebar-item">
          <Link to="/admin/orders-form" className="admin-sidebar-link">
            <FaClipboardList className="admin-sidebar-icon" />
            <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Create Order</span>
          </Link>
        </li>
       
   
        <li className="admin-sidebar-item">
          <button onClick={handleUserManagementToggle} className="admin-sidebar-dropdown">
            <FaCog className="admin-sidebar-icon" />
            <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>User Management</span>
            {isUserManagementExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isUserManagementExpanded && (
            <ul className="admin-sidebar-submenu">
              <li className="admin-sidebar-subitem">
                <Link to="/admin/user-management/view-supplier" className="admin-sidebar-sublink">Supplier List</Link>
              </li>
              <li className="admin-sidebar-subitem">
                <Link to="/admin/user-management/suppliers-profile" className="admin-sidebar-sublink">Supplier Profiles</Link>
              </li>
              <li className="admin-sidebar-subitem">
                <Link to="/admin/user-management/view-manager" className="admin-sidebar-sublink">Manager List</Link>
              </li>
              <li className="admin-sidebar-subitem">
                <Link to="/admin/user-management/manager-profile" className="admin-sidebar-sublink">Manager Profiles</Link>
              </li>
            </ul>
          )}
        </li>
        
        <li className="admin-sidebar-item">
          <button onClick={handleReportsToggle} className="admin-sidebar-dropdown">
            <FaChartLine className="admin-sidebar-icon" />
            <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Reports</span>
            {isReportsExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isReportsExpanded && (
            <ul className="admin-sidebar-submenu">
              <li className="admin-sidebar-subitem">
                <Link to="/manager/transaction-history" className="admin-sidebar-sublink">Manager Transaction History</Link>
              </li>
              <li className="admin-sidebar-subitem">
                <Link to="/supplier/transaction-history" className="admin-sidebar-sublink">Supplier Transaction History</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-mode-toggle" onClick={handleDarkModeToggle}>
          {isDarkMode ? <FaSun className="admin-mode-icon" /> : <FaMoon className="admin-mode-icon" />}
        </button>
        <button className="admin-sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt className="admin-logout-icon" />
          <span className={`admin-sidebar-text ${isSidebarCollapsed ? 'hidden' : ''}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
