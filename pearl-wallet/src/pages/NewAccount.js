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

const Account = () => {
    const [error, setError] = useState('')
    const history = useHistory()
    const [disabledSubmit, setDisabledSubmit] = useState(false)

    const accountRef = useRef()
    const bankRef = useRef()
    const balanceRef = useRef()
    const typeRef = useRef()

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()
    }

    const handleCancel = () => {
        history.push('/account')
    }

    return (
        <Container className="main">
            <Card className="account-card transaction-card">

                {/* Creating the form */}
                <Form onSubmit={handleSubmit}>

                    {/* Header */}
                    <Card.Header>Register Account</Card.Header>

                    <Card.Body>
                        <Card.Title>Complete the Form</Card.Title>
                        
                        {/* Show error if exists */}
                        {error && <Alert variant="warning">{error}</Alert>}

                            {/* Input Fields */}
                            <Form.Group as={Row} className="mb-3" id="account">
                                <Form.Label column sm="5">
                                Account Num
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" ref={accountRef} required placeholder="10000002256549" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="type">
                                <Form.Label column sm="5">
                                Type
                                </Form.Label>
                                <Col sm="5" style={{textAlign: 'initial', marginTop: '1%'}}>
                                    <Form.Check inline type='radio'>
                                        <Form.Check.Input type='radio' name='type' ref={typeRef}/>
                                        <Form.Check.Label>Saving Account</Form.Check.Label>                                    
                                    </Form.Check>
                                    <Form.Check inline type='radio'>
                                        <Form.Check.Input type='radio' name='type' ref={typeRef}/>
                                        <Form.Check.Label>Current Account</Form.Check.Label>                                    
                                    </Form.Check>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="bank">
                                <Form.Label column sm="5">
                                Bank
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Select ref={bankRef} required>
                                        <option>Banco Agricola</option>
                                        <option>Banco Azul</option>
                                        <option>Banco Cuscatlan</option>
                                        <option>Banco Credomatic</option>
                                        <option>Banco Promerica</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            {/* <Form.Group as={Row} className="mb-3" id="date">
                                <Form.Label column sm="5">
                                Date
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="date" ref={dateRef} max={new Date().getDate()} required />
                                </Col>
                            </Form.Group> */}

                            <Form.Group as={Row} className="mb-3" id="amount">
                                <Form.Label column sm="5">
                                Initial Balance
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" ref={balanceRef} required placeholder="9999.99" />
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

export default Account
