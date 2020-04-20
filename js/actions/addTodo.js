import { USER_EVENTS } from '../constants/constants.js';

const { ADD_TODO } = USER_EVENTS;

const addTodo = (id, text) => (
  {
    type: ADD_TODO,
    todo: {
      id,
      text,
      completed: false
    }
  }
);

export default addTodo;