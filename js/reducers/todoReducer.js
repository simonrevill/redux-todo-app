import { USER_EVENTS } from '../constants/constants.js';

const { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_ALL_TODOS } = USER_EVENTS;

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: action.todo.id,
            text: action.todo.text,
            completed: action.todo.completed
          }
        ]
      };

    case TOGGLE_TODO:
      return {
        todos: [
          ...state.todos.map(todo => {
            return {
              ...todo,
              completed: todo.id === action.id ? !todo.completed : todo.completed
            }
          })
        ]
      };

    case DELETE_TODO:

      return {
        todos: [
          ...state.todos.filter(todo => {
            if (todo.id !== action.id) {
              return todo;
            }
          })
        ]
      };

    case CLEAR_ALL_TODOS:

      return {
        todos: []
      };

    default:

      return state;

  }
};

export default todoReducer;