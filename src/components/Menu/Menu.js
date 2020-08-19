import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Menu.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/',             label: 'Quiz List',      exact: true},
    {to: '/auth',         label: 'Auth',          exact: false},
    {to: '/quiz-creator', label: 'Create a quiz', exact: false},
]

const Menu = props => {
    let isMenuOpen = props.isMenuOpen 
    return (
        <React.Fragment>
            <nav className={`${styles.Menu} ${isMenuOpen ? null : styles.close}`}>
                <ul>
                    {links.map( (link, index) => {
                        return (
                            <li key={index}>
                                <NavLink 
                                    to={link.to} 
                                    exact={link.exact}
                                    onClick={props.onClick}>
                                        {link.label}
                                </NavLink>
                            </li>
                        )
                    } )}
                </ul>
            </nav>

            {/* <Backdrop /> */}
            { isMenuOpen ? <Backdrop onClick={props.onClick} /> : null }
        </React.Fragment>
    )
}

export default Menu