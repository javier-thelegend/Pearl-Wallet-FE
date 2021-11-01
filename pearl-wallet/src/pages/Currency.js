import React, {useState} from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CurrencyTable from '../components/currencyTable/CurrencyTable'
import ExchangeTable from '../components/exchangeTable/ExchangeTable'

const Currency = () => {

    //useState to pass currencyId to Exchange
    const [currency, setCurrency] = useState();

    //Set Currency name to get exchanges
    const [name, setName] = useState()

    //Handle Click Event on Row
    const handleRowClick = (e) => {
        let selectedRow = e.target.parentElement;
        setCurrency(selectedRow.attributes.id.value);
        setName(selectedRow.attributes.name.value);
    }

    return (
        <Container className="main">
            <Row>
                <Col style={{textAlign: "center"}}>
                    <h5>Currencies</h5>
                </Col>
                <Col style={{textAlign: "center"}}>
                    <h5>{name} Exchanges</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CurrencyTable rowClickEvent={handleRowClick}/>
                </Col>
                <Col>
                    <ExchangeTable currency={currency}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Currency
