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

import '../components/main/Main.css'
import './Transaction.css'

const Transaction = () => {
    const [error, setError] = useState('')
    const history = useHistory()
    const [disabledSubmit, setDisabledSubmit] = useState(false)

    const accountRef = useRef()
    const categoryRef = useRef()
    const amountRef = useRef()
    const typeRef = useRef()
    const dateRef = useRef()

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()
    }

    const handleCancel = () => {
        history.goBack();
    }

    return (
        <Container className="main">
            <Card className="account-card transaction-card">

                {/* Creating the form */}
                <Form onSubmit={handleSubmit}>

                    {/* Header */}
                    <Card.Header>Register Inconme / Expenses</Card.Header>

                    <Card.Body>
                        <Card.Title>Complete the Form</Card.Title>
                        
                        {/* Show error if exists */}
                        {error && <Alert variant="warning">{error}</Alert>}

                            {/* Input Fields */}
                            <Form.Group as={Row} className="mb-3" id="account">
                                <Form.Label column sm="5">
                                Account
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Select ref={accountRef} required>
                                        <option>1000023654</option>
                                        <option>1077845522</option>
                                        <option>0000245587</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="type">
                                <Form.Label column sm="5">
                                Type
                                </Form.Label>
                                <Col sm="5" style={{textAlign: 'initial', marginTop: '1%'}}>
                                    <Form.Check inline type='radio'>
                                        <Form.Check.Input type='radio' name='type' ref={typeRef}/>
                                        <Form.Check.Label>Income</Form.Check.Label>                                    
                                    </Form.Check>
                                    <Form.Check inline type='radio'>
                                        <Form.Check.Input type='radio' name='type' ref={typeRef}/>
                                        <Form.Check.Label>Expenses</Form.Check.Label>                                    
                                    </Form.Check>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="category">
                                <Form.Label column sm="5">
                                Category
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Select ref={categoryRef} required>
                                        <option>Medicine</option>
                                        <option>Grosery</option>
                                        <option>Gasoline</option>
                                        <option>Tax</option>
                                        <option>Credit Card</option>
                                        <option>Lending</option>
                                        <option>Car Fee</option>
                                        <option>Salary</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="date">
                                <Form.Label column sm="5">
                                Date
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="date" ref={dateRef} max={new Date().getDate()} required />
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

export default Transaction
