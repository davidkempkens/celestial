import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavLink to="/" className="navbar-brand">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/login" className="nav-link">
                <FaSignInAlt /> Sign In
              </NavLink>

              <NavLink to="/register" className="nav-link">
                <FaSignOutAlt /> Sign Up
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
