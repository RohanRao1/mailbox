import React from "react";
import { Container, Navbar } from "react-bootstrap";


const Header = () => {
    return <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand className='text-info' style={{fontWeight : 'bold'}}>Mail Box</Navbar.Brand>
            </Container>
        </Navbar>

}

export default Header