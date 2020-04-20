// Main Todo Helper Functions:

// Create a todo element:
export const createTodo = (element, html) => element.innerHTML = html;

// Create Todo HTML:
export const createTodoHtml = todoText => {
  return `
  <div class="d-flex justify-content-between align-items-center w-100">
    <span class="todo-text">${todoText}</span>
      <div class="d-flex justify-content-between todo-controls">
        <i class="far fa-check-square todo-controls__check"></i>
        <i class="fas fa-check-square todo-controls__checked d-none"></i>
        <i class="far fa-trash-alt todo-controls__delete"></i>
      </div>
  </div>
  `;
};

// Add an item to a list element:
export const addItemToList = (listElement, todoItem) => listElement.appendChild(todoItem);

// Generate unique ID:
export const generateId = () => uuidv4();