import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/CheckProductAvailability.css'; // Import the new CSS file

const URL_api = 'http://localhost:5164/transactionhistorysupplier';

const DELETE_ORDER_API = 'http://localhost:5164/deleteorders'; // API for deleting orders

const CheckProductAvailability = () => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const [orders, setOrders] = useState([]); // State variable to store orders
  const [res, setRes] = useState([]); // State variable to store the value of res
  const [selectedStatus, setSelectedStatus] = useState('done'); // Default status

  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Fetch data
    const getData = async () => {
      try {
        const payload = {
          eventID: "1001",
          addInfo: {}
        };

        const response = await axios.post(URL_api, payload, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token in headers
            'Content-Type': 'application/json'
          }
        });

        console.log("From Response Data ", response.data);
        setOrders(response.data); // Assuming response.data is an array of orders

        // Check if the response data structure is as expected
        if (response.data && response.data.rData && response.data.rData.rMessage) {
          const resData = response.data.rData.rMessage;
          setRes(resData); // Setting the value of res to the state variable
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [token]);

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: orderId,
          supplier_status: selectedStatus
        }
      };

      const response = await axios.post(UPDATE_ORDER_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in headers
          'Content-Type': 'application/json'
        }
      });

      console.log('Update Order Status Response:', response.data);

      if (response.data.rStatus === 1) {
        alert('Order status updated successfully!');

      } else {
        alert('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: orderId
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
        fetchOrderData(); // Refresh data after successful delete
      } else {
        alert(response.data.rData.rMessage || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    }
  };

  const fetchOrderData = async () => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {}
      };

      const response = await axios.post(URL_api, payload, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in headers
          'Content-Type': 'application/json'
        }
      });

      console.log("From Response Data ", response.data);
      setOrders(response.data); // Assuming response.data is an array of orders

      // Check if the response data structure is as expected
      if (response.data && response.data.rData && response.data.rData.rMessage) {
        const resData = response.data.rData.rMessage;
        setRes(resData); // Setting the value of res to the state variable
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

  return (
    <div className="check-product-availability-page">
      <Navbar profileName="Supplier" />
      <div className="check-product-availability-content-wrapper">
        <Sidebar role="supplier" />
        <main className="check-product-availability-main-content">
          <div className="check-product-availability-container">
            <h2>Transaction History</h2>
            <table className="check-product-availability-table">
              <thead>
                <tr>
                <th>Order ID</th>
                  <th>Tranaction ID</th>
                  <th>Product Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {res.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.map((value, idx) => (
                      <tr key={idx}>
                        <td>{value[0]}</td>
                        <td>{value[13]}</td>
                        <td>{value[1]}</td>
                        <td>{value[5]}</td>
                        <td>{formatDate(value[15])}</td>
                        <td className="action-buttons">
          
                          <button
                            onClick={() => handleDeleteOrder(value[0])} // Pass Order ID to delete

                            style={{background:'#dc3545'}}
                          >
                            Delete Order
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
    </div>
  );
};

export default CheckProductAvailability;
