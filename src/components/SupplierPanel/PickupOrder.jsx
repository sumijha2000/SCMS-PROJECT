import React, { useState, useEffect } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';

import '../../styles/pickupOrderPage.css';

const PickupOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5164/getorders'); // Example API endpoint
        const data = await response.json();
        setOrders(data.orders); // Adjust based on the actual structure of the response
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handlePickup = async (orderId) => {
    try {
      await fetch(`http://localhost:5164/pickuporder/${orderId}`, {
        method: 'POST',
      });
      // Update the order status locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'Picked Up' } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="pickup-order-page">
      <Navbar profileName="Supplier" />
      <Sidebar role="supplier" />
      <main className="pickup-order-main-content">
        <div className="pickup-order-table-container">
          <h2 className="pickup-order-title">Pickup Order</h2>
          <table className="pickup-order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="pickup-order-button"
                      onClick={() => handlePickup(order.id)}
                    >
                      Pick Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PickupOrder;
