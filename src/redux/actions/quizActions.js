import axios from 'axios';
import {
  GET_QUIZES_SUCCESS,
  GET_QUIZES_ERROR,
  TURN_ON_FETCHING,
  FETCH_QUIZ_SUCCESS,
  SET_ANSWER_STATE,
  SET_QUIZ_FINISHED,
  SET_NEXT_QUESTION,
  SET_NULL_QUIZ
} from '../actionTypes';

export const getQuizesSuccess = quizes => {
  return {
    type: GET_QUIZES_SUCCESS,
    payload: quizes
  }
}

export const getQuizesError = error => {
  return {
    type: GET_QUIZES_ERROR,
    payload: error
  }
}

export const turnOnFetching = () => {
  return {
    type: TURN_ON_FETCHING
  }
}

export const fetchQuizSuccess = data => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: data
  }
}

export const setAnswerState = (isCurrentCorrect, results) => {
  return {
    type: SET_ANSWER_STATE,
    isCurrentCorrect,
    results
  }
}

export const setQuizFinished = () => {
  return {
    type: SET_QUIZ_FINISHED
  }
}

export const setNextQuestion = () => {
  return {
    type: SET_NEXT_QUESTION
  }
}

export const onSetNullQuiz = () => {
  return {
    type: SET_NULL_QUIZ
  }
}

/* THUNK */

export const getQuizesRequest = () => async dispatch => {
  dispatch(turnOnFetching());
  
  try {
    const response = await axios.get('https://react-quiz-8ea3a.firebaseio.com/quiz.json');
    const quizes = [];

    Object.keys(response.data).map((key, index) => {
      return quizes.push({
        id: key,
        name: `Quiz #${index + 1}`
      });
    });

    dispatch(getQuizesSuccess(quizes));
  } catch (e) {
    dispatch(getQuizesError(e))
  }
}

export const getQuizRequest = id => async dispatch => {
  dispatch(turnOnFetching());

  try {
    const response = await axios.get(`https://react-quiz-8ea3a.firebaseio.com/quiz/${id}.json`);
    dispatch(fetchQuizSuccess(response.data))
  } catch (e) {
    dispatch(getQuizesError(e))
  }
}

export const onAnswerClickHanlder = id => (dispatch, getState) => {
    const state = getState().quiz;

    let currentQuizItem = state.quiz[state.currentQuestion];
    let results = { ...state.results };

    /* so that one cannot double click the correct answer in one question and finish the quiz */
    if (state.isCurrentCorrect && state.isCurrentCorrect[id] === 'correct') {
      return
    };

    if (id === currentQuizItem.correctAnswerId) { // if the answer is correct
      if (!results[currentQuizItem.id]) { // if one answered on this question correctly from the first try
        results[currentQuizItem.id] = 'correct'
      };
      dispatch(setAnswerState({ [id]: 'correct' }, results));
      
      const timeout = setTimeout(() => {
        if (state.currentQuestion + 1 === state.quiz.length) { // if it's the last question
          dispatch(setQuizFinished());
        } else {
          dispatch(setNextQuestion());
          clearTimeout(timeout);
        }
      }, 1500)
    } else { // if the answer is wrong
      results[currentQuizItem.id] = 'error';
      dispatch(setAnswerState({ [id]: 'error' }, results));
    }
}