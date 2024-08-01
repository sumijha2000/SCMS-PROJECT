import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/SupplierProfile.css'; // Ensure you have this CSS file for styling

const SupplierProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    image: '',
  });

  const URL_api = 'http://localhost:5164/supplierprofiledata';

  const semail = localStorage.getItem('semail');

  const requestBody = {
    eventID: '1001',
    addInfo: {
      email: `${semail}`
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(URL_api, requestBody);
        let result = response.data.rData;
        console.log(result)
        if (response.data && response.data.rData && Array.isArray(response.data.rData.rMessage)) {
          // Assuming rMessage is an array of arrays
          const [item] = response.data.rData.rMessage; // Get the first item from the array
          
          // Destructure the profile data from the item array
          setProfile({
            name: item[0],
            email: item[1],
            phone: item[2],
            companyName: item[3],
            address: item[4],
            image: item[5],
          });
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProfile();
  }, [semail]);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-content">
          <div className="profile-image-container">
            {/* Ensure the image URL is correct */}
            <img src={profile.image} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Company:</strong> {profile.companyName}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
