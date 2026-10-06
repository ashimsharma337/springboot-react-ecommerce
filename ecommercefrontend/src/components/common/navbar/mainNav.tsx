import { useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './mainNav.css';
import LoginComponent from '../../login/login';

function MainNav() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar className="navbar-custom" expand="lg">
        <Nav className="me-auto">
          <Nav.Link href="/sale">SALE</Nav.Link>
          <Nav.Link href="/products">PRODUCTS</Nav.Link>
          <Nav.Link href="/help">HELP</Nav.Link>
        </Nav>

        <Form style={{ width: '60%' }}>
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="input-field"
              style={{ boxShadow: 'none' }}
            />
            <Button variant="outline-secondary" id="button-search">
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>

        <Nav className="ms-auto">
          <Nav.Link href="/profile">PROFILE</Nav.Link>
          <Nav.Link href="/cart">CART</Nav.Link>
          {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
          ) : (
            <Nav.Link onClick={handleShowLogin}>LOGIN</Nav.Link>
          )}
          <Nav.Link href="/signup">SIGN UP</Nav.Link>
        </Nav>
      </Navbar>

      <LoginComponent
        show={showLogin}
        handleClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default MainNav;