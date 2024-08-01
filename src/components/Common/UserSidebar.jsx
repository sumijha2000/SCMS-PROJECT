// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../../styles/sidebaruser.css';
// import { FaHome, FaUserPlus, FaBox, FaList, FaShippingFast, FaHistory, FaCheck, FaCogs, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

// const UserSidebar = ({ role }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isLightMode, setIsLightMode] = useState(true);

//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLightModeToggle = () => {
//     setIsLightMode(!isLightMode);
//   };

//   return (
//     <div className={`sidebar-${isLightMode ? 'light' : 'dark'} ${isSidebarOpen ? 'open' : 'closed'}`} >
//       <div className="menu-buttons" style={{background:'black'}}>
//         <button className="menu-button" onClick={handleSidebarToggle}>
//           {isSidebarOpen ? <FaTimes /> : <FaBars />}
//         </button>
//         <button className="mode-button" onClick={handleLightModeToggle}>
//           {isLightMode ? <FaSun /> : <FaMoon />}
//         </button>
//       </div>
//       <div className="sidebar-content">
//         <Link to={role === 'manager' ? '/manager' : '/supplier'}>
//           <h3 className={`sidebar-heading-${isLightMode ? 'light' : 'dark'} ${isSidebarOpen ? 'open' : 'closed'}`}>{role === 'manager' ? 'Manager Panel' : 'Supplier Panel'}</h3>
//         </Link>
//         <ul className={`menu-${isLightMode ? 'light' : 'dark'}`}>
//           {role === 'manager' ? (
//             <>
//               <li>
//                 <Link to="/manager" className="menu-item-light">
//                   <FaHome className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Home</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/create-profile" className="menu-item-light">
//                   <FaUserPlus className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Create Profile</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/add-product" className="menu-item-light">
//                   <FaBox className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Add Product</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/order-list" className="menu-item-light">
//                   <FaList className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Order List</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/pickup-order" className="menu-item-light">
//                   <FaShippingFast className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Pickup Order</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/track-shipment" className="menu-item-light">
//                   <FaCheck className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Track Shipment</span>}
//                 </Link>
//               </li>
            
//               <li>
//                 <Link to="/manager/productlist" className="menu-item-light">
//                   <FaBox className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Product List</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/confirmeddeliveries" className="menu-item-light">
//                   <FaBox className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Confirmed Deliveries</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manager/transaction-history" className="menu-item-light">
//                   <FaHistory className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Transaction History</span>}
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to="/supplier" className="menu-item-light">
//                   <FaHome className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Home</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/supplier/create-profile" className="menu-item-light">
//                   <FaUserPlus className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Create Profile</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/supplier/check-product-availability" className="menu-item-light">
//                   <FaCogs className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Check Product Order List</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/supplier/track-shipment" className="menu-item-light">
//                   <FaCheck className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Track Shipment</span>}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/supplier/transaction-history" className="menu-item-light">
//                   <FaHistory className="icon-light" />
//                   {isSidebarOpen && <span className="menu-text-light">Transaction History</span>}
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserSidebar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebaruser.css';
import { FaHome, FaUserPlus, FaBox, FaList, FaShippingFast, FaHistory, FaCheck, FaCogs, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const UserSidebar = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLightMode, setIsLightMode] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLightModeToggle = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div className={`sidebar ${isLightMode ? 'sidebar-light' : 'sidebar-dark'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="menu-buttons">
        <button className="menu-button" onClick={handleSidebarToggle} style={{color:'grey', }}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <button className="mode-button" onClick={handleLightModeToggle} style={{color:'grey'}}>
          {isLightMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="sidebar-content">
        <Link to={role === 'manager' ? '/manager' : '/supplier'}>
          <h3 className="sidebar-heading">
            {role === 'manager' ? 'Manager Panel' : 'Supplier Panel'}
          </h3>
        </Link>
        <ul className="menu">
          {role === 'manager' ? (
            <>
              <li>
                <Link to="/manager" className="menu-item">
                  <FaHome className="icon" />
                  {isSidebarOpen && <span className="menu-text">Home</span>}
                </Link>
              </li>
              <li>
                <Link to="/manager/create-profile" className="menu-item">
                  <FaUserPlus className="icon" />
                  {isSidebarOpen && <span className="menu-text">Create Profile</span>}
                </Link>
              </li>
              <li>
                <Link to="/manager/add-product" className="menu-item">
                  <FaBox className="icon" />
                  {isSidebarOpen && <span className="menu-text">Add Product</span>}
                </Link>
              </li>
              <li>
                <Link to="/manager/order-list" className="menu-item">
                  <FaList className="icon" />
                  {isSidebarOpen && <span className="menu-text">Order List</span>}
                </Link>
              </li>
              <li>
                <Link to="/manager/pickup-order" className="menu-item">
                  <FaShippingFast className="icon" />
                  {isSidebarOpen && <span className="menu-text">Pickup Order</span>}
                </Link>
              </li>
            
              <li>
                <Link to="/manager/productlist" className="menu-item">
                  <FaBox className="icon" />
                  {isSidebarOpen && <span className="menu-text">Product List</span>}
                </Link>
              </li>
              <li>
                <Link to="/manager/confirmeddeliveries" className="menu-item">
                  <FaBox className="icon" />
                  {isSidebarOpen && <span className="menu-text">Confirmed Deliveries</span>}
                </Link>
              </li>
              <li>
                <Link to="/manager/transaction-history" className="menu-item">
                  <FaHistory className="icon" />
                  {isSidebarOpen && <span className="menu-text">Transaction History</span>}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/supplier" className="menu-item">
                  <FaHome className="icon" />
                  {isSidebarOpen && <span className="menu-text">Home</span>}
                </Link>
              </li>
              <li>
                <Link to="/supplier/create-profile" className="menu-item">
                  <FaUserPlus className="icon" />
                  {isSidebarOpen && <span className="menu-text">Create Profile</span>}
                </Link>
              </li>
              <li>
                <Link to="/supplier/check-product-availability" className="menu-item">
                  <FaCogs className="icon" />
                  {isSidebarOpen && <span className="menu-text">Check Product Order List</span>}
                </Link>
              </li>
              <li>
                <Link to="/supplier/track-shipment" className="menu-item">
                  <FaCheck className="icon" />
                  {isSidebarOpen && <span className="menu-text">Track Shipment</span>}
                </Link>
              </li>
              <li>
                <Link to="/supplier/transaction-history" className="menu-item">
                  <FaHistory className="icon" />
                  {isSidebarOpen && <span className="menu-text">Transaction History</span>}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
