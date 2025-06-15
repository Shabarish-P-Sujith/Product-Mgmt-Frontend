import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

const NotFoundPageNavbar = () => {
  return (
    <Navbar color="secondary" dark expand="md" container="md">
      <NavbarBrand>Error 404</NavbarBrand>
      <Nav className="ms-auto" navbar>
        <NavItem>
          <Link to="/" className="nav-link" style={linkStyle}>
            Home
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white'
};

export default NotFoundPageNavbar;