import {
  ADD_QUESTION, SET_QUIZ_EMPTY, 
} from "../actionTypes";

const initialState = {
  quiz: []
};

export default function createQuizReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      };
    case SET_QUIZ_EMPTY:
      return {
        ...state,
        quiz: []
      }
    default:
      return state;
  }
}