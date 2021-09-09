import React from 'react'
import * as Icon from 'react-bootstrap-icons';

import MenuCss from './Menu.module.css';

const colorList = ['blue', 'orange', 'green', 'red'];
const spanSize = 14;
const spanBgColor = {backgroundColor: 'white'};

const Menu = () => {
    return (
        <nav className={MenuCss.nav}>
            <ul className={MenuCss.ul}>
                <li className={MenuCss.li} style={{backgroundColor: colorList[0]}}>
                    <a href="#" className={MenuCss.a} style={{color: colorList[0]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.Wallet2 color={colorList[0]} size={spanSize}/> Accounts
                        </span>
                    </a>
                </li>
                <li className={MenuCss.li} style={{backgroundColor: colorList[1]}}>
                    <a href="#" className={MenuCss.a} style={{color: colorList[1]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.Laptop color={colorList[1]} size={spanSize}/> Transfers
                        </span>
                    </a>
                </li>
                <li className={MenuCss.li} style={{backgroundColor: colorList[2]}}>
                    <a href="#" className={MenuCss.a} style={{color: colorList[2]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.Download color={colorList[2]} size={spanSize}/> Income
                        </span>
                    </a>
                </li>
                <li className={MenuCss.li} style={{backgroundColor: colorList[3]}}>
                    <a href="#" className={MenuCss.a} style={{color: colorList[3]}}>
                        <span className={MenuCss.span} style={spanBgColor}>
                            <Icon.Upload color={colorList[3]} size={spanSize}/> Expenses
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Menu
