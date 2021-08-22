//A simple redux store/actions/reducer implementation.
//A true app would be more complex and separated into different files.
import { createStore } from 'redux';

//The actions are the 'names' of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK'
};

//The action creators bundles actions with the data required to execute them.
//The action creators are pure functions that return an action.
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

//All our reducers simply change the state of a single task.
//The reducers are pure functions that return a new state.
function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task => 
        task.id === action.id ? { ...task, state: taskState } : task
        ),
    };
  };
}

//The reducer describes how the contents of the store change for each action.
//The reducer is a pure function that returns a new state.
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

//The initial state of our store when the app loads.
//Usually this would be loaded from a server.
const defaultTasks = [
  { id: '1', title: 'Get up', state: 'TASK_INBOX' },
  { id: '2', title: 'Go to the gym', state: 'TASK_INBOX' },
  { id: '3', title: 'Make a reservation', state: 'TASK_INBOX' },
  { id: '4', title: 'Go to the store', state: 'TASK_INBOX' },
];

//We export the constructed redux store and the actions and action creators.
export default createStore(reducer, {tasks: defaultTasks});