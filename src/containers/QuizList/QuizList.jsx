import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styles from './QuizList.module.css';
import Loader from '../../UI/Loader/Loader';

export default class QuizList extends Component {
  state = {
    quizes: [],
    isFetching: true
  }

  renderList() {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>
            { quiz.name }
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-8ea3a.firebaseio.com/quiz.json');
      const quizes = [];

      Object.keys(response.data).map((key, index) => {
        return quizes.push({
          id: key,
          name: `Quiz #${index + 1}`
        });
      })

      this.setState({ 
        quizes,
        isFetching: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <h1>Quiz List</h1>
        {
          this.state.isFetching 
            ? <Loader />
            : <ul>{ this.renderList() }</ul>
        }
      </div>
    )
  }
}
