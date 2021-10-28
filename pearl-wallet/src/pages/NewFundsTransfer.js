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

import '../components/main/Main.css';

const NewFundsTransfer = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const history = useHistory()
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const account = localStorage.getItem('account');
    const balance = localStorage.getItem("balance");
    const currency = localStorage.getItem("currency");
    const currency_id = localStorage.getItem("currency_id");
    const authContext = useContext(AuthContext);
    const today = new Date();

    const accountOriginRef = useRef()
    const accountDestinyRef = useRef()
    const amountRef = useRef()
    const reasonRef = useRef()
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
            throw new Error("Error: " + result.message.column + " " + result.message.detail);
        } else {
            setSuccess(result.message);
        }
        setShow(true);
        // console.log(result);
    }

    const updateBalanceAccount = async (account, requestBody) => {
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
            throw new Error("Error: " + result.message.column + " " + result.message.detail);
        }
        // setShow(true);
        // console.log(result);
    }

    const getExchange = async (sourceCurrency,targetCurrency) => {
        // console.log('requestBody: ' + JSON.stringify(requestBody));
        let idToken = await authContext.currentUser.getIdToken();
        console.log(idToken);
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/exchange/${sourceCurrency}/${targetCurrency}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
        });
        
        let result = await response.json();
        // console.log(result.data[0]);
        return result.data[0];
    }

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()

        //Clean Error if exists
        setError('');

        //Disable button to avoid any new submit
        setDisabledSubmit(true);

        //Send request to Outgoing and Incoming Transfer
        try{           
            let newAccountOriginBalance = parseFloat(balance) - parseFloat(amountRef.current.value);
            let requestBody = {
                transaction_type: 15,   //Expenses
                category: 21,           //Outgoing Transfer
                account: accountOriginRef.current.value,
                amount: amountRef.current.value,
                reason: reasonRef.current.value,
                balance: newAccountOriginBalance,
                created_at: today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate(),
                transfer_account: accountDestinyRef.current.value
            }
            await createTransaction(requestBody);

            requestBody = {
                balance: newAccountOriginBalance
            }
            await updateBalanceAccount(accountOriginRef.current.value, requestBody);
            localStorage.setItem("balance", newAccountOriginBalance);

            //Exchange Implementation
            //-----------------------
            let accountOriginCurrency = currency_id;
            let accountDestinyCurrency = accountDestinyRef.current.childNodes[accountDestinyRef.current.selectedIndex].attributes.currencyId.value;
            let exchange = await getExchange(accountOriginCurrency, accountDestinyCurrency);
            //-----------------------
            
            amountRef.current.value = parseFloat(amountRef.current.value) * parseFloat(exchange.equivalence);
            let newAccountDestinyBalance = parseFloat(accountDestinyRef.current.childNodes[accountDestinyRef.current.selectedIndex].attributes.balance.value) + parseFloat(amountRef.current.value);
            requestBody = {
                transaction_type: 14,   //Income
                category: 17,           //Incoming Transfer
                account: accountDestinyRef.current.value,
                amount: amountRef.current.value,
                reason: reasonRef.current.value,
                balance: newAccountDestinyBalance,
                created_at: today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate(),
                transfer_account: accountOriginRef.current.value
            }
            await createTransaction(requestBody);

            requestBody = {
                balance: newAccountDestinyBalance
            }
            await updateBalanceAccount(accountDestinyRef.current.value, requestBody);
        }catch(e){
            setError(e);
            setShow(true);
        }

        //Enable button again
        setDisabledSubmit(false);

        //Clean variables
        accountDestinyRef.current.value = '';
        amountRef.current.value = '';
        reasonRef.current.value = '';
    }

    const handleCancel = () => {
        history.goBack();
    }

    //Fill Destiny Accounts Dropdown Options
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        // console.log(transactionType);
        const getAccounts = async () => {
            let idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${authContext.currentUser.uid}/accounts`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${idToken}`
                }
            });
            let accounts = await response.json();
            setAccounts(accounts.data);
            // console.log(accounts.data);
        }
        getAccounts();
    }, [disabledSubmit]);
    const accountsOptions = accounts.map((option) => {
        //Return all accounts diferent to Origin Account
        if(option.account != account) return <option key={option.account} 
                                                    value={option.account} 
                                                    balance={option.balance}
                                                    currencyId={option.currency_id}>
                                                        {option.account}
                                                </option>
    });

    //Hook to show/hide alert success/error
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(function (){
            setShow(false);
        },5000);
    }, [error, success])

    return (
        <Container className="main">
            <Card className="account-card form-card">

                {/* Creating the form */}
                <Form onSubmit={handleSubmit}>

                    {/* Header */}
                    <Card.Header>Register Local Funds Transfer</Card.Header>

                    <Card.Body>
                        <Card.Title>Complete the Form</Card.Title>
                        
                        {/* Show error if exists */}
                        {error && <Alert variant="danger" show={show} >{error}</Alert>}

                        {/* Show Success Message if exists */}
                        {success && <Alert variant="primary" show={show}>{success}</Alert>}

                            {/* Input Fields */}                            
                            <Form.Group as={Row} className="mb-3" id="originAccount">
                                <Form.Label column sm="5">
                                Origin Account
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" ref={accountOriginRef} value={account} disabled required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="balance">
                                <Form.Label column sm="5">
                                Balance
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" value={currency + " " + balance} disabled />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="destinyAccount">
                                <Form.Label column sm="5">
                                Destiny Account
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control as="select" ref={accountDestinyRef} required>
                                        <option value=''>---  Select an Option  ---</option>
                                        {accountsOptions}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="date">
                                <Form.Label column sm="5">
                                Date
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" disabled ref={dateRef}
                                                value={today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear()} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="reason">
                                <Form.Label column sm="5">
                                Reason
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" ref={reasonRef} placeholder="For food, gas, coffe, etc" required/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="amount">
                                <Form.Label column sm="5">
                                Amount
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" ref={amountRef} required placeholder="9999.99" step='any' min="0.01"/>
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
