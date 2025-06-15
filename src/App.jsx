import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminProductPage from './components/Pages/AdminProductPage';
import AddProductPage from './components/Pages/AddProductPage';
import EditProductPage from './components/Pages/EditProductPage';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import SignupPage from './components/Pages/SignupPage';
import UserProductPage from './components/Pages/UserProductPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
    return (
        <>
            <ToastContainer position="top-left" autoClose={2000} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Admin Routes */}
                <Route 
                    path="/admin-products" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminProductPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/edit/:id" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <EditProductPage />
                        </ProtectedRoute>
                    } 
                />

                {/* User Routes */}
                <Route 
                    path="/user-products" 
                    element={
                        <ProtectedRoute requiredRole="user">
                            <UserProductPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/add-product" 
                    element={
                        <ProtectedRoute requiredRole="user">
                            <AddProductPage />
                        </ProtectedRoute>
                    } 
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
