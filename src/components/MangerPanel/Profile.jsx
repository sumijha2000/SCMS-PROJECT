import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Profile.css'; // Ensure you have this CSS file for styling


const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    image: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    image: '',
  });

  const memail = localStorage.getItem('memail');
  const semail = localStorage.getItem('semail');

  const fetchProfile = async (email, url) => {
    try {
      const response = await axios.post(url, {
        eventID: '1001',
        addInfo: { email }
      });
      if (response.data && response.data.rData && Array.isArray(response.data.rData.rMessage)) {
        const [item] = response.data.rData.rMessage;
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

  useEffect(() => {
    if (memail) {
      fetchProfile(memail, 'http://localhost:5164/managerprofiledata');
    } else if (semail) {
      fetchProfile(semail, 'http://localhost:5164/supplierprofiledata');
    }
  }, [memail, semail]);

  const handleEditClick = () => {
    setFormData(profile);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = memail ? 'http://localhost:5164/upadatemanagerdata' : 'http://localhost:5164/updatesupplierprofile';
    const email = memail || semail;

    try {
      const response = await axios.post(url, {
        eventID: '1001',
        addInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          address: formData.address,
          image: formData.image,
        },
      });
      console.log('Profile updated successfully', response.data);
      setProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Update Profile Failed:', error.response.data);
    }
  };

  return (
    <div className="profile-page">
  
      <div className="profile-container">
  
        <div className="profile-content">
          <div className="profile-image-container">
            <img src={profile.image} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Company:</strong> {profile.companyName}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            {!editMode && (
              <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
            )}
          </div>
        </div>
        {editMode && (
          <div className="profile-edit-form-container">
            <form onSubmit={handleSubmit} className="profile-form">
              <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled />
              </div>
              <div>
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <label>Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
              </div>
              <div>
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div>
                <label>Image</label>
                <input type="file" name="image" onChange={handleImageChange} />
              </div>
              <button type="submit" className="save-button">Save</button>
              <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
