import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from 'reactstrap';

function LoginPageNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="warning" dark expand="md" container="md">
      <NavbarBrand>Login</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link" style={linkStyle}>Back</Link>
          </NavItem>
          <NavItem>
            <Link to="/login" className="nav-link" style={linkStyle}>Login</Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: 'white'
};

export default LoginPageNavbar;
