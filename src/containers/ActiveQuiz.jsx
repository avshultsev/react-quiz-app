import React from 'react';
import axios from 'axios';
import AnswerList from '../components/AnswerList/AnswerList';
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz';
import styles from './ActiveQuiz.module.css';
import Loader from '../UI/Loader/Loader.jsx';

class ActiveQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    isFinished: false,
    results: {},
    isCurrentCorrect: null,
    isFetching: true,
    quiz: []
  }

  onClickHandler = id => {
    let currentQuizItem = this.state.quiz[this.state.currentQuestion];
    let results = { ...this.state.results };

    /* so that one cannot double click the correct answer in one question and finish the quiz */
    if (this.state.isCurrentCorrect && this.state.isCurrentCorrect[id] === 'correct') {
      return
    }

    if (id === currentQuizItem.correctAnswerId) { // if the answer is correct
      if (!results[currentQuizItem.id]) { // if one answered on this question correctly from the first try
        results[currentQuizItem.id] = 'correct'
      }

      this.setState(state => ({
        isCurrentCorrect: { [id]: 'correct' },
        results
      }))

      const timeout = setTimeout(() => {
        if (this.state.currentQuestion + 1 === this.state.quiz.length) { // if it's the last question
          this.setState({
            isCurrentCorrect: null,
            isFinished: true
          })
        } else {
          this.setState(state => (
            {
              currentQuestion: state.currentQuestion + 1,
              isCurrentCorrect: null
            }
          ))
          clearTimeout(timeout);
        }
      }, 1500)
    } else { // if the answer is wrong
      results[currentQuizItem.id] = 'error'
      this.setState(state => ({
        isCurrentCorrect: { [id]: 'error' },
        results
      }))
    }
  }

  onRestartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      isFinished: false,
      results: {},
      isCurrentCorrect: null,
    })
  }

  async componentDidMount() {
    console.log(this.props.match.params.id)

    try {
      const response = await axios.get(`https://react-quiz-8ea3a.firebaseio.com/quiz/${this.props.match.params.id}.json`);
      this.setState({
        quiz: response.data,
        isFetching: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let currentQuizItem = this.state.quiz[this.state.currentQuestion];
    let quizLength = this.state.quiz.length;

    return (
      <div className={styles.activeQuiz}>
        <h1>It's the React quiz!</h1>
        {
          this.state.isFetching
            ? <Loader />
            : this.state.isFinished
              ? <FinishedQuiz
                quizLength={quizLength}
                results={this.state.results}
                quiz={this.state.quiz}
                onRestartQuiz={this.onRestartQuiz.bind(this)}
              />
              : <AnswerList
                currentQuizItem={currentQuizItem}
                currentQuestion={this.state.currentQuestion}
                quizLength={quizLength}
                onClickHandler={this.onClickHandler.bind(this)}
                answers={currentQuizItem.answers}
                isCorrect={this.state.isCurrentCorrect}
              />
        }
      </div>
    )
  }
}

export default ActiveQuiz;