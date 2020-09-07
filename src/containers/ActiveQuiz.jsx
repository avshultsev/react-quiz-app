import React from 'react';
import AnswerList from '../components/AnswerList/AnswerList';
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz';
import styles from './ActiveQuiz.module.css';
import Loader from '../UI/Loader/Loader.jsx';
import { connect } from 'react-redux';
import { getQuizRequest, onAnswerClickHanlder, onSetNullQuiz } from '../redux/actions';

class ActiveQuiz extends React.Component {
  

  componentDidMount() {
    this.props.getQuiz(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onSetNullQuiz();
  }

  render() {
    return (
      <div className={styles.activeQuiz}>
        <h1>It's the React quiz!</h1>
        {
          this.props.isFetching || !this.props.quiz
            ? <Loader />
            : this.props.isFinished
              ? <FinishedQuiz
                  quizLength={this.props.quiz.length}
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRestartQuiz={this.props.onSetNullQuiz} //method
                />
              : <AnswerList
                  currentQuizItem={this.props.quiz[this.props.currentQuestion]}
                  currentQuestion={this.props.currentQuestion}
                  quizLength={this.props.quiz.length}
                  answers={this.props.quiz[this.props.currentQuestion].answers}
                  isCorrect={this.props.isCurrentCorrect}
                  onClickHandler={this.props.onAnswerClickHanlder} //method
                />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: state.quiz.currentQuestion,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    isCurrentCorrect: state.quiz.isCurrentCorrect,
    quiz: state.quiz.quiz,
    isFetching: state.quiz.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuiz: id => dispatch(getQuizRequest(id)),
    onAnswerClickHanlder: answerId => dispatch(onAnswerClickHanlder(answerId)),
    onSetNullQuiz: () => dispatch(onSetNullQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveQuiz);