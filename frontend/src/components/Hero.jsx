import { Container, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication</h1>
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className="d-flex">
            <NavLink to="/login" className="btn btn-primary me-3">
              Sign In
            </NavLink>
            <NavLink to="/register" className="btn btn-secondary">
              Register
            </NavLink>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
