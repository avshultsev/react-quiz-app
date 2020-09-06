import axios from 'axios';
import {
  GET_QUIZES_SUCCESS,
  GET_QUIZES_ERROR,
  TURN_ON_FETCHING
} from './actionTypes';

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