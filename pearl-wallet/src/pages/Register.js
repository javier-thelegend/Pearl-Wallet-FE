import React from 'react'
import { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as Icon from 'react-bootstrap-icons'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import AuthContext from '../context/auth-context'

import './Register.css'

const Register = () => {
    //Error variable
    const [error, setError] = useState('')
    //disabledSubmit 
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    
    //References to inputs
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    //Contexts
    const authContext = useContext(AuthContext)

    //Hook to move in pages
    const history = useHistory()

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()

        //Own implementation
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError("Passwords does not match...")
        }

        try {
            //Clean any previos error
            setError('')

            //When request is sent disable button
            setDisabledSubmit(true)

            //Call Promise
            await authContext.register(emailRef.current.value, passwordRef.current.value)

            // Moving to dashboard page
            history.push('/')
        } catch {
            //Any error return message
            setError("Failed to Create Account")
        }

        //When request is complete enable button
        setDisabledSubmit(false)
    }

    const handleCancel = () => {
        history.push('/login')
    }

    return (
        <Container className="main register-card">
            <Card className="account-card">

                {/* Creating the form */}
                <Form onSubmit={handleSubmit}>

                    {/* Header */}
                    <Card.Header>Register</Card.Header>

                    <Card.Body>
                        <Card.Title>Create Your Account!</Card.Title>
                        
                        {/* Show error if exists */}
                        {error && <Alert variant="warning">{error}</Alert>}

                            {/* Input Fields */}
                            <Form.Group as={Row} className="mb-3" id="email">
                                <Form.Label column sm="5">
                                Email
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="email" ref={emailRef} required placeholder="email@example.com" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="password">
                                <Form.Label column sm="5">
                                Password
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="password" ref={passwordRef} required placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="confirmPassword">
                                <Form.Label column sm="5">
                                Confirm Password
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="password" ref={confirmPasswordRef} required placeholder="Confirm Password" />
                                </Col>
                            </Form.Group>
                    </Card.Body>
                    
                    {/* Buttons Events with Style */}
                    <Card.Footer className="text-muted">
                        <Button className="account-link-button"  
                            disabled={disabledSubmit}
                            variant="primary"
                            type="submit">
                            <Icon.Save color='white' size={16}/> Save
                        </Button>
                        <Button className="account-link-button" 
                            variant="primary"
                            onClick={handleCancel}>
                            <Icon.XCircle color='white' size={16}/> Cancel
                        </Button>
                    </Card.Footer>

                    {/* End Form */}
                </Form>
            </Card>
        </Container>
    )
}

export default Register
