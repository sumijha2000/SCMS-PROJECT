import React, { useState, useEffect } from 'react';
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';
import '../../styles/product-list.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URL_api = 'http://localhost:5164/getproductlist';
const UPDATE_API = 'http://localhost:5164/updateproduct';
const DELETE_API = 'http://localhost:5164/deleteproduct';

const ProductList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/'); // Redirect to homepage if no token is found
      return;
    }
  }, [token, navigate]);

  const [res, setRes] = useState([]);

  // Function to fetch data
  const getData = () => {
    const payload = {
      eventID: "1001",
      addInfo: {}
    };

    axios.post(URL_api, payload)
      .then(response => {
        if (response.data && response.data.rData && response.data.rData.rMessage) {
          const resData = response.data.rData.rMessage;
          setRes(resData); // Update state with new data
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // State for editing supplier data
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editedSupplier, setEditedSupplier] = useState({
    id: '',
    productname: '',
    productdetails: '',
    price: '',
    currency: '' // Added currency field
  });

  // Handle edit button click
  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setEditedSupplier({
      id: supplier[0],
      productname: supplier[1],
      productdetails: supplier[2],
      price: supplier[3],
      currency: supplier[4] // Added currency field
    });
  };

  // Handle changes in edit form fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedSupplier({
      ...editedSupplier,
      [name]: value
    });
  };

  // Handle form submission for updating supplier data
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: editedSupplier.id,
          product_name: editedSupplier.productname, // Ensure this matches backend key
          product_description: editedSupplier.productdetails, // Ensure this matches backend key
          price: editedSupplier.price, // Ensure this matches backend key
          currency: editedSupplier.currency // Ensure this matches backend key
        }
      };

      const response = await axios.post(UPDATE_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.rStatus === 1) {
        alert('Product updated successfully');
        getData(); // Refresh data after successful update
        setEditingSupplier(null); // Clear editing state
      } else {
        alert(response.data.rData.rMessage || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: id // Ensure that the ID is correctly included in the payload
        }
      };

      const response = await axios.post(DELETE_API, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.rStatus === 1) {
        alert('Product deleted successfully');
        getData(); // Refresh data after successful delete
      } else {
        alert(response.data.rData.rMessage || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div className="product-list-page">
      <Navbar profileName="Manager" />
      <div className="content-wrapper">
        <Sidebar role="manager" />
        <main className="main-content">
          <div className="product-list-container">
            <h2>Product List</h2>
            <table className='manager-table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Price</th>
                  <th>Unit</th> {/* Added Currency column */}
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
                        <td>{value[3]}</td>
                        <td>{value[4]}</td> {/* Added Currency value */}
                        <td>
                          <button className="edit-button" onClick={() => handleEdit(value)}>Edit</button>
                          <button className="delete-button" onClick={() => handleDelete(value[0])}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {/* Edit Form */}
            {editingSupplier && (
              <div className="edit-form">
                <h3>Edit Product</h3>
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label htmlFor="edit-productname">Product Name</label>
                    <input
                      type="text"
                      id="edit-productname"
                      name="productname"
                      value={editedSupplier.productname}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-productdetails">Product Description</label>
                    <input
                      type="text"
                      id="edit-productdetails"
                      name="productdetails"
                      value={editedSupplier.productdetails}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-price">Price</label>
                    <input
                      type="text"
                      id="edit-price"
                      name="price"
                      value={editedSupplier.price}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edit-currency">Unit</label> {/* Added Currency field */}
                    <input
                      type="text"
                      id="edit-currency"
                      name="currency"
                      value={editedSupplier.currency}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit">Update Product</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
