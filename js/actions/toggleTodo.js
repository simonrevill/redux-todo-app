import { USER_EVENTS } from '../constants/constants.js';

const { TOGGLE_TODO } = USER_EVENTS;

const toggleTodo = id => (
  {
    type: TOGGLE_TODO,
    id
  }
);

export default toggleTodo;