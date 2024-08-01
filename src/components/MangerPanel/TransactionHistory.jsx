import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/OrderList.css'; 

const URL_api = 'http://localhost:5164/transactionhistory';

const DELETE_ORDER_API = 'http://localhost:5164/deleteorders'; // API for deleting orders

const ConfirmedDeliveries = () => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const [orders, setOrders] = useState([]); // State variable to store orders
  const [res, setRes] = useState([]); // State variable to store the value of res
  const [selectedStatus, setSelectedStatus] = useState('pickup'); // Default status

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
          status: selectedStatus
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
        fetchOrderData();
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
        getData(); // Refresh data after successful delete
    } else {
        alert(response.data.rData.rMessage || 'Failed to delete manager account');
    }
} catch (error) {
    console.error('Error deleting manager account:', error);
    alert('Error deleting manager account');
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
    <div className="order-list-page">
      <Navbar profileName="Manager" />
      <div className="content-wrapper">
        <Sidebar role="manager" />
        <main className="order-list-main-content">
          <div className="order-list-container">
            <h2>Transaction History</h2>
            <table className="order-list-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Tranaction ID</th>
                  <th>Product Name</th>
                  <th>Amount</th>
                  <th>Client Company Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {res.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.map((value, idx) => (
                      <tr style={{ cursor: 'pointer' }} key={idx}>
                        <td>{value[0]}</td>
                        <td>{value[9]}</td>
                        <td>{value[1]}</td>
                        <td>{value[5]}</td>
                        <td>{value[6]}</td>
                        <td>{value[7]}</td>
                        <td>{formatDate(value[11])}</td>
                        <td><button
                            onClick={() => handleDeleteOrder(value[0])} // Pass Order ID to delete
                          >
                            Delete Order
                          </button></td>
                          
                        
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

export default ConfirmedDeliveries;
