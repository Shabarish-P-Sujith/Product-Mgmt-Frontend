import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

const EditProductPageNavbar = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Product Manager</NavbarBrand>
      <Nav className="ms-auto" navbar>
        <NavItem>
          <Link to="/product" className="nav-link">
            Back
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default EditProductPageNavbar;
