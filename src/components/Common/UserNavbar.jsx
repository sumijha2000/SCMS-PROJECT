// import React from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import axios from 'axios';
// import '../../styles/navbaruser.css';

// const Navbar = ({ profileName, onLogout }) => {
//   const handleLogout = async (event) => {
//     event.preventDefault();

//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       // Handle the case where there is no token in local storage
//       console.error('No token found');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5164/logoutuser', {
//         eventID: "1001",
//         addInfo: {
//           TOKEN: token,
//         },
//       });

//       if (response.status === 200) {
//         // Remove token and email from local storage
//         localStorage.removeItem('token');
//         localStorage.removeItem('memail'); // Remove email from local storage
//         localStorage.removeItem('semail'); // Remove email from local storage

//         // Call the onLogout function passed as a prop
//         onLogout();

//         // Redirect to login page
//         window.location.href = '/';
//       } else {
//         console.error('Logout failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <nav className="navbar">
//       <h1>User Panel</h1>
//       <div className="profile">
//         <FaUserCircle className="profile-icon" />
//         <span className="profile-text">{profileName}</span>
//         <div className="dropdown">
//           <a href="/yourprofile">Profile</a>
//           <a href="/settings">Settings</a>
//           <a href="/logout" onClick={handleLogout}>Logout</a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/navbaruser.css';

const UserNavbar = ({ profileName, onLogout }) => {
  const handleLogout = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      // Handle the case where there is no token in local storage
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5164/logoutuser', {
        eventID: '1001',
        addInfo: {
          TOKEN: token,
        },
      });

      if (response.status === 200) {
        // Remove token and email from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('memail'); // Remove email from local storage
        localStorage.removeItem('semail'); // Remove email from local storage

        // Call the onLogout function passed as a prop
        if (typeof onLogout === 'function') {
          onLogout();
        } else {
          console.error('onLogout is not a function');
        }

        // Redirect to login page
        window.location.href = '/';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <h1>User Panel</h1>
      <div className="profile">
        <FaUserCircle className="profile-icon" />
        <span className="profile-text">{profileName}</span>
        <div className="dropdown">
          <a href="/yourprofile">Profile</a>
          <a href="/settings">Settings</a>
          <a href="/logout" onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
