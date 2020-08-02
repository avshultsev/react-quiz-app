import React from 'react'
import styles from './Menu.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    1, 2, 3, 4, 5
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
                                <a>Link {link}</a>
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