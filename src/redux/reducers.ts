/* eslint-disable prettier/prettier */
import {SET_TASKS, SET_TASK_ID} from './actions';

const initialState = {
  tasks: [],
  taskID: 1,
};

function taskReducer(state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {
    case SET_TASKS:
      return {...state, tasks: action.payload};
    case SET_TASK_ID:
      return {...state, taskID: action.payload};
    default:
      return state;
  }
}

export default taskReducer;
