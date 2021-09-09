import React from 'react'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DoorOpen } from 'react-bootstrap-icons';
import Menu from '../menu/Menu';

const Header = (props) => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">Pearl Wallet</Navbar.Brand>
                {/* <Navbar.Toggle/> */}
                <Navbar.Collapse className="justify-content-end">
                <Menu/>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as:
                    </Navbar.Text>
                    <NavDropdown title={props.userName} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"><DoorOpen size={14}/> Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
