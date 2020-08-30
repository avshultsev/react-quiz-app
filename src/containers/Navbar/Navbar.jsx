import React from 'react'
import styles from './Navbar.module.css'
import Menu from '../../components/Menu/Menu.jsx'

class Navbar extends React.Component {
  state = {
    isMenuOpen: false
  }

  onToggleHandler = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  render() {
    return (
      <React.Fragment>
        {/* MenuToggle */}
        <div className={`${styles.MenuToggle} ${this.state.isMenuOpen && styles.open}`}>
          <i className={`fa ${this.state.isMenuOpen ? 'fa-times' : `fa-bars`}`}
            onClick={this.onToggleHandler} />
        </div>

        {/* Drawer */}
        <Menu isMenuOpen={this.state.isMenuOpen} onClick={this.onToggleHandler} />
      </React.Fragment>
    )
  }
}

export default Navbar