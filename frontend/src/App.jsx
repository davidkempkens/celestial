import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
