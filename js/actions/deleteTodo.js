import { USER_EVENTS } from '../constants/constants.js';

const { DELETE_TODO } = USER_EVENTS;

const deleteTodo = id => (
  {
    type: DELETE_TODO,
    id
  }
);

export default deleteTodo;