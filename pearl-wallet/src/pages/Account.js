import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/auth-context';

import '../components/main/Main.css';
import './Account.css';
import AccountChart from '../components/accountChart/AccountChart';
import AccountTable from '../components/accountTable/AccountTable';

const spanSize = 15;

const Account = () => {
    const [error, setError] = useState('')
    const authContext = useContext(AuthContext);
    const history = useHistory()
    // console.log(authContext.currentUser.accessToken);

    const handleLoadPage = (e) => {
        if(e.target.value == '/account/new') localStorage.clear();
        history.push(e.target.value);
    }

    const handleEditAccount = (e) => {        
        history.push(e.target.value);
    }

    const handleDeleteAccount = async (e) => {
        let c = window.confirm("Do you want to delete this account?");
        if(c){
            let idToken = await authContext.currentUser.getIdToken();
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account/${userAccounts[accountIndex].account}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${idToken}`
                }
            });
            
            let result = await response.json();
            if(!result.valid){
                setError("Error: " + result.message.column + " " + result.message.detail);
                setShow(true);
            } else {
                //Reload the page instead of remove account from userAccounts
                localStorage.clear();
                window.location.reload();
            }
            // console.log(result);
        }
    }

     //Get Accounts of User
     const [userAccounts, setUserAccounts] = useState([{account: '', balance: '', currency: '', account_type: '', bank: ''}]);
     useEffect(() => {
         const getUserAccounts = async () => {
             const idToken = await authContext.currentUser.getIdToken();
             let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${authContext.currentUser.uid}/accounts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                });
             let userAccounts = await response.json();
             //Go to create account if there is no account for user
             if(userAccounts.data.length == 0){
                 history.push("/account/new");
             }
             setUserAccounts(userAccounts.data);
         }
         getUserAccounts();
     }, []);

    //Another way to get Accounts of User
    // const getUserAccounts = async () => {
    //     const idToken = await authContext.currentUser.getIdToken();
    //     let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${authContext.currentUser.uid}/accounts`, {
    //         method: 'GET',
    //         headers: {
    //           'Authorization': `Bearer ${idToken}`
    //         }
    //       });
    //     let userAccounts = await response.json();
    //     return userAccounts;
    // }
    // useEffect(async () => {
    //     try{
    //         const list = await getUserAccounts();
    //         setUserAccounts(list.data);
    //         console.log(userAccounts);
    //     }catch(e){
    //         console.log(e);
    //     }
    // }, []);

    //Disable Prev/Next Buttons
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrev, setDisablePrev] = useState(false);

    //To show account in position 'index'
    const [index, setIndex] = useState(0);
    const [accountIndex, setAccountIndex] = useState(index);
    const handlePrevIndex = (e) => {
        let i = index - 1;
        if(i >= 0){
            setAccountIndex(i);
            setIndex(i);
            setToLocalStorage(userAccounts[i]);
            setDisableNext(false);
        } else {
            setDisablePrev(true);
        }
    }

    const handleNextIndex = (e) => {
        let i = index + 1;
        if(i < userAccounts.length) {
            setAccountIndex(i);
            setIndex(i);
            setToLocalStorage(userAccounts[i]);
            setDisablePrev(false);
        } else {
            setDisableNext(true);
        }
    }

    const setToLocalStorage = (userAccount) => {
        localStorage.setItem("account", userAccount.account);
        localStorage.setItem("balance", userAccount.balance);
        localStorage.setItem("currency", userAccount.currency);
        localStorage.setItem("currency_id", userAccount.currency_id);
    }

    //Set index to account stored in localStorage
    //If I dont do this when I move to other page and comes back to the dashboard
    //it loads userAccounts[0] information
    useEffect(() => {
        if(userAccounts[accountIndex].account) {
            let account = localStorage.getItem("account");
            if(account){
                for(let a = 0 ; a < userAccounts.length ; a++){
                    if(userAccounts[a].account == account && accountIndex != a){
                        setAccountIndex(a);
                        setIndex(a); 
                    }
                }
            } else {
                setToLocalStorage(userAccounts[accountIndex]);
            }
        }
    }, [userAccounts, accountIndex]);

    //Hook to show/hide alert success/error
    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(function (){
            setShow(false);
        },2000);
    }, [error])

    return (
        <Container className="main">
            <Row>
                <Col sm={4}>
                    {/* Add New Account */}
                    <Button className="account-button account-button-new" variant="primary" title='Add a New Account' 
                        onClick={handleLoadPage} value='/account/new'>
                        <Icon.FileEarmark color='white' size={spanSize}/> New Account
                    </Button>

                    {/* Previous Account */}
                    <Button className="account-button" variant="primary" title='Previous Account'
                        onClick={handlePrevIndex} disabled={disablePrev}>
                        <Icon.ArrowLeft color='white' size={spanSize}/>
                    </Button>

                    {/* Next Account */}
                    <Button className="account-button" variant="primary" title='Next Account'
                        onClick={handleNextIndex} disabled={disableNext}>
                        <Icon.ArrowRight color='white' size={spanSize}/>
                    </Button>

                    {/* Show error if exists */}
                    {error && <Alert variant="danger" show={show} style={{textAlign: 'center'}}>{error}</Alert>}
                    
                    {/* Card Account Presentation */}
                    <Card className="account-card">
                        <Card.Header>Account Num. {userAccounts[accountIndex].account}</Card.Header>
                        <Card.Body>
                            <Card.Title>Account Balance</Card.Title>
                            <Card.Text>{userAccounts[accountIndex].currency} {userAccounts[accountIndex].balance}</Card.Text>
                            <Button className="account-link-button"  variant="default"
                                onClick={handleEditAccount} value='/account/new'>
                                <Icon.Pen color='black' size={spanSize}/> Edit
                            </Button>
                            <Button className="account-link-button" variant="default"
                                onClick={handleDeleteAccount}>
                                <Icon.Trash color='black' size={spanSize}/> Delete
                            </Button>
                            <Button className="account-link-button"  variant="default" 
                                onClick={handleLoadPage} value='/transfer/new'>
                                <Icon.Laptop color='black' size={spanSize}/> Transfer
                            </Button>
                            <Button className="account-link-button" variant="default" 
                                onClick={handleLoadPage} value='/transaction/new'>
                                <Icon.ArrowDownUp color='black' size={spanSize}/> Income / Expenses
                            </Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">{userAccounts[accountIndex].bank} - {userAccounts[accountIndex].account_type}</Card.Footer>
                    </Card>

                    {/* Add Chart */}
                    <AccountChart />
                </Col>

                <Col sm>
                    {/* Add Movements Table */}
                    {localStorage.getItem("account") && <AccountTable account={localStorage.getItem("account")} />}
                    {!localStorage.getItem("account") && <AccountTable account={userAccounts[accountIndex].account} />}
                </Col>
            </Row>
        </Container>
    )
}

export default Account
