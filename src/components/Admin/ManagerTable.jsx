// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Common/Navbar';
// import Sidebar from '../Common/Sidebar';
// import '../../styles/ManagerTable.css';

// const URL_api = 'http://localhost:5164/getmanagerdata';
// const UPDATE_API = 'http://localhost:5164/updateuseraccount';
// const DELETE_API = 'http://localhost:5164/deleteuseraccount'; // API endpoint for delete operation

// const ManagerTable = () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token'); // Get token from local storage

//     useEffect(() => {
//         if (!token) {
//             console.log('No token found');
//             navigate('/'); // Redirect to homepage if no token is found
//             return;
//         }
//     }, [token, navigate]);

//     const [managerData, setManagerData] = useState([]);
//     const [res, setRes] = useState([]);

//     // Function to fetch data
//     const getData = async () => {
//         const payload = {
//             eventID: "1001",
//             addInfo: {}
//         };

//         try {
//             const response = await axios.post(URL_api, payload);
//             console.log("From Response Data ", response.data);
//             setManagerData(response.data); // Assuming response.data is an array of manager data

//             if (response.data && response.data.rData && response.data.rData.rMessage) {
//                 const resData = response.data.rData.rMessage;
//                 setRes(resData); // Setting the value of res to the state variable
//             } else {
//                 console.error('Unexpected response structure:', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     // Fetch data on component mount
//     useEffect(() => {
//         getData();
//     }, []);

//     // State for editing manager data
//     const [editingManager, setEditingManager] = useState(null);
//     const [editedManager, setEditedManager] = useState({
//         id: '',
//         name: '',
//         email: '',
//         password: ''
//     });

//     // Handle edit button click
//     const handleEdit = (manager) => {
//         setEditingManager(manager);
//         setEditedManager({
//             id: manager[0],
//             name: manager[1],
//             email: manager[2],
//             password: manager[3]
//         });
//     };

//     // Handle changes in edit form fields
//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditedManager({
//             ...editedManager,
//             [name]: value
//         });
//     };

//     // Handle form submission for updating manager data
//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const payload = {
//                 eventID: "1001",
//                 addInfo: {
//                     id: editedManager.id,
//                     name: editedManager.name,
//                     email: editedManager.email,
//                     role: "manager",
//                     password: editedManager.password
//                 }
//             };

//             const response = await axios.post(UPDATE_API, payload, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.rStatus === 1) {
//                 alert('Manager account updated successfully');
//                 getData(); // Refresh data after successful update
//                 setEditingManager(null); // Clear editing state
//             } else {
//                 alert(response.data.rData.rMessage || 'Failed to update manager account');
//             }
//         } catch (error) {
//             console.error('Error updating manager account:', error);
//             alert('Error updating manager account');
//         }
//     };

//     // Function to handle delete operation
//     const handleDelete = async (email) => {
//         try {
//             const payload = {
//                 eventID: "1001",
//                 addInfo: {
//                     email: email
//                 }
//             };

//             const response = await axios.post(DELETE_API, payload, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.rStatus === 1) {
//                 alert('Manager account deleted successfully');
//                 getData(); // Refresh data after successful delete
//             } else {
//                 alert(response.data.rData.rMessage || 'Failed to delete manager account');
//             }
//         } catch (error) {
//             console.error('Error deleting manager account:', error);
//             alert('Error deleting manager account');
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <Navbar />
//             <Sidebar />
//             <div className="main-content">
//                 <div className="manager-table-container">
//                     <h3>Manager Account Table</h3>
//                     <table className='manager-table'>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Password</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {res.map((item, index) => (
//                                 <React.Fragment key={index}>
//                                     {item.map((value, idx) => (
//                                         <tr style={{ cursor: 'pointer' }} key={idx}>
//                                             <td>{value[0]}</td>
//                                             <td>{value[1]}</td>
//                                             <td>{value[2]}</td>
//                                             <td>{value[4]}</td>
//                                             <td>
//                                                 <button className="edit-button" onClick={() => handleEdit(value)}>Edit</button>
//                                                 <button className="delete-button" onClick={() => handleDelete(value[2])}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>

//                     {/* Edit Form */}
//                     {editingManager && (
//                         <div className="edit-form">
//                             <h3>Edit Manager Account</h3>
//                             <form onSubmit={handleEditSubmit}>
//                                 <div className="form-group">
//                                     <label htmlFor="edit-name">Name</label>
//                                     <input
//                                         type="text"
//                                         id="edit-name"
//                                         name="name"
//                                         value={editedManager.name}
//                                         onChange={handleEditChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="edit-email">Email</label>
//                                     <input
//                                         type="email"
//                                         id="edit-email"
//                                         name="email"
//                                         value={editedManager.email}
//                                         onChange={handleEditChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="edit-password">Password</label>
//                                     <input
//                                         type="password"
//                                         id="edit-password"
//                                         name="password"
//                                         value={editedManager.password}
//                                         onChange={handleEditChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <button type="submit">Update Account</button>
//                                 </div>
//                             </form>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManagerTable;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import '../../styles/ManagerTable.css';

const URL_api = 'http://localhost:5164/getmanagerdata';
const UPDATE_API = 'http://localhost:5164/updateuseraccount';
const DELETE_API = 'http://localhost:5164/deleteuseraccount'; // API endpoint for delete operation

const ManagerTable = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Get token from local storage

    useEffect(() => {
        if (!token) {
            console.log('No token found');
            navigate('/'); // Redirect to homepage if no token is found
            return;
        }
    }, [token, navigate]);

    const [managerData, setManagerData] = useState([]);
    const [res, setRes] = useState([]);

    // State for editing manager data
    const [editingManager, setEditingManager] = useState(null);
    const [editedManager, setEditedManager] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });

    // State for confirmation dialog
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteEmail, setDeleteEmail] = useState('');

    // Function to fetch data
    const getData = async () => {
        const payload = {
            eventID: "1001",
            addInfo: {}
        };

        try {
            const response = await axios.post(URL_api, payload);
            console.log("From Response Data ", response.data);
            setManagerData(response.data); // Assuming response.data is an array of manager data

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

    // Fetch data on component mount
    useEffect(() => {
        getData();
    }, []);

    // Handle edit button click
    const handleEdit = (manager) => {
        setEditingManager(manager);
        setEditedManager({
            id: manager[0],
            name: manager[1],
            email: manager[2],
            password: manager[3]
        });
    };

    // Handle changes in edit form fields
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedManager({
            ...editedManager,
            [name]: value
        });
    };

    // Handle form submission for updating manager data
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                eventID: "1001",
                addInfo: {
                    id: editedManager.id,
                    name: editedManager.name,
                    email: editedManager.email,
                    role: "manager",
                    password: editedManager.password
                }
            };

            const response = await axios.post(UPDATE_API, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.rStatus === 1) {
                alert('Manager account updated successfully');
                getData(); // Refresh data after successful update
                setEditingManager(null); // Clear editing state
            } else {
                alert(response.data.rData.rMessage || 'Failed to update manager account');
            }
        } catch (error) {
            console.error('Error updating manager account:', error);
            alert('Error updating manager account');
        }
    };

    // Function to handle delete operation
    const handleDelete = async () => {
        try {
            const payload = {
                eventID: "1001",
                addInfo: {
                    email: deleteEmail
                }
            };

            const response = await axios.post(DELETE_API, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.rStatus === 1) {
                alert('Manager account deleted successfully');
                getData(); // Refresh data after successful delete
            } else {
                alert(response.data.rData.rMessage || 'Failed to delete manager account');
            }
        } catch (error) {
            console.error('Error deleting manager account:', error);
            alert('Error deleting manager account');
        } finally {
            setShowDeleteConfirm(false); // Hide confirmation dialog
            setDeleteEmail(''); // Clear email
        }
    };

    // Confirm delete operation
    const confirmDelete = (email) => {
        setDeleteEmail(email);
        setShowDeleteConfirm(true);
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="main-content">
                <div className="manager-table-container">
                    <h3>Manager Account Table</h3>
                    <table className='manager-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.map((value, idx) => (
                                        <tr style={{ cursor: 'pointer' }} key={idx}>
                                            <td>{value[0]}</td>
                                            <td>{value[1]}</td>
                                            <td>{value[2]}</td>
                                            <td>{value[4]}</td>
                                            <td>
                                                <button className="edit-button" onClick={() => handleEdit(value)}>Edit</button>
                                                <button className="delete-button" onClick={() => confirmDelete(value[2])}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* Edit Form */}
                    {editingManager && (
                        <div className="edit-form">
                            <h3>Edit Manager Account</h3>
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label htmlFor="edit-name">Name</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        name="name"
                                        value={editedManager.name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-email">Email</label>
                                    <input
                                        type="email"
                                        id="edit-email"
                                        name="email"
                                        value={editedManager.email}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-password">Password</label>
                                    <input
                                        type="password"
                                        id="edit-password"
                                        name="password"
                                        value={editedManager.password}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit">Update Account</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Confirmation Dialog */}
                    {showDeleteConfirm && (
                        <div className="confirm-delete-dialog">
                            <p>Are you sure you want to delete this manager account?</p>
                            <button className="confirm-button" onClick={handleDelete}>OK</button>
                            <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagerTable;
