/* eslint-disable prettier/prettier */
export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';

export const setTasks = (tasks:any) => (dispatch: any) => {
  dispatch({
    type: SET_TASKS,
    payload: tasks,
  });
};

export const setTaskID = (taskID:any) => (dispatch:any) => {
  dispatch({
    type: SET_TASK_ID,
    payload: taskID,
  });
};
