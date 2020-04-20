import { USER_EVENTS } from '../constants/constants.js';

const { CLEAR_ALL_TODOS } = USER_EVENTS;

const clearTodos = () => (
  {
    type: CLEAR_ALL_TODOS
  }
);

export default clearTodos;