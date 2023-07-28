/* eslint-disable prettier/prettier */
// import { User } from '../../model/users';


export const SET_USER = 'SET_USER';

export const setUser = (user:any) => (dispatch: any) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};
