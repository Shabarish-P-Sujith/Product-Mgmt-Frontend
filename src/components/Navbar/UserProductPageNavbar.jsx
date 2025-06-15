import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from 'reactstrap';

function UserProductPageNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <Navbar color="dark" dark expand="md" container="md">
      <NavbarBrand>Product Details</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <span onClick={handleSignOut} className="nav-link" style={linkStyle} role="button">
              Sign Out
            </span>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  cursor: 'pointer'
};

export default UserProductPageNavbar;
