import React from 'react';
import './App.css';
import ActiveQuiz from './containers/ActiveQuiz'
import Navbar from './containers/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>It's the React quiz!</h1>
      <ActiveQuiz />
    </div>
  );
}

export default App;