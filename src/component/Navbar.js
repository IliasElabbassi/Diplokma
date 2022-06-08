import React, { useEffect, useState } from "react";
import {Navbar, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav'

function NavbarComponent(props) {
    const [address, setAddress] = useState(undefined)

    useEffect(() => {
        setAddress(props.address)
    }, [props.address]);

    return (
        <div className='container'>
            <Navbar>
            <Container>
                <Navbar.Brand href="/home">Diplokma App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <u>{address}</u>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <Nav fill variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/Diplomas" >
                        <Nav.Link>Diplomas</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/Create/diplomas" >
                        <Nav.Link>Create diplomas</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/managing/institute" >
                        <Nav.Link>institute managing</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default NavbarComponent;