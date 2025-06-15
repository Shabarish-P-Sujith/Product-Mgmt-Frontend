// import React from 'react'
// import AddProductPageNavbar from '../Navbar/AddProductPageNavbar'

// const AddProductPage = () => {
//   return (
//         <div>Add Product</div>    
//   );
// }

// export default AddProductPage;  

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import AddProductPageNavbar from '../Navbar/AddProductPageNavbar';

function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product Name is required';
    if (!formData.description.trim()) newErrors.description = 'Product Description is required';
    if (!formData.price.trim()) newErrors.price = 'Product Price is required';
    if (!formData.category.trim()) newErrors.category = 'Product Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log('Submitting product data:', formData);
        const response = await axios.post('http://localhost:3001/products', {
          ...formData,
          price: parseFloat(formData.price) // Convert price to number
        });
        
        console.log('Server response:', response.data);
        
        if (response.status === 201 || response.status === 200) {
          toast.success('Product added successfully!');
          navigate('/user-products');
        }
      } catch (error) {
        console.error('Error details:', error.response || error);
        toast.error(error.response?.data?.message || 'Failed to add product. Please try again.');
      }
    }
  };

  return (
    <>
      <AddProductPageNavbar />

      <div
        className="d-flex justify-content-center align-items-start bg-light"
        style={{ minHeight: '80vh', paddingTop: '80px' }} 
      >
        <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <CardBody>
            <CardTitle tag="h4" className="text-center mb-4">
              Add Product
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
                <Label for="description">Product Description</Label>
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
                <Label for="price">Product Price</Label>
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
                <Label for="category">Product Category</Label>
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
                <Button color="dark" type="submit">
                  Add Product
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default AddProductPage;
