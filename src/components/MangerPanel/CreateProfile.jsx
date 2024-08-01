


// import React, { useState } from 'react';
// import Footer from '../Common/UserFooter';

// import '../../styles/CreateProfileManager.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import UserSidebar from '../Common/UserSidebar';
// import UserNavbar from '../Common/UserNavbar';

// const CreateProfileManager = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     companyName: '',
//     address: '',
//     image: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfile({
//         ...profile,
//         image: reader.result,
//       });
//     };
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requestPayload = {
//       eventID: '1001',
//       addInfo: {
//         name: profile.name,
//         email: profile.email,
//         phone: profile.phone,
//         company_name: profile.companyName,
//         address: profile.address,
//         image: profile.image,
//       },
//     };

//     try {
//       const response = await axios.post('http://localhost:5164/managerprofileservice', requestPayload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.rData.rMessage === 'CREATE PROFILE SUCCESSFULLY!') {
//         alert('Profile created successfully!');
//         localStorage.setItem('email', profile.email);
//         navigate('/yourprofile');
//       } else {
//         alert('Something went wrong: ' + response.data.rData.rMessage);
//       }
//     } catch (error) {
//       console.error('Error creating user:', error);
//       alert('Error creating user: ' + error.message);
//     }
//   };

//   return (
//     <div className="create-profile-manager-page">
//       <UserNavbar profileName="Manager" />
//       <div className="content-wrapper">
//         <UserSidebar role="manager" />
//         <main className="create-profile-form-container">
//           <h2>Create Manager Profile</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={profile.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={profile.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={profile.phone}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company Name"
//               value={profile.companyName}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={profile.address}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               required
//             />
//             <button type="submit">Create Profile</button>
//           </form>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CreateProfileManager;


import React, { useState } from 'react';
import Footer from '../Common/UserFooter';
import UserSidebar from '../Common/UserSidebar';
import UserNavbar from '../Common/UserNavbar';
import '../../styles/CreateProfileManager.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProfileManager = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({
        ...profile,
        image: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestPayload = {
      eventID: '1001',
      addInfo: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        company_name: profile.companyName,
        address: profile.address,
        image: profile.image,
      },
    };

    try {
      const response = await axios.post('http://localhost:5164/managerprofileservice', requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.rData.rMessage === 'CREATE PROFILE SUCCESSFULLY!') {
        alert('Profile created successfully!');
        localStorage.setItem('email', profile.email);
        navigate('/yourprofile');
      } else {
        alert('Something went wrong: ' + response.data.rData.rMessage);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    }
  };

  return (
    <div className="create-profile-container">
      <UserNavbar profileName="Manager" />
      <div className="content-area">
        <UserSidebar role="manager" />
        <main className="profile-form-section">
          <h2 className="form-heading">Create Manager Profile</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                value={profile.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={profile.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Profile Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Create Profile</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProfileManager;
