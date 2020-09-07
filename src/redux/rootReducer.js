import {combineReducers} from 'redux';
import quizReducer from './reducers/quiz';
import createQuizReducer from './reducers/createQuiz';

const rootReducer = combineReducers({
    quiz: quizReducer,
    createQuiz: createQuizReducer
});

export default rootReducer;