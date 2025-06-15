// import React from 'react'
// import UserProductPageNavbar from '../Navbar/UserProductPageNavbar'

// const UserProductPage = () => {
//   return (
//     <div>
//         <UserProductPageNavbar />
//         <div className='container'>
//             <h1>User Product Page</h1>
//             <p>This is the user product page. Only users can access this page.</p>
//         </div>
//     </div>
//   );
// }

// export default UserProductPage;

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import UserProductPageNavbar from '../Navbar/UserProductPageNavbar';

const UserProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products...');
      const response = await axios.get('https://product-mgmt-backend.onrender.com/products');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <UserProductPageNavbar />
      <div className='container mt-4'>
        <h2>User Product Page</h2>
        <p>This is the user product page. Only users can access this page.</p>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No products found</td>
                  </tr>
                ) : (
                  products.map(prod => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>{prod.name}</td>
                      <td>{prod.description}</td>
                      <td>${parseFloat(prod.price).toFixed(2)}</td>
                      <td>{prod.category}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Link to="/add-product">
                <Button color="primary">Add Product</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProductPage;
