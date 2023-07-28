/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers/task';
import userReducer from './reducers/user';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({ 
    taskReducer, 
    userReducer,
    authReducer,
 });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
