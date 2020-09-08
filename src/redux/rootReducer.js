import {combineReducers} from 'redux';
import quizReducer from './reducers/quiz';
import createQuizReducer from './reducers/createQuiz';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    quiz: quizReducer,
    createQuiz: createQuizReducer,
    auth: authReducer,
});

export default rootReducer;