import React from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import MenuCss from './Menu.module.css';

const colorList = ['green', 'orange', 'red', 'blue'];
const spanSize = 14;
const spanBgColor = {backgroundColor: 'white'};

const Menu = () => {
    return (
        <nav className={MenuCss.nav}>
            <ul className={MenuCss.ul}>
                <li className={MenuCss.li} style={{backgroundColor: colorList[0]}}>
                    <Link to="/" className={MenuCss.a} style={{color: colorList[0]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.Wallet2 color={colorList[0]} size={spanSize}/> Dashboard
                        </span>
                    </Link>
                </li>
                <li className={MenuCss.li} style={{backgroundColor: colorList[1]}}>
                    <Link to="/history" className={MenuCss.a} style={{color: colorList[1]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.Stack color={colorList[1]} size={spanSize}/> History
                        </span>
                    </Link>
                </li>
                <li className={MenuCss.li} style={{backgroundColor: colorList[2]}}>
                    <Link to="/currency" className={MenuCss.a} style={{color: colorList[2]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.CurrencyExchange color={colorList[2]} size={spanSize}/> Currency &amp; Exchanges
                        </span>
                    </Link>
                </li>
                {/* <li className={MenuCss.li} style={{backgroundColor: colorList[3]}}>
                    <Link to="/transaction" className={MenuCss.a} style={{color: colorList[3]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.FileEarmarkMedicalFill color={colorList[3]} size={spanSize}/> History
                        </span>
                    </Link>
                </li> */}
            </ul>
        </nav>
    )
}

export default Menu
