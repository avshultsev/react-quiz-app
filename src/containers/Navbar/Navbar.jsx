import React from 'react'
import styles from './Navbar.module.css'
import Menu from '../../components/Menu/Menu.jsx'
import { connect } from 'react-redux'

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
        <Menu 
          isAuth={this.props.isAuth} 
          isMenuOpen={this.state.isMenuOpen} 
          onClick={this.onToggleHandler} 
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Navbar); 