import React from 'react'
import { useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom'

import '../components/main/Main.css';
import './Account.css';
import AccountChart from '../components/accountChart/AccountChart';
import AccountTable from '../components/accountTable/AccountTable';

const spanSize = 15;

const Account = () => {

    const history = useHistory()

    const handleNewAccount = () => {
        history.push('/account/new')
    }

    const handleNewFundsTransfer = () => {
        history.push('/transfer/new')
    }

    const handleNewTransaction = () => {
        history.push('/transaction/new')
    }

    return (
        <Container className="main">
            <Row>
                <Col sm={4}>
                    {/* Add New Account */}
                    <Button className="account-button account-button-new" variant="primary" title='Add a New Account' onClick={handleNewAccount}>
                        <Icon.FileEarmark color='white' size={spanSize}/> New Account
                    </Button>

                    {/* Previous Account */}
                    <Button className="account-button" variant="primary" title='Previous Account'>
                        <Icon.ArrowLeft color='white' size={spanSize}/>
                    </Button>

                    {/* Next Account */}
                    <Button className="account-button" variant="primary" title='Next Account'>
                        <Icon.ArrowRight color='white' size={spanSize}/>
                    </Button>
                    
                    {/* Card Account Presentation */}
                    <Card className="account-card">
                        <Card.Header>Account Num. 1000003265789</Card.Header>
                        <Card.Body>
                            <Card.Title>Account Balance</Card.Title>
                            <Card.Text>$ 3,750.00</Card.Text>
                            <Button className="account-link-button"  variant="default">
                                <Icon.Pen color='black' size={spanSize}/> Edit
                            </Button>
                            <Button className="account-link-button" variant="default">
                                <Icon.Trash color='black' size={spanSize}/> Delete
                            </Button>
                            <Button className="account-link-button"  variant="default" onClick={handleNewFundsTransfer}>
                                <Icon.Laptop color='black' size={spanSize}/> Transfer
                            </Button>
                            <Button className="account-link-button" variant="default" onClick={handleNewTransaction}>
                                <Icon.ArrowDownUp color='black' size={spanSize}/> Income / Expenses
                            </Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Banco Agricola - Saving Account</Card.Footer>
                    </Card>

                    {/* Add Chart */}
                    <AccountChart />
                </Col>

                <Col sm={8}>
                    {/* Add Movements Table */}
                    <AccountTable />
                </Col>
            </Row>
        </Container>
    )
}

export default Account
