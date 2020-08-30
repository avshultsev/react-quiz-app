import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './containers/Navbar/Navbar.jsx';
import Auth from './containers/Auth/Auth.jsx';
import ActiveQuiz from './containers/ActiveQuiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route path='/auth'         component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id'     component={ActiveQuiz} />
        <Route path='/'             component={QuizList} />
      </Switch>
    </div>
  );
}

export default App;