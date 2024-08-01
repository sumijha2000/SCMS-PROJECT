// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import Footer from '../Common/UserFooter';

// import Navbar from '../Common/UserNavbar';

// import '../../styles/PickupOrdermanager.css'; // Import the CSS file for PickupOrdermanager styling
// import UserSidebar from '../Common/UserSidebar';

// const PickupOrdermanager = () => {
//   const [orderId, setOrderId] = useState('');
//   const [status, setStatus] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Construct the JSON payload as per API requirements
//     const payload = {
//       eventID: "1001",
//       addInfo: {
//         id: parseInt(orderId), // Ensure ID is an integer
//         status: status
//       }
//     };

//     fetch('http://localhost:5164/updateorderstatus', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Order status updated:', data);
//         alert('Order status updated successfully!');
//         // Redirect to the order list page after successful update
//         navigate('/manager/order-list');
//       })
//       .catch(error => {
//         console.error('Error updating order status:', error);
//         alert('Failed to update order status. Please try again.');
//       });
//   };

//   return (
//     <div className="pickup-order-page">
//       <Navbar profileName="Manager" />
//       <div className="content-wrapper">
//         <UserSidebar role="manager" />
//         <main className="pickup-order-container">
//           <h2>Pickup Order</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="number"
//               placeholder="Order ID"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value)}
//               required
//             />
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="pickup">Pickup</option>
//               <option value="not-available">Not Available</option>
//             </select>
//             <button type="submit">Update Status</button>
//           </form>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PickupOrdermanager;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Footer from '../Common/UserFooter';
import Navbar from '../Common/UserNavbar';

import '../../styles/PickupOrdermanager.css'; // Import the CSS file for PickupOrdermanager styling
import UserSidebar from '../Common/UserSidebar';

const PickupOrdermanager = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the JSON payload as per API requirements
    const payload = {
      eventID: "1001",
      addInfo: {
        id: parseInt(orderId), // Ensure ID is an integer
        status: status
      }
    };

    fetch('http://localhost:5164/updateorderstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order status updated:', data);
        alert('Order status updated successfully!');
        // Redirect to the order list page after successful update
        navigate('/manager/order-list');
      })
      .catch(error => {
        console.error('Error updating order status:', error);
        alert('Failed to update order status. Please try again.');
      });
  };

  return (
    <div className="pickup-order-page">
      <Navbar profileName="Manager" />
      <div className="content-wrapper">
      <UserSidebar role="manager"/>
        <main className="pickup-order-container">
          <h2 className="page-title">Update Pickup Order</h2>
          <form className="pickup-order-form" onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="form-input"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Select Status</option>
              <option value="pickup">Pickup</option>
              <option value="not-available">Not Available</option>
            </select>
            <button type="submit" className="form-button">Update Status</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PickupOrdermanager;
