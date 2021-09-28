import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as Icon from 'react-bootstrap-icons'

import '../components/main/Main.css'

const Login = () => {
    return (
        <Container className="main">
            <Card className="account-card">
                <Card.Header>Welcome!</Card.Header>
                <Card.Body>
                    <Card.Title>Account Balance</Card.Title>
                    <Card.Text>$ 3,750.00</Card.Text>
                    <Button className="account-link-button"  variant="default">
                        <Icon.Pen color='black' size={16}/> Edit
                    </Button>
                    <Button className="account-link-button" variant="default">
                        <Icon.Trash color='black' size={16}/> Delete
                    </Button>
                </Card.Body>
                <Card.Footer className="text-muted">Banco Agricola - Saving Account</Card.Footer>
            </Card>
        </Container>
    )
}

export default Login
