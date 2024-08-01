

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/OrderList.css';

const URL_API = 'http://localhost:5164/getorderlist';
const UPDATE_ORDER_API = 'http://localhost:5164/updateorderstatus';
const DELETE_ORDER_API = 'http://localhost:5164/deleteorders';

const OrderList = () => {
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  const [res, setRes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('pickup');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          eventID: "1001",
          addInfo: {}
        };

        const response = await axios.post(URL_API, payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("Fetched Data: ", response.data);
        setOrders(response.data);

        if (response.data && response.data.rData && response.data.rData.rMessage) {
          const resData = response.data.rData.rMessage;
          setRes(resData);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: orderId,
          status: selectedStatus
        }
      };

      const response = await axios.post(UPDATE_ORDER_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Update Order Status Response:', response.data);

      if (response.data.rStatus === 1) {
        alert('Order status updated successfully!');
        fetchOrderData();
      } else {
        alert('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async () => {
    if (deleteOrderId === null) return;

    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: deleteOrderId
        }
      };

      const response = await axios.post(DELETE_ORDER_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.rStatus === 1) {
        alert('Order deleted successfully!');
        fetchOrderData();
      } else {
        alert(response.data.rData.rMessage || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    } finally {
      setShowDeleteConfirm(false);
      setDeleteOrderId(null);
    }
  };

  const fetchOrderData = async () => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {}
      };

      const response = await axios.post(URL_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Fetched Data: ", response.data);
      setOrders(response.data);

      if (response.data && response.data.rData && response.data.rData.rMessage) {
        const resData = response.data.rData.rMessage;
        setRes(resData);
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const confirmDelete = (orderId) => {
    setDeleteOrderId(orderId);
    setShowDeleteConfirm(true);
  };

  // Helper function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

  return (
    <div className="order-list-page">
      <Navbar profileName="Manager" />
      <div className="content-wrapper">
        <Sidebar role="manager" />
        <main className="order-list-main-content">
          <div className="order-list-container">
            <h2 className="page-title">Order List</h2>
            <table className="order-list-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Shipment ID</th>
                  <th>Track Shipment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {res.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.map((value, idx) => (
                      <tr key={idx}>
                        <td>{value[0]}</td>
                        <td>{value[1]}</td>
                        <td>{value[2]}</td>
                        <td>{value[3]}</td>
                        <td>{value[4]}</td>
                        <td>{value[5]}</td>
                        <td>{value[6]}</td>
                        <td>{value[7]}</td>
                        <td>{value[8]}</td>
                        <td>{JSON.stringify(value[9])}</td>
                        <td>{JSON.stringify(value[10])}</td>
                        <td>{formatDate(value[11])}</td>
                        <td>
                          <button
                            className="action-button update-button"
                            onClick={() => handleUpdateOrderStatus(value[0])}
                          >
                            Update Order Status
                          </button>
                          <button
                            className="action-button track-button"
                            onClick={() => {
                              navigate(`/manager/track-shipment?shipment_id=${value[9]}`);
                            }}
                          >
                            Track Shipment
                          </button>
                          <button
                            className="action-button delete-button"
                            onClick={() => confirmDelete(value[0])}
                          >
                            Delete Order
                            {/* <td>{formatDate(row[7])}</td> */}

                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
      {showDeleteConfirm && (
        <div className="confirm-delete-dialog">
          <p>Are you sure you want to delete this order?</p>
          <button className="confirm-button" onClick={handleDeleteOrder}>OK</button>
          <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
