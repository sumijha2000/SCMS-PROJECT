// import React, { useState } from 'react';
// import Footer from '../Common/UserFooter';
// import Sidebar from '../Common/UserSidebar';
// import Navbar from '../Common/UserNavbar';
// import '../../styles/createSupplierProfile.css'; // Import the new CSS file
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateSupplierProfile = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     companyName: '',
//     address: '',
//     image: '',
//   });

//   const navigate = useNavigate(); // Initialize navigate

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

//     // Prepare the request payload
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
//       const response = await axios.post('http://localhost:5164/supplierprofileservice', requestPayload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.rData.rMessage === 'CREATE PROFILE SUCCESSFULLY!') {
//         alert('Profile created successfully!');
        
//         // Store the email in localStorage
//         localStorage.setItem('email', profile.email);

//         // Navigate to the profile page
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
//     <div className="create-supplier-profile-page">
//       <Navbar profileName="Supplier" />
//       <div className="create-supplier-profile-content">
//         <Sidebar role="supplier" />
//         <main className="create-supplier-profile-form-container">
//           <h2>Create Supplier Profile</h2>
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

// export default CreateSupplierProfile;


import React, { useState } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/createSupplierProfile.css'; // Updated CSS file import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSupplierProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    image: '',
  });

  const navigate = useNavigate(); // Initialize navigate

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

    // Prepare the request payload
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
      const response = await axios.post('http://localhost:5164/supplierprofileservice', requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.rData.rMessage === 'CREATE PROFILE SUCCESSFULLY!') {
        alert('Profile created successfully!');
        
        // Store the email in localStorage
        localStorage.setItem('email', profile.email);

        // Navigate to the profile page
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
      <Navbar profileName="Supplier" />
      <div className="profile-content-wrapper">
        <Sidebar role="supplier" />
        <main className="profile-form-container">
          <h2>Create Supplier Profile</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={profile.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={profile.companyName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={profile.address}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            <button type="submit">Create Profile</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CreateSupplierProfile;
