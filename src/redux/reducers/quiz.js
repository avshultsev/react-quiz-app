import {
  GET_QUIZES_SUCCESS,
  GET_QUIZES_ERROR,
  TURN_ON_FETCHING
} from "../actionTypes";

const initialState = {
  quizes: [],
  isFetching: false,
  error: null
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
    default:
      return state;
  }
}