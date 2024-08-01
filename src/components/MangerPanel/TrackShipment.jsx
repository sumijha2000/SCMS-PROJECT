// import React, { useState, useEffect } from 'react';
// import Footer from '../Common/UserFooter';
// import Sidebar from '../Common/UserSidebar';
// import Navbar from '../Common/UserNavbar';
// import '../../styles/TrackShipmentManager.css'; // Import the CSS file for TrackShipmentManager styling
// import { useNavigate, useLocation } from 'react-router-dom';

// const TrackShipmentManager = () => {
//   const [shipmentId, setShipmentId] = useState('');
//   const [status, setStatus] = useState('');
//   const [dateTime, setDateTime] = useState('');
//   const navigate = useNavigate(); 
//   const location = useLocation(); 

//   useEffect(() => {
//     // Extract shipment_id from URL query parameters
//     const queryParams = new URLSearchParams(location.search);
//     const shipmentIdParam = queryParams.get('shipment_id');
    
//     if (shipmentIdParam) {
//       setShipmentId(shipmentIdParam);
//     }
//   }, [location.search]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create the payload to send to the API
//     const payload = {
//       eventID: "1001",
//       addInfo: {
//         shipment_id: shipmentId,
//         tracking_status: status,
//         date: dateTime,
//       }
//     };

//     // Fetch call to update shipment status
//     fetch('http://localhost:5164/updateorderstatusbyshipmentId', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.rStatus === 1) {
//           alert('Shipment status updated successfully!');
//           navigate('/manager/order-list');
//         } else {
//           alert('Failed to update shipment status.');
//         }
//       })
//       .catch(error => {
//         console.error('Error updating shipment status:', error);
//         alert('An error occurred while updating shipment status.');
//       });
//   };

//   return (
//     <div className="track-shipment-manager-page">
//       <Navbar profileName="Manager" />
//       <div className="content-wrapper">
//         <Sidebar role="manager" />
//         <main className="track-shipment-manager-main-content">
//           <div className="track-shipment-manager-container">
//             <h2>Track Shipment</h2>
//             <form onSubmit={handleSubmit} className="track-shipment-manager-form">
//               <input
//                 type="text"
//                 placeholder="Shipment ID"
//                 value={shipmentId}
//                 onChange={(e) => setShipmentId(e.target.value)}
//                 className="track-shipment-manager-input"
//                 required
//                 disabled
//               />
//               <select 
//                 value={status} 
//                 onChange={(e) => setStatus(e.target.value)} 
//                 className="track-shipment-manager-select" 
//                 required
//               >
//                 <option value="">Select Status</option>
//                 <option value="ongoing">Ongoing</option>
//                 <option value="completed">Completed</option>
//               </select>

//               <input
//                 type="datetime-local"
//                 placeholder="Select date and time"
//                 value={dateTime}
//                 onChange={(e) => setDateTime(e.target.value)}
//                 className="track-shipment-manager-input"
//                 required
//               />
//               <button type="submit" className="track-shipment-manager-button">Update Status</button>
//             </form>
//           </div>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TrackShipmentManager;


import React, { useState, useEffect } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/TrackShipmentManager.css'; // Import the CSS file for TrackShipmentManager styling
import { useNavigate, useLocation } from 'react-router-dom';

const TrackShipmentManager = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [status, setStatus] = useState('');
  const [dateTime, setDateTime] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    // Extract shipment_id from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const shipmentIdParam = queryParams.get('shipment_id');
    
    if (shipmentIdParam) {
      setShipmentId(shipmentIdParam);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the payload to send to the API
    const payload = {
      eventID: "1001",
      addInfo: {
        shipment_id: shipmentId,
        tracking_status: status,
        date: dateTime,
      }
    };

    // Fetch call to update shipment status
    fetch('http://localhost:5164/updateorderstatusbyshipmentId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data.rStatus === 1) {
          alert('Shipment status updated successfully!');
          navigate('/manager/order-list');
        } else {
          alert('Failed to update shipment status.');
        }
      })
      .catch(error => {
        console.error('Error updating shipment status:', error);
        alert('An error occurred while updating shipment status.');
      });
  };

  return (
    <div className="track-shipment-manager-page">
      <Navbar profileName="Manager" />
      <div className="content-wrapper">
        <Sidebar role="manager" />
        <main className="track-shipment-manager-main-content">
          <div className="track-shipment-manager-container">
            <h2 className="page-title">Track Shipment</h2>
            <form onSubmit={handleSubmit} className="track-shipment-manager-form">
              <input
                type="text"
                placeholder="Shipment ID"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                className="track-shipment-manager-input"
                required
                disabled
              />
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="track-shipment-manager-select" 
                required
              >
                <option value="">Select Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>

              <input
                type="datetime-local"
                placeholder="Select date and time"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="track-shipment-manager-input"
                required
              />
              <button type="submit" className="track-shipment-manager-button">Update Status</button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default TrackShipmentManager;
