// import React, { useState } from 'react';

// import '../../styles/AddProduct.css'; // Import the CSS file for AddProduct styling
// import Footer from '../Common/UserFooter';
// import Sidebar from '../Common/UserSidebar';
// import Navbar from '../Common/UserNavbar';

// const AddProduct = () => {
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Define the payload
//     const payload = {
//       eventID: "1001",
//       addInfo: {
//         product_name: productData.name,
//         product_description: productData.description,
//         price: productData.price, // Ensure price is a float
//       },
//     };

//     // Handle adding product
//     console.log('Product data submitted:', payload);
    
//     // Example fetch call to add a product
//     fetch('http://localhost:5164/productservice', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Product added:', data);
//         // Show success message
//         alert('Product added successfully!');
//         window.location.href = '/manager/productlist';
//         // Optionally, reset form fields
//         setProductData({
//           name: '',
//           description: '',
//           price: '',
//         });
//       })
//       .catch((error) => {
//         console.error('Error adding product:', error);
//         // Show error message
//         alert('Error adding product: ' + error.message);
//       });
//   };

//   return (
//     <div className="add-product-page" style={{ padding:'100px', paddingLeft:'700px'}}>
//       <Navbar profileName="Manager" />
//       <div className="content-wrapper">
//         <Sidebar role="manager" />
//         <main className="add-product-form-container" style={{maxWidth:'500px' , height:'500px'}}>
//           <h2>Add Product</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Product Name"
//               value={productData.name}
//               onChange={(e) => setProductData({ ...productData, name: e.target.value })}
//               required
//               style={{border:'1px solid grey'}}
//             />
//             <textarea
//               placeholder="Product Description"
//               value={productData.description}
//               onChange={(e) => setProductData({ ...productData, description: e.target.value })}
//               required
//             />
//             <input
//               type="texg"
//               placeholder="Price"
//               value={productData.price}
//               onChange={(e) => setProductData({ ...productData, price: e.target.value })}
//               required
//               className='price-class'
//             />
//             <br /><br />
//             <button type="submit" style={{background:'#0056b3'}}>Add Product</button>
//           </form>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from 'react';
import '../../styles/AddProduct.css'; // Import the CSS file for AddProduct styling
import Footer from '../Common/UserFooter';
import Sidebar from '../Common/UserSidebar';
import Navbar from '../Common/UserNavbar';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    currency: '', // Default currency
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define the payload
    const payload = {
      eventID: "1001",
      addInfo: {
        product_name: productData.name,
        product_description: productData.description,
        price: parseFloat(productData.price), // Ensure price is a float
        currency: productData.currency,
      },
    };

    // Handle adding product
    console.log('Product data submitted:', payload);
    
    // Example fetch call to add a product
    fetch('http://localhost:5164/productservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added:', data);
        // Show success message
        alert('Product added successfully!');
        window.location.href = '/manager/productlist';
        // Optionally, reset form fields
        setProductData({
          name: '',
          description: '',
          price: '',
          currency: '',
        });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        // Show error message
        alert('Error adding product: ' + error.message);
      });
  };

  return (
    <div className="add-product-page" style={{ padding: '100px', paddingLeft: '700px' }}>
      <Navbar profileName="Manager" />
      <div className="content-wrapper">
        <Sidebar role="manager" />
        <main className="add-product-form-container" style={{ maxWidth: '500px', height: '500px' }}>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              required
              style={{ border: '1px solid grey' }}
            />
            <textarea
              placeholder="Product Description"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              required
            />
            <div className="price-container">
              <select
                value={productData.currency}
                onChange={(e) => setProductData({ ...productData, currency: e.target.value })}
                style={{ marginRight: '10px', padding: '5px' }}
              >
                  <option value="per unit">Per Unit</option>
              <option value="per kilogram">Per Kilogram</option>
              <option value="per pound">Per Pound</option>
              <option value="per ton">Per Ton</option>
              <option value="per liter">Per Liter</option>
                {/* Add more currency options as needed */}
              </select> 

              <input
                type="text"
                placeholder="Price"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                required
                style={{ border: '1px solid grey', width: '100px' }}
              />
            </div>
            <br /><br />
            <button type="submit" style={{ background: '#0056b3' }}>Add Product</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
