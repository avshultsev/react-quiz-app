import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const Menu = props => {
  let links = [
    { to: '/', label: 'Quiz List', exact: true },
  ];

  if(props.isAuth) {
    links.push(
      { to: '/quiz-creator', label: 'Create a quiz', exact: false },
      { to: '/logout',       label: 'Log out',       exact: false },
    )
  } else {
    links.push(
      { to: '/auth', label: 'Auth', exact: false },
    )
  }

  let isMenuOpen = props.isMenuOpen;
  
  console.log('props.isAuth', props.isAuth);
  return (
    <React.Fragment>
      <nav className={`${styles.Menu} ${isMenuOpen ? null : styles.close}`}>
        <ul>
          {links.map((link, index) => {
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
          })}
        </ul>
      </nav>

      {/* <Backdrop /> */}
      {isMenuOpen ? <Backdrop onClick={props.onClick} /> : null}
    </React.Fragment>
  )
}

export default Menu