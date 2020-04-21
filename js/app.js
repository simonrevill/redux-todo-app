import * as Utilities from './utils/utils.js';
import { createTodo, createTodoHtml, addItemToList, generateId } from './libraries/todo-helpers.js';

// Redux imports - remember to add combineReducers too later on:
// UUID is also added as a script for generating unique IDs.

import { USER_EVENTS, FILTER_EVENTS } from './constants/constants.js';
import todoReducer from './reducers/todoReducer.js';
import filterReducer from './reducers/filterReducer.js';
import addTodo from './actions/addTodo.js';
import toggleTodo from './actions/toggleTodo.js';
import deleteTodo from './actions/deleteTodo.js';
import clearTodos from './actions/clearTodos.js';
import toggleFilter from './actions/toggleFilter.js';

// The following constants will be used in the actions dispatched in the core app logic:

const { ADD_TODO, TOGGLE_TODO, DELETE_TODO, FILTER_TODOS, CLEAR_ALL_TODOS } = USER_EVENTS;
const { FILTER_ALL, FILTER_INCOMPLETE, FILTER_COMPLETED, ALL, INCOMPLETE, COMPLETED } = FILTER_EVENTS;

// Create Redux Store / Activate Redux DevTools:

const { createStore, combineReducers } = Redux;

const rootReducer = combineReducers({ todoReducer, filterReducer });

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// -------- CORE APP -------- //

// Global Variables - hopefully we can get rid of some of these in time:
const input = Utilities.select('.form-control');
const addTodoBtn = Utilities.select('.js-add-todo');
const todoList = Utilities.select('.js-todo-list');
const clearTodosBtn = Utilities.select('.js-clear-btn');
const filterGroup = Utilities.select('.js-filter-group');
const filterButtons = [...Utilities.selectAll('.js-filter-btn')];

// ... re-factor the following functions so they have
// relevant functions passed in - they must be pure ... //

// Manage todos:
const clearAllTodos = (todoList, clearTodosBtn) => {
  Utilities.clearHtml(todoList);
  Utilities.addClass(clearTodosBtn, 'd-none');
};

const deleteTodoItem = e => {
  const todo = Utilities.getClosest(e, '.js-todo-item');
  // Capture ID data attribute for Redux in next re-factor:
  const id = Utilities.getDataAttribute(todo, 'id');
  Utilities.removeChildNode(todoList, todo);
  !Utilities.hasChildNodes(todoList) ? Utilities.addClass(clearTodosBtn, 'd-none') : null;
};

const createTodoItem = todoText => {
  const newTodoItem = Utilities.createElement('li');
  Utilities.addClass(newTodoItem, ['list-group-item', 'js-todo-item']);
  createTodo(newTodoItem, createTodoHtml(todoText));
  Utilities.setDataAttribute(newTodoItem, 'id', generateId());
  return newTodoItem;
};

const toggleCompleted = e => {
  const todoItem = Utilities.getClosest(e, '.js-todo-item');
  Utilities.toggleClass(Utilities.selectNodeWithin(todoItem, '.todo-text'), 'todo-text--complete');
  Utilities.toggleClass(Utilities.selectNodeWithin(todoItem, '.todo-controls__check'), 'd-none');
  Utilities.toggleClass(Utilities.selectNodeWithin(todoItem, '.todo-controls__checked'), 'd-none');
  Utilities.toggleClass(todoItem, 'completed');
};

const addTodoItem = () => {
  const todoText = Utilities.getInput(input);
  if (!Utilities.validateInput(todoText)) return;
  const newTodoItem = createTodoItem(todoText);
  Utilities.addListener(newTodoItem, 'click', toggleCompleted);
  Utilities.addListener(Utilities.selectNodeWithin(newTodoItem, '.todo-controls__delete'), 'click', deleteTodoItem);
  addItemToList(todoList, newTodoItem);
  Utilities.clearInput(input);
  Utilities.removeClass(clearTodosBtn, 'd-none');
  Utilities.addListener(clearTodosBtn, 'click', () => clearAllTodos(todoList, clearTodosBtn));
};

// Manage filters:
const filterTodoItems = targetFilter => {
  const currentTodoItems = Utilities.selectAllNodesWithin(todoList, '.js-todo-item');
  switch (targetFilter) {
    case 'All':
      currentTodoItems.forEach(item => Utilities.removeClass(item, 'd-none'));
      break;
    case 'Incomplete':
      currentTodoItems.forEach(item => {
        Utilities.removeClass(item, 'd-none');
        if (Utilities.hasClass(item, 'completed')) {
          Utilities.addClass(item, 'd-none');
        }
      });
      break;
    case 'Completed':
      currentTodoItems.forEach(item => {
        Utilities.removeClass(item, 'd-none');
        if (!Utilities.hasClass(item, 'completed')) {
          Utilities.addClass(item, 'd-none');
        }
      });
      break;
    default:
      currentTodoItems.forEach(item => Utilities.removeClass(item, 'd-none'));
  }
};

const activateFilters = (filters, targetFilter) => {
  filters.forEach(filter => {
    if (Utilities.getDataAttribute(filter, 'filter') === targetFilter) {
      Utilities.removeClass(filter, 'btn-outline-primary');
      Utilities.addClass(filter, 'btn-primary');
    }
    Utilities.removeClass(filter, 'btn-primary');
    Utilities.addClass(filter, 'btn-outline-primary');
  });
  filterTodoItems(targetFilter);
};

const toggleFilters = e => activateFilters(filterButtons, Utilities.getDataAttribute(e.target, 'filter'));

//Set up listeners for filters and user input:
Utilities.addListener(filterGroup, 'click', toggleFilters);
Utilities.addListener(addTodoBtn, 'click', addTodoItem);
Utilities.addListener(input, 'keyup', e => e.keyCode === 13 ? addTodoItem() : null);




// -------- REDUX -------- //

// Test Dispatch Actions to Redux Store:

// addTodoItem ---------------- //:

store.dispatch(addTodo(1, 'Go shopping'));
store.dispatch(addTodo(2, 'Walk the dog'));
store.dispatch(addTodo(3, 'Wash the car'));
store.dispatch(addTodo(4, 'Do the dishes'));

console.log('added 4 new todos. state: ', store.getState());

// toggleCompleted: ---------------- //

store.dispatch(toggleTodo(1));
store.dispatch(toggleTodo(2));

console.log('toggled todos 1 and 2. state: ', store.getState());

// toggleFilter: ---------------- //

store.dispatch(toggleFilter(FILTER_INCOMPLETE, INCOMPLETE));
store.dispatch(toggleFilter(FILTER_ALL, ALL));
store.dispatch(toggleFilter(FILTER_COMPLETED, COMPLETED));

console.log('toggled filters. state: ', store.getState());

// deleteTodo:  ---------------- //

store.dispatch(deleteTodo(1));
store.dispatch(deleteTodo(2));

console.log('deleted todos 1 and 2. state: ', store.getState());

// clearTodos: ---------------- //

store.dispatch(clearTodos());

console.log('cleared all todos. state: ', store.getState());

// Subscribe to the Redux store:

function logState() {
  console.log(store.getState());
}

store.subscribe(() => logState);


// Tests:

// var elm = createElement("div");
// addClass(elm, "test");
// console.assert(elm.classList.contains("test"), "addClass is failing to add a class string");
// var elm2 = createElement("div");
// addClass(elm2, ["test", "multi"]);
// console.assert(elm2.classList.contains("test"), "addClass is failing to add a class array");
// console.assert(elm2.classList.contains("multi"), "addClass is failing to add multiple class array");