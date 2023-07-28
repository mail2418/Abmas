/* eslint-disable prettier/prettier */
// import { User } from '../../model/users';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginSuccess = (user: any) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
});