import React from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css'
import ActiveQuiz from './containers/ActiveQuiz'
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Navbar from './containers/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>It's the React quiz!</h1>
      {/* <ActiveQuiz /> */}

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