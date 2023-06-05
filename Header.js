import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap/esm";
import {Link,  } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authentication";


const Header = () => {
    const dispatch = useDispatch()
    const isLoggedin = useSelector(state => state.auth.isAuthenticated)

    const logoutHandler = () => {
        dispatch(authActions.logout())
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="text-info" style={{ fontWeight: "bold" }}>
            Mail Box
          </Navbar.Brand>
          <Nav className="me-auto m-1">
            {!isLoggedin && <Link to="/login" className="text-light text-decoration-none m-2">
              Login
            </Link>}
            {isLoggedin && <Link to="/composemail" className="text-light text-decoration-none m-2">
              Compose Email
            </Link>}
            {isLoggedin && <Link to="/login" className="text-light text-decoration-none m-2" onClick={logoutHandler}>
              Logout
            </Link>}
            
          </Nav>
        </Container>
      </Navbar>
    );

}

export default Header