import React, { useEffect, useState } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/trackShipmentPage.css'; // Import the updated CSS file

const TrackShipment = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [status, setStatus] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    // Extract shipment_id from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const shipmentIdParam = queryParams.get('shipment_idby');
    
    if (shipmentIdParam) {
      setShipmentId(shipmentIdParam);
    }
  }, [location.search]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          shipment_idby: shipmentId,
          tracking_statusby: status,
          date_time: dateTime
        }
      };

      const response = await fetch('http://localhost:5164/updateorderbysupplierstatusbyshipmentId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.rStatus === 1) {
        alert('Shipment status updated successfully!');
        window.location.href = '/supplier/check-product-availability';
        
      } else {
        alert(data.rData?.rMessage || 'Failed to update shipment status.');
      }
    } catch (error) {
      console.error('Error updating shipment status:', error);
      alert('An error occurred while updating shipment status.');
    }
  };

  return (
    <div className="track-shipment-page">
      <Navbar profileName="Supplier" />
      <Sidebar role="supplier" />
      <main className="track-shipment-main-content">
        <div className="track-shipment-container">
          <h2 className="track-shipment-title">Track Shipment</h2>
          <form onSubmit={handleUpdateStatus} className="track-shipment-form">
            <input
              type="text"
              placeholder="Enter Shipment ID"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              required
              className="track-shipment-input"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="track-shipment-select"
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
              className="track-shipment-input"
              required
            />
            <button type="submit" className="track-shipment-button">Update Status</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackShipment;
