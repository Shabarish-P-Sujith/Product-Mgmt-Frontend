// import React from 'react'

// const EditProductPage = () => {
//   return (
//     <div>Edit Product</div>
//   );
// }

// export default EditProductPage;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditProductPageNavbar from '../Navbar/EditProductPageNavbar';

function EditProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID:', id);
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        console.log('Fetched product:', response.data);
        
        if (response.data) {
          setFormData({
            ...response.data,
            price: response.data.price.toString() // Convert price to string for input
          });
        } else {
          toast.error('Product not found');
          navigate('/admin-products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product details');
        navigate('/admin-products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Prepare the data for update
        const updatedData = {
          ...formData,
          id: id, // Ensure ID is included
          price: parseFloat(formData.price)
        };

        console.log('Updating product with data:', updatedData);
        
        // Make the PUT request
        const response = await axios.put(`http://localhost:3001/products/${id}`, updatedData);
        console.log('Update response:', response.data);

        if (response.status === 200) {
          toast.success('Product updated successfully!');
          navigate('/admin-products');
        }
      } catch (error) {
        console.error('Error updating product:', error.response || error);
        toast.error(error.response?.data?.message || 'Failed to update product. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div>
        <EditProductPageNavbar />
        <div className="d-flex justify-content-center align-items-center vh-75">
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EditProductPageNavbar />
      <div className="d-flex justify-content-center align-items-center vh-75 bg-light">
        <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <CardBody>
            <CardTitle tag="h4" className="text-center mb-4">
              Edit Product
            </CardTitle>

            <Form onSubmit={handleSubmit} noValidate>
              <FormGroup>
                <Label for="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  invalid={!!errors.name}
                />
                <FormFeedback>{errors.name}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  invalid={!!errors.description}
                />
                <FormFeedback>{errors.description}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  invalid={!!errors.price}
                />
                <FormFeedback>{errors.price}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  invalid={!!errors.category}
                />
                <FormFeedback>{errors.category}</FormFeedback>
              </FormGroup>

              <div className="d-grid mt-3">
                <Button color="primary" type="submit">
                  Update Product
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default EditProductPage;
