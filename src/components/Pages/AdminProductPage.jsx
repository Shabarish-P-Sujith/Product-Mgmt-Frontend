// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login, logout, isAdmin } from '../auth/authService';
// import AdminProductPageNavbar from '../Navbar/AdminProductPageNavbar'

// const AdminProductPage = () => {
//   return (
//     <div>
//         <AdminProductPageNavbar />
//         <div className='container'>
//             <h1>Admin Product Page</h1>
//             <p>This is the admin product page. Only admins can access this page.</p>
//         </div>
//     </div>
//   );
// }

// export default AdminProductPage;

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminProductPageNavbar from '../Navbar/AdminProductPageNavbar';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products for admin...');
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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Optimistically update the UI
        setProducts(prevProducts => prevProducts.filter(prod => prod.id !== id));
        
        // Make the API call
        await axios.delete(`https://product-mgmt-backend.onrender.com/products/${id}`);
        toast.success('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        // Revert the optimistic update if the API call fails
        fetchProducts();
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <div>
      <AdminProductPageNavbar />
      <div className='container mt-4'>
        <h2>Admin Product Page</h2>
        <p>This is the admin product page. Only admins can access this page.</p>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No products found</td>
                </tr>
              ) : (
                products.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>{prod.description}</td>
                    <td>${parseFloat(prod.price).toFixed(2)}</td>
                    <td>{prod.category}</td>
                    <td>
                      <Link to={`/edit/${prod.id}`}>
                        <Button color="primary" size="sm" className="me-2">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(prod.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminProductPage;
