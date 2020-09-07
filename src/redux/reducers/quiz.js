import {
  GET_QUIZES_SUCCESS,
  GET_QUIZES_ERROR,
  TURN_ON_FETCHING,
  FETCH_QUIZ_SUCCESS,
  SET_ANSWER_STATE,
  SET_QUIZ_FINISHED,
  SET_NEXT_QUESTION,
  SET_NULL_QUIZ
} from "../actionTypes";

const initialState = {
  quizes: [],
  isFetching: false,
  error: null,
/* activeQuiz state */ 
  currentQuestion: 0,
  isFinished: false,
  results: {},
  isCurrentCorrect: null,
  quiz: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case TURN_ON_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case GET_QUIZES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        quizes: action.payload
      };
    case GET_QUIZES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        quiz: action.payload
      }
    case SET_ANSWER_STATE:
      return {
        ...state,
        isCurrentCorrect: action.isCurrentCorrect,
        results: action.results
      }
    case SET_QUIZ_FINISHED:
      return {
        ...state,
        isCurrentCorrect: null,
        isFinished: true
      }
    case SET_NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        isCurrentCorrect: null
      }
    case SET_NULL_QUIZ:
      return {
        ...state,
        currentQuestion: 0,
        isFinished: false,
        results: {},
        isCurrentCorrect: null,
      }
    default:
      return state;
  }
}