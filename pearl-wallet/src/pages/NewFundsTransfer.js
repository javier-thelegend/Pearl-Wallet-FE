import React from 'react'
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as Icon from 'react-bootstrap-icons'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import '../components/main/Main.css';

const NewFundsTransfer = () => {
    const [error, setError] = useState('')
    const history = useHistory()
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const account = localStorage.getItem('account')

    const accountOriginRef = useRef()
    const accountDestinyRef = useRef()
    const amountRef = useRef()
    const dateRef = useRef()
    const reasonRef = useRef()

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()
    }

    const handleCancel = () => {
        localStorage.removeItem("account")
        history.goBack();
    }

    const today = new Date();

    return (
        <Container className="main">
            <Card className="account-card transaction-card">

                {/* Creating the form */}
                <Form onSubmit={handleSubmit}>

                    {/* Header */}
                    <Card.Header>Register Local Funds Transfer</Card.Header>

                    <Card.Body>
                        <Card.Title>Complete the Form</Card.Title>
                        
                        {/* Show error if exists */}
                        {error && <Alert variant="warning">{error}</Alert>}

                            {/* Input Fields */}

                            <Form.Group as={Row} className="mb-3" id="date">
                                <Form.Label column sm="5">
                                Date
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" ref={dateRef} disabled value={today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()} />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} className="mb-3" id="originAccount">
                                <Form.Label column sm="5">
                                Origin Account
                                </Form.Label>
                                <Col sm="5">
                                    {account && <Form.Control type="text" ref={accountOriginRef} value={account} disabled required />}
                                    {!account && 
                                        <Form.Select ref={accountOriginRef} required>
                                            <option>1000023654</option>
                                            <option>1077845522</option>
                                            <option>0000245587</option>
                                        </Form.Select>
                                    }
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="destinyAccount">
                                <Form.Label column sm="5">
                                Destiny Account
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Select ref={accountDestinyRef} required>
                                        <option>1000023654</option>
                                        <option>1077845522</option>
                                        <option>0000245587</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="reason">
                                <Form.Label column sm="5">
                                Reason
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" ref={reasonRef} placeholder="For food, gas, coffe, etc" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="amount">
                                <Form.Label column sm="5">
                                Amount
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" ref={amountRef} required placeholder="99.99" />
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

export default NewFundsTransfer
