import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/auth-context';

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
    const [success, setSuccess] = useState('')
    const history = useHistory()
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const account = localStorage.getItem('account');
    const balance = localStorage.getItem("balance");
    const authContext = useContext(AuthContext);
    const today = new Date();

    //Field references
    const accountRef = useRef()
    const categoryRef = useRef()
    const amountRef = useRef()
    const dateRef = useRef()

    //Function to generate request
    const createTransaction = async (requestBody) => {
        // console.log('requestBody: ' + JSON.stringify(requestBody));
        let idToken = await authContext.currentUser.getIdToken();
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/transaction`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        let result = await response.json();
        if(!result.valid){
            setError("Error: " + result.message.column + " " + result.message.detail);
        } else {
            setSuccess(result.message);
        }
        setShow(true);
        // console.log(result);
    }

    const updateBalanceAccount = async (requestBody) => {
        // console.log('requestBody: ' + JSON.stringify(requestBody));
        let idToken = await authContext.currentUser.getIdToken();
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account/${account}/balance`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        let result = await response.json();
        if(!result.valid){
            setError("Error: " + result.message.column + " " + result.message.detail);
        }
        setShow(true);
        // console.log(result);
    }

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()

        //Clean Error if exists
        setError('');

        //Disable button to avoid any new submit
        setDisabledSubmit(true);

        //Send request to create account
        try{
            let newBalance = transactionType == 14 ? parseFloat(balance) + parseFloat(amountRef.current.value) : parseFloat(balance) - parseFloat(amountRef.current.value);
            let requestBody = {
                transaction_type: transactionType,
                category: categoryRef.current.value,
                account: accountRef.current.value,
                amount: amountRef.current.value,
                reason: 'null',
                balance: newBalance,
                created_at: dateRef.current.value
            };
            await createTransaction(requestBody);
            
            requestBody = {
                balance: newBalance
            }
            await updateBalanceAccount(requestBody);
            localStorage.setItem("balance", newBalance);
        }catch(e){
            setError(e);
            setShow(true);
        }

        //Enable button again
        setDisabledSubmit(false);

        //Clean variables
        categoryRef.current.value = '';
        amountRef.current.value = '';
        dateRef.current.value = '';
    }

    const handleCancel = () => {
        history.goBack();
    }

    //To Get AccountType Value
    const [transactionType, setTransactionType] = useState();

    //Fill Type RadioButton Options
    const transactionTypesCatalogId = 13;
    const [transactionTypes, setTransactionTypes] = useState([]);
    useEffect(() => {
        const getTransactionTypes = async () => {
            let idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/catalog/${transactionTypesCatalogId}/detail`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${idToken}`
                }
              });
            let transactionTypes = await response.json();
            setTransactionTypes(transactionTypes.data);
            // console.log(accountTypes);
        }
        getTransactionTypes();
    }, []);
    const transactionTypesOptions = transactionTypes.map((rb) => (
        <Form.Check inline type='radio'>
            <Form.Check.Input type='radio' name='type' required onChange={() => setTransactionType(rb.id)}/>
            <Form.Check.Label>&nbsp;{rb.description}</Form.Check.Label>
        </Form.Check>
    ));

    //Fill Category Dropdown Options
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // console.log(transactionType);
        const getCategories = async () => {
            if(transactionType){
                let idToken = await authContext.currentUser.getIdToken();
                let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/catalog/${transactionType}/detail`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${idToken}`
                    }
                });
                let categories = await response.json();
                setCategories(categories.data);
                // console.log(categories);
            }
        }
        getCategories();
    }, [transactionType]);
    const categoriesOptions = categories.map((option) => <option key={option.id} value={option.id}>{option.description}</option>);

    //Hook to show/hide alert success/error
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(function (){
            setShow(false);
        },5000);
    }, [error, success])

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
                        {error && <Alert variant="danger" show={show} >{error}</Alert>}

                        {/* Show Success Message if exists */}
                        {success && <Alert variant="primary" show={show}>{success}</Alert>}

                            {/* Input Fields */}
                            <Form.Group as={Row} className="mb-3" id="account">
                                <Form.Label column sm="5">
                                Account
                                </Form.Label>
                                <Col sm="5">
                                    {account && <Form.Control type="text" ref={accountRef} value={account} disabled required />}
                                    {!account && 
                                        <Form.Select ref={accountRef} required>
                                            <option>1000023654</option>
                                            <option>1077845522</option>
                                            <option>0000245587</option>
                                        </Form.Select>
                                    }
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="type">
                                <Form.Label column sm="5">
                                Type
                                </Form.Label>
                                <Col sm="5" style={{textAlign: 'initial', marginTop: '1%'}}>
                                    {transactionTypesOptions}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="category">
                                <Form.Label column sm="5">
                                Category
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control as='select' ref={categoryRef} required>
                                        <option value=''>---  Select an Option  ---</option>
                                        {categoriesOptions}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="date">
                                <Form.Label column sm="5">
                                Date
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="date" ref={dateRef} max={today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="amount">
                                <Form.Label column sm="5">
                                Amount
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" ref={amountRef} required placeholder="9999.99" step='any' />
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
