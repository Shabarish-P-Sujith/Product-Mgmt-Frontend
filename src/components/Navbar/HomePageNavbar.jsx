import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, isAdmin, isUser } from '../auth/authService';
import { toast } from 'react-toastify';

const HomePageNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Product Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                {isAdmin() && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin-products">Admin Products</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/edit">Edit Products</Link>
                    </li>
                  </>
                )}
                {isUser() && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/user-products">View Products</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/add-product">Add Product</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
