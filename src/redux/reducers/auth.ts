/* eslint-disable prettier/prettier */
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;