import React from 'react'
import { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'

import HistoryFilters from '../components/historyFilters/HistoryFilters'
import HistoryTable from '../components/historyTable/HistoryTable'

import '../components/main/Main.css';

const History = () => {
    const [account, setAccount] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [category, setCategory] = useState('');
    
    //Handle Search Event to get params from HistoryFilters
    //and pass them to HistoryTable
    const handleSearchClick = (childComponentData) => {
        //childComponentData conatins a json with the params selected in filters
        setAccount(childComponentData.account);
        setFromDate(childComponentData.fromDate);
        setToDate(childComponentData.toDate);
        setCategory(childComponentData.category);
    }

    return (
        <Container className="main">
            {/* Table Filter pass handleSearchClick function as property to the child in order to get selected parametes in form */}
            <HistoryFilters onSearchClick={handleSearchClick}/>

            {/* Table Result */}
            <HistoryTable account={account} fromDate={fromDate} toDate={toDate} category={category}/>
        </Container>
    )
}

export default History
