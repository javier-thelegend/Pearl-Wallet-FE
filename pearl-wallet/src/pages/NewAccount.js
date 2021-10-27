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

const Account = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const history = useHistory()
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const account = localStorage.getItem('account')
    const authContext = useContext(AuthContext);

    //Field references
    const accountRef = useRef()
    const bankRef = useRef()
    const balanceRef = useRef()
    const currencyRef = useRef()
    const typeRef = useRef()

    //Get Account for Edition
    const getAccount = async () => {
        let idToken = await authContext.currentUser.getIdToken();
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account/${account}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });
        let acc = await response.json();
        return acc;
    }

    //Function to generate request
    const createAccount = async (requestBody) => {
        // console.log('requestBody: ' + JSON.stringify(requestBody));
        let idToken = await authContext.currentUser.getIdToken();
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account`, {
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
        // setShow(true);
        // console.log(result);
    }

    //Update/Edit Account
    const updateAccount = async (requestBody) => {
        // console.log('requestBody: ' + JSON.stringify(requestBody));
        let idToken = await authContext.currentUser.getIdToken();
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account/${account}`, {
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
        } else {
            setSuccess(result.message);
        }
        setShow(true);
        // console.log(result);
    }

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
            // setError("Error: " + result.message.column + " " + result.message.detail);
            throw new Error("Error: " + result.message.column + " " + result.message.detail);
        } else {
            setSuccess(result.message);
        }
        setShow(true);
        // console.log(result);
    }

    const handleSubmit = async (e) => {
        //Stop default implementation of event
        e.preventDefault()
        // console.log("Account Type: " + accountType);
        // console.log("Currency: " + currencyRef.current.value);
        // console.log("Bank: " + bankRef.current.value);

        //Clean Error if exists
        setError('');

        //Disable button to avoid any new submit
        setDisabledSubmit(true);

        //Send request to create account
        try{
            let requestBody = {};
            if(!account) {
                requestBody = {
                    account: accountRef.current.value,
                    accountType: accountType,
                    balance: balanceRef.current.value,
                    currency: currencyRef.current.value,
                    bank: bankRef.current.value
                };
                await createAccount(requestBody);

                //Create Record for Account Opening Transaction
                let today = new Date();
                requestBody = {
                    transaction_type: 14,
                    category: 36,
                    account: accountRef.current.value,
                    amount: balanceRef.current.value,
                    reason: null,
                    balance: balanceRef.current.value,
                    created_at: today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(),
                    transfer_account: null,
                };
                await createTransaction(requestBody);
            } else {
                requestBody = {
                    accountType: accountType,
                    currency: currencyRef.current.value,
                    bank: bankRef.current.value
                };
                await updateAccount(requestBody);
            }
        }catch(e){
            setError(e);
            setShow(true);
        }

        //Enable button again
        setDisabledSubmit(false);

        //Clean variables
        // setAccountType(); //Trigger error intentionally 2nd creation
        if(!account) {
            accountRef.current.value = '';
            currencyRef.current.value = '';
            bankRef.current.value = '';
            balanceRef.current.value = '';
        }
    }

    const handleCancel = () => {
        history.goBack()
    }

    //To Get AccountType, Currency and Bank Value
    const [accountType, setAccountType] = useState();
    const [currency, setCurrency] = useState();
    const [bank, setBank] = useState();

    //Fill Account Type RadioButton Options
    const accountTypesCatalogId = 1;
    const [accountTypes, setAccountTypes] = useState([]);
    useEffect(() => {
        const getAccountTypes = async () => {
            let idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/catalog/${accountTypesCatalogId}/detail`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${idToken}`
                }
              });
            let accountTypes = await response.json();
            setAccountTypes(accountTypes.data);
            // console.log(accountTypes);
        }
        getAccountTypes();
    }, []);
    
    //Update Account Form in case is an Edition
    useEffect(async () => {
        if(account){
            const acc = await getAccount();
            balanceRef.current.value = acc.data[0].balance;
            setCurrency(acc.data[0].currency);
            setBank(acc.data[0].bank);
            setAccountType(acc.data[0].account_type);
        }
    }, []);
    const accountTypesOptions = accountTypes.map((rb) => {
        return <Form.Check inline type='radio'>
            <Form.Check.Input type='radio' name='type' ref={typeRef} required 
                                onChange={() => setAccountType(rb.id)}
                                checked={accountType == rb.id}/>
            <Form.Check.Label>&nbsp;{rb.description}</Form.Check.Label>
        </Form.Check>
    });

    //Fill Currency Dropdown Options
    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        const getCurrencies = async () => {
            let idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/currency`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${idToken}`
                }
              });
            let currencies = await response.json();
            setCurrencies(currencies.data);
            // console.log(currencies);
        }
        getCurrencies();
    }, []);
    const currenciesOptions = currencies.map((option) => 
                                <option key={option.id} value={option.id} selected={option.id == currency}>
                                    {option.iso_code}
                                </option>);

    //Fill Bank Dropdown Options
    const bankCatalogId = 4;
    const [banks, setBanks] = useState([]);
    useEffect(() => {
        const getBanks = async () => {
            let idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/catalog/${bankCatalogId}/detail`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${idToken}`
                }
              });
            let banks = await response.json();
            setBanks(banks.data);
            // console.log(banks);
        }
        getBanks();
    }, []);
    const banksOptions = banks.map((option) => 
                            <option key={option.id} value={option.id} selected={option.id == bank}>
                                {option.description}
                            </option>);

    //Hook to show/hide alert success/error
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(function (){
            setShow(false);
        },5000);
    }, [error, success]);

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
                        {error && <Alert variant="danger" show={show} >{error}</Alert>}

                        {/* Show Success Message if exists */}
                        {success && <Alert variant="primary" show={show}>{success}</Alert>}

                            {/* Input Fields */}
                            <Form.Group as={Row} className="mb-3" id="account">
                                <Form.Label column sm="5">
                                Account Num
                                </Form.Label>
                                <Col sm="5">
                                    {account && <Form.Control type="text" ref={accountRef} value={account} disabled required />}
                                    {!account && <Form.Control type="text" ref={accountRef} required placeholder="10000002256549" />}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="type">
                                <Form.Label column sm="5">
                                Type
                                </Form.Label>
                                <Col sm="5" style={{textAlign: 'initial', marginTop: '1%'}}>
                                    {accountTypesOptions}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="currency">
                                <Form.Label column sm="5">
                                Currency
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control as='select' ref={currencyRef} required>
                                        <option value=''>---  Select an Option  ---</option>
                                        {currenciesOptions}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="bank">
                                <Form.Label column sm="5">
                                Bank
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control as='select' ref={bankRef} required>
                                        <option value=''>---  Select an Option  ---</option>
                                        {banksOptions}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" id="amount">
                                <Form.Label column sm="5">
                                Initial Balance
                                </Form.Label>
                                <Col sm="5">
                                    {account && <Form.Control type="number" ref={balanceRef} disabled required />}
                                    {!account && <Form.Control type="number" ref={balanceRef} required placeholder="9999.99" step='any' min="0.01"/>}
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
