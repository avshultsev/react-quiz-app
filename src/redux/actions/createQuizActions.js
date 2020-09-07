import axios from 'axios';
import {
  ADD_QUESTION, SET_QUIZ_EMPTY
} from "../actionTypes"

export const addQuestion = item => {
  return {
    type: ADD_QUESTION,
    item
  }
}

export const setCreatedQuizToNull = () => {
  return {
    type: SET_QUIZ_EMPTY
  }
}

/* THUNK */

export const createQuiz = () => async (dispatch, getState) => {
  await axios.post('https://react-quiz-8ea3a.firebaseio.com/quiz.json', getState().createQuiz.quiz);
  dispatch(setCreatedQuizToNull());
}