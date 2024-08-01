import React, { useEffect, useState } from 'react';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import '../../styles/OrdersForm.css'; // Make sure to adjust the CSS file path if needed
import axios from 'axios';

const OrdersForm = () => {
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      window.location.href = '/'; // Redirect to homepage if no token is found
      return;
    }
  }, [token]);

  const [order, setOrder] = useState({
    product_name: '',
    quantity: 1,
    unit: '',
    unit_price: 0,
    customer_name: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5164/orderservice', {
        eventID: '1001',
        addInfo: order
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in headers
          'Content-Type': 'application/json'
        }
      });

      if (response.data.rStatus === 1) {
        alert('Order created successfully');
        window.location.href = '/manager/order-list';
        setOrder({
          product_name: '',
          quantity: 1,
          unit: '',
          unit_price: 0,
          customer_name: '',
          location: ''
        });
      } else {
        alert(response.data.rData.rMessage || 'Failed to create order');
      }
    } catch (error) {
      console.error('There was an error creating the order:', error);
      alert('There was an error creating the order');
    }
  };

  return (
    <div className="orders-form-wrapper">
      <Navbar />
      <Sidebar />
      <main className="orders-form-main">
        <h2>Create New Order</h2>
        <form onSubmit={handleSubmit} className="orders-form">
          <div className="form-group">
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              value={order.product_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={order.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={order.unit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit_price">Unit Price</label>
            <input
              type="number"
              id="unit_price"
              name="unit_price"
              value={order.unit_price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customer_name">Client Company Name</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={order.customer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={order.location}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Create Order</button>
        </form>
      </main>
    </div>
  );
};

export default OrdersForm;
