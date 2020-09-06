import {combineReducers} from 'redux';
import quizReducer from './reducers/quiz';

const rootReducer = combineReducers({quiz: quizReducer});

export default rootReducer;