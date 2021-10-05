import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Alert from 'react-bootstrap/Alert'
import { DoorOpen } from 'react-bootstrap-icons'
import { useState, useContext } from 'react'
import AuthContext from '../../context/auth-context'

// Hooks allow to move in pages
import { useHistory } from 'react-router-dom'

import Menu from '../menu/Menu'

const Header = (props) => {
    // Initializing context and variables
    const authContext = useContext(AuthContext)
    const [error, setError] = useState('')
    const history = useHistory()
    
    // asyn always is requires when consume an api
    const HandlerLogOut = async () => {
        try {
            setError("")
            await authContext.logout()
            
            // Moving to register page
            history.push('/login')
        } catch {
            setError("Not possible to Log Out")
        }
    }

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Pearl Wallet</Navbar.Brand>
                    {/* <Navbar.Toggle/> */}
                    <Navbar.Collapse className="justify-content-end">
                    <Menu/>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as:
                        </Navbar.Text>
                        <NavDropdown title={authContext.currentUser.email} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={HandlerLogOut}><DoorOpen size={14}/> Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {error && <Alert variant="danger">{error}</Alert>}
        </>
    )
}

export default Header
