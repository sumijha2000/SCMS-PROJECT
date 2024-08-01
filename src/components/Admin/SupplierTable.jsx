



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Common/Navbar';
// import Sidebar from '../Common/Sidebar';
// import '../../styles/SupplierTable.css';

// const URL_API = 'http://localhost:5164/getsupplierdata';
// const UPDATE_API = 'http://localhost:5164/updateuseraccount';
// const DELETE_API = 'http://localhost:5164/deleteuseraccount';

// const SupplierTable = () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');

//     const [supplierData, setSupplierData] = useState([]);
//     const [res, setRes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingSupplier, setEditingSupplier] = useState(null);
//     const [editedSupplier, setEditedSupplier] = useState({
//         id: '',
//         name: '',
//         email: '',
//         password: ''
//     });

//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [deleteEmail, setDeleteEmail] = useState('');

//     useEffect(() => {
//         if (!token) {
//             navigate('/');
//             return;
//         }
//         getData();
//     }, [token, navigate]);

//     const getData = async () => {
//         const payload = {
//             eventID: "1001",
//             addInfo: {}
//         };

//         try {
//             const response = await axios.post(URL_API, payload);
//             if (response.data && response.data.rData && response.data.rData.rMessage) {
//                 setRes(response.data.rData.rMessage);
//             } else {
//                 console.error('Unexpected response structure:', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             alert('Error fetching data. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (supplier) => {
//         setEditingSupplier(supplier);
//         setEditedSupplier({
//             id: supplier[0],
//             name: supplier[1],
//             email: supplier[2],
//             password: supplier[3]
//         });
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditedSupplier({
//             ...editedSupplier,
//             [name]: value
//         });
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             eventID: "1001",
//             addInfo: {
//                 id: editedSupplier.id,
//                 name: editedSupplier.name,
//                 email: editedSupplier.email,
//                 role: "supplier",
//                 password: editedSupplier.password
//             }
//         };

//         try {
//             const response = await axios.post(UPDATE_API, payload, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.rStatus === 1) {
//                 alert('Supplier account updated successfully');
//                 setRes(prevRes =>
//                     prevRes.map(item =>
//                         item[0] === editedSupplier.id
//                             ? [editedSupplier.id, editedSupplier.name, editedSupplier.email, editedSupplier.password]
//                             : item
//                     )
//                 );
//                 setEditingSupplier(null);
//             } else {
//                 alert(response.data.rData.rMessage || 'Failed to update supplier account');
//             }
//         } catch (error) {
//             console.error('Error updating supplier account:', error);
//             alert('Error updating supplier account');
//         }
//     };

//     const confirmDelete = (email) => {
//         setDeleteEmail(email);
//         setShowDeleteConfirm(true);
//     };

//     const handleDelete = async () => {
//         const payload = {
//             eventID: "1001",
//             addInfo: {
//                 email: deleteEmail
//             }
//         };

//         try {
//             const response = await axios.post(DELETE_API, payload, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.rStatus === 1) {
//                 alert('Supplier account deleted successfully');
//                 setRes(prevRes => prevRes.filter(item => item[2] !== deleteEmail));
//             } else {
//                 alert(response.data.rData.rMessage || 'Failed to delete supplier account');
//             }
//         } catch (error) {
//             console.error('Error deleting supplier account:', error);
//             alert('Error deleting supplier account');
//         } finally {
//             setShowDeleteConfirm(false);
//             setDeleteEmail('');
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <Navbar />
//             <Sidebar />
//             <div className="main-content">
//                 <div className="supplier-table-container">
//                     <h3>Supplier Account Table</h3>
//                     {loading && <div className="loading-spinner"></div>}
//                     <div className="supplier-table-wrapper">
//                         <table className='supplier-table'>
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Password</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
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
//                                                 <button className="delete-button" onClick={() => confirmDelete(value[2])}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </React.Fragment>
//                             ))}
//                             </tbody>
//                         </table>
//                         {editingSupplier && (
//                             <div className="edit-form">
//                                 <h3>Edit Supplier Account</h3>
//                                 <form onSubmit={handleEditSubmit}>
//                                     <div className="form-group">
//                                         <label htmlFor="edit-name">Name</label>
//                                         <input
//                                             type="text"
//                                             id="edit-name"
//                                             name="name"
//                                             value={editedSupplier.name}
//                                             onChange={handleEditChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="edit-email">Email</label>
//                                         <input
//                                             type="email"
//                                             id="edit-email"
//                                             name="email"
//                                             value={editedSupplier.email}
//                                             onChange={handleEditChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="edit-password">Password</label>
//                                         <input
//                                             type="password"
//                                             id="edit-password"
//                                             name="password"
//                                             value={editedSupplier.password}
//                                             onChange={handleEditChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <button type="submit">Update Account</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         )}
//                         {showDeleteConfirm && (
//                             <div className="confirm-delete-dialog">
//                                 <p>Are you sure you want to delete this supplier account?</p>
//                                 <button className="confirm-button" onClick={handleDelete}>OK</button>
//                                 <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SupplierTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Sidebar from '../Common/Sidebar';
import '../../styles/SupplierTable.css';

const URL_API = 'http://localhost:5164/getsupplierdata';
const UPDATE_API = 'http://localhost:5164/updateuseraccount';
const DELETE_API = 'http://localhost:5164/deleteuseraccount';

const SupplierTable = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [supplierData, setSupplierData] = useState([]);
    const [res, setRes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteEmail, setDeleteEmail] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        getData();
    }, [token, navigate]);

    const getData = async () => {
        const payload = {
            eventID: "1001",
            addInfo: {}
        };

        try {
            const response = await axios.post(URL_API, payload);
            if (response.data && response.data.rData && response.data.rData.rMessage) {
                setRes(response.data.rData.rMessage);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {

    //     getData();

    // }, [])


    const handleEdit = (supplier) => {
        setEditingSupplier(supplier);
        setEditedSupplier({
            id: supplier[0],
            name: supplier[1],
            email: supplier[2],
            password: supplier[3]
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedSupplier({
            ...editedSupplier,
            [name]: value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            eventID: "1001",
            addInfo: {
                id: editedSupplier.id,
                name: editedSupplier.name,
                email: editedSupplier.email,
                role: "supplier",
                password: editedSupplier.password
            }
        };

        try {
            const response = await axios.post(UPDATE_API, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.rStatus === 1) {
                alert('Supplier account updated successfully');
                getData();
                setRes(prevRes =>
                    prevRes.map(item =>
                        item[0] === editedSupplier.id
                            ? [editedSupplier.id, editedSupplier.name, editedSupplier.email, editedSupplier.password]
                            : item
                    )
                );
                
                setEditingSupplier(null);
            } else {
                alert(response.data.rData.rMessage || 'Failed to update supplier account');
            }
        } catch (error) {
            console.error('Error updating supplier account:', error);
            alert('Error updating supplier account');
        }
    };

    const confirmDelete = (email) => {
        setDeleteEmail(email);
        setShowDeleteConfirm(true);
    };

    const handleDelete = async () => {
        const payload = {
            eventID: "1001",
            addInfo: {
                email: deleteEmail
            }
        };

        try {
            const response = await axios.post(DELETE_API, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.rStatus === 1) {
                alert('Supplier account deleted successfully');
                setRes(prevRes => prevRes.filter(item => item[2] !== deleteEmail));
            } else {
                alert(response.data.rData.rMessage || 'Failed to delete supplier account');
            }
        } catch (error) {
            console.error('Error deleting supplier account:', error);
            alert('Error deleting supplier account');
        } finally {
            setShowDeleteConfirm(false);
            setDeleteEmail('');
        }
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="main-content">
                <div className="supplier-table-container">
                    <h3>Supplier Account Table</h3>
                    {loading && <div className="loading-spinner"></div>}
                    <div className="supplier-table-wrapper">
                        <table className='supplier-table'>
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
                        {editingSupplier && (
                            <div className="edit-form">
                                <h3>Edit Supplier Account</h3>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="edit-name">Name</label>
                                        <input
                                            type="text"
                                            id="edit-name"
                                            name="name"
                                            value={editedSupplier.name}
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
                                            value={editedSupplier.email}
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
                                            value={editedSupplier.password}
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
                        {showDeleteConfirm && (
                            <div className="confirm-delete-dialog">
                                <p>Are you sure you want to delete this supplier account?</p>
                                <button className="confirm-button" onClick={handleDelete}>OK</button>
                                <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierTable;
