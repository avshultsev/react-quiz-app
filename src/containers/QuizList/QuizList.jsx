import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './QuizList.module.css';
import Loader from '../../UI/Loader/Loader';
import { connect } from 'react-redux';
import { getQuizesRequest } from '../../redux/actions/quizActions';

class QuizList extends Component {

  componentDidMount() {
    this.props.getQuizes();
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <h1>Quiz List</h1>
        {
          this.props.isFetching
            ? <Loader />
            : <ul>
              {
                this.props.quizes.map(quiz => {
                  return (
                    <li key={quiz.id}>
                      <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                      </NavLink>
                    </li>
                  )
                })
              }
            </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    quizes: state.quiz.quizes,
    isFetching: state.quiz.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuizes: () => dispatch(getQuizesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);