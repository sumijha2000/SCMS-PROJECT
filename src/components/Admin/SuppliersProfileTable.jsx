import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../Common/Sidebar';
import Navbar from '../Common/Navbar';

import '../../styles/ManagersProfileTable.css'; 

const URL_api = 'http://localhost:5164/getsupplierspofilesdata';
const DELETE_API = 'http://localhost:5164/deletesupplierprofile';

const SuppliersProfileTable = () => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const [orders, setOrders] = useState([]); // State variable to store orders
  const [res, setRes] = useState([]); // State variable to store the value of res

  useEffect(() => {
    // Function to fetch data
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
  }, []);

  const handleDelete = async (email) => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          email: email
        }
      };

      const response = await axios.post(DELETE_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in headers
          'Content-Type': 'application/json'
        }
      });

      if (response.data.rStatus === 1) {
        alert('Supplier profile deleted successfully');
        setRes(res.filter(supplier => supplier[2] !== email)); // Filter out the deleted supplier from the state
      } else {
        alert(response.data.rData.rMessage || 'Failed to delete supplier profile');
      }
    } catch (error) {
      console.error('There was an error deleting the supplier profile:', error);
      alert('There was an error deleting the supplier profile');
    }
  };

  return (
    <div className="managers-profile-page">
      <Navbar profileName="Manager" />
      <Sidebar role="manager" />
      <main className="managers-profile-main-content">
        <div className="managers-profile-container" >
          <h2 style={{color:'blue'}}>Suppliers Profile List</h2>
          <table className="managers-profile-table"  style={{marginLeft:'100px'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {res.map((item, index) => (
                <React.Fragment key={index}>
                  {item.map((value, idx) => (
                    <tr style={{ cursor: 'pointer' }} key={idx}>
                      <td>{value[0]}</td>
                      <td>
                        <img src={value[6]} alt="profile" className="managers-profile-image" />
                      </td>
                      <td>{value[1]}</td>
                      <td>{value[2]}</td>
                      <td>{value[3]}</td>
                      <td>{value[4]}</td>
                      <td>{value[5]}</td>
                      <td>
                        <button className="delete-button" onClick={() => handleDelete(value[2])}>Delete</button>
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
  );
};

export default SuppliersProfileTable;




