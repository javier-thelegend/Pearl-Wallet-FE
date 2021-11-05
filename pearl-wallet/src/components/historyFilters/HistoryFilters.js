import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import AuthContext from '../../context/auth-context';

import Container from 'react-bootstrap/esm/Container'
import { Button, Col, Row, Form } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import FilterCss from './HistoryFilters.module.css';

//Using props to receive function from Parent Component
const HistoryFilters = (props) => {
    const authContext = useContext(AuthContext);
    const today = new Date();

    //Field references
    const accountRef = useRef();
    const fromDateRef = useRef();
    const toDateRef = useRef();
    const categoryRef = useRef();

    //Fill User Account Dropdown Options
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
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
    }, []);
    const accountsOptions = accounts.map((option) => {
        return <option key={option.account} 
                    value={option.account} 
                    balance={option.balance}
                    currencyId={option.currency_id}>
                        {option.account}
                </option>
    });

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
            // console.log(transactionTypes);
        }
        getTransactionTypes();
    }, []);
    const transactionTypesOptions = transactionTypes.map((option) => <option key={option.id} value={option.id}>{option.description}</option>);

    //Get params from here and sent them to the parent component
    const handleSubmit = (e) => {
        //Stop default implementation of event
        e.preventDefault();

        //Prepare params to return
        const params = {
            account: accountRef.current.value,
            fromDate: fromDateRef.current.value,
            toDate: toDateRef.current.value,
            category: categoryRef.current.value
        }

        //Send data to parent component through function passed as property
        props.onSearchClick(params);
    }

    const handleClean = (e) => {
        //Cleaning fields
        accountRef.current.value = "";
        fromDateRef.current.value = "";
        toDateRef.current.value = "";
        categoryRef.current.value = "";

        //Submit filters
        handleSubmit(e);
    }

    return (
        <Container>
            {/* Creating the form */}
            <Form>
                <Row>
                    <Col sm="10">
                        {/* Input Fields */}
                        <Form.Group as={Row} className="mb-3" id="account">
                            <Col sm="2">
                                <span className={FilterCss.formLabel}>Account</span>
                                <Form.Control as="select" ref={accountRef} required className={FilterCss.formControl}>
                                    <option value=''>---  Select an Option  ---</option>
                                    {accountsOptions}
                                </Form.Control>
                            </Col>

                            <Col sm="2">
                                <span className={FilterCss.formLabel}>From Date</span>
                                <Form.Control ref={fromDateRef} type="date"
                                    max={today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate() < 10 ? '0'+today.getDate() : today.getDate())}
                                    className={FilterCss.formControl}/>
                            </Col>

                            <Col sm="2">
                                <span className={FilterCss.formLabel}>To Date</span>
                                <Form.Control ref={toDateRef} type="date" 
                                    max={today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate() < 10 ? '0'+today.getDate() : today.getDate())}
                                    className={FilterCss.formControl}/>
                            </Col>

                            <Col sm="2" style={{textAlign: 'center'}}>
                                <span className={FilterCss.formLabel}>Category</span>
                                <Form.Control as="select" ref={categoryRef} className={FilterCss.formControl}>
                                    <option value=''>All</option>
                                    {transactionTypesOptions}
                                </Form.Control>
                            </Col>

                            {/* <Col sm="2">
                                <span className={FilterCss.formLabel}>Detail</span>
                                <Form.Control as="select" className={FilterCss.formControl}>
                                    <option value=''>---  Select an Option  ---</option>
                                    {accountsOptions}
                                </Form.Control>
                            </Col> */}

                            <Col sm="2">
                                <span className={FilterCss.formLabel}>&nbsp;</span>
                                <Button className="account-link-button"  
                                    variant="primary"
                                    onClick={handleSubmit}
                                    type="submit">
                                    <Icon.BinocularsFill color='white' size={16}/> Search
                                </Button>
                                <Button className="account-link-button"  
                                    variant="primary"
                                    onClick={handleClean}
                                    type="submit">
                                    <Icon.FunnelFill color='white' size={16}/> Clear
                                </Button>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default HistoryFilters
