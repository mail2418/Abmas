/* eslint-disable prettier/prettier */
import { SET_USER } from '../actions/user';

const userInitialState = {
    user: [
        {
            id: 1,
            email: 'user1@email.com',
            username: 'user11',
            password: 'password',
            userToken: 'token123'
        },
        {
            id: 2,
            email: 'user2@email.com',
            username: 'user2',
            password: 'pass1234',
            userToken: 'token12345'
        },
        {
            id: 3,
            email: 'testuser@email.com',
            username: 'testuser',
            password: 'testpass',
            userToken: 'testtoken'
        },
    ]
}

// function userReducer(state = userInitialState, action: { type: any; payload: any; }) {
//     switch (action.type) {
//         case SET_USER:
//             return { ...state, user: action.payload };
//         default:
//             return state;
//     }
// }

function userReducer(state = userInitialState, action: { type: any; payload: any; }) {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          user: [...state.user, action.payload], // Append the new user to the existing user array
        };
      default:
        return state;
    }
  }

export default userReducer;
