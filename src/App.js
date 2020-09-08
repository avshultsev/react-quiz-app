import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import './App.css';
import Navbar from './containers/Navbar/Navbar.jsx';
import Auth from './containers/Auth/Auth.jsx';
import ActiveQuiz from './containers/ActiveQuiz.jsx';
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx';
import QuizList from './containers/QuizList/QuizList.jsx';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './redux/actions/authActions';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
        <Switch>
          <Route path='/quiz/:id'     component={ActiveQuiz} />
          <Route path='/auth'         component={Auth} />
          <Route path='/'       exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
    )
    
    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id'     component={ActiveQuiz} />
          <Route path='/logout'       component={Logout} />
          <Route path='/'       exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Navbar />

        { routes }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));