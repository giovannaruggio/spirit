import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";

import SignUpForm from "../../pages/Signup";
import LoginForm from "../../pages/Login";
import Logo from "../../assets/SpiritLogo.png";

import Auth from "../../utils/auth";


const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <style type="text/css">
    {`
    #brand {
      height: 100px;
      width:100%;
      margin: 0;
    }

    `}
      </style>
      <Navbar fixed="top" bg="white" variant="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
          <img id="brand" src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/search">
                Search for Cocktails
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                    Your Cocktails
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          {/* tab container to do either signup or login component */}
          
          <style type="text/css">
    {`
    .nav-pills .nav-link.active {
      background-color: black;
      color: white;
    }

    .nav-pills .nav-link {
      color: black;
    }
    `}
  </style>
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
    </>
  );
};

export default Header;

{
  /* <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Spirit</h1>
          </Link>
          <p className="m-0">Create your own drink collection</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <span>Logged in as {Auth.getProfile().data.username}</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg btn-info m-2" to="/search">
                Search
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
          
        </div>
      </div>
    </header> */
}
