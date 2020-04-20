// Main utility functions / 'functional' API:

// Get element:
export const select = classString => document.querySelector(classString);

// Get all elements:
export const selectAll = classString => document.querySelectorAll(classString);

// Get child element:
export const selectNodeWithin = (parentElement, childClassString) => parentElement.querySelector(childClassString);

// Get all child elements within specified node:
export const selectAllNodesWithin = (parentElement, childClassString) => parentElement.querySelectorAll(childClassString);

// Create new element:
export const createElement = typeString => document.createElement(typeString);

// Clear an element's inner HTML:
export const clearHtml = element => element.innerHTML = '';

// Add a single class or array of class name strings. Uses recursion.
// Parameters: accepts a single string, or an array of strings.
export const addClass = (element, classString) => element.classList.add(...[].concat(classString));

// Remove a single class or array of class name strings. Uses recursion.
// Parameters: accepts a single string, or an array of strings.
export const removeClass = (element, classString) => element.classList.remove(...[].concat(classString));

// Toggle a class:
export const toggleClass = (element, classString) => element.classList.toggle(classString);

// Check for existence of class:
export const hasClass = (element, classString) => element.classList.contains(classString);

// Clear an input field:
export const clearInput = inputElement => inputElement.value = '';

// Get an input element's value:
export const getInput = element => element.value;

// Validate input has length > 0:
export const validateInput = input => input.length > 0;

// Add an event listener:
export const addListener = (element, event, callback) => element.addEventListener(event, callback);

// Get closest target element from event target element:
export const getClosest = (event, classString) => event.target.closest(classString);

// Get data attribute from element:
export const getDataAttribute = (element, attributeString) => element.dataset[attributeString];

// Set data attribute on an element:
export const setDataAttribute = (element, attributeString, value) => element.dataset[attributeString] = value;

// Remove child element from parent:
export const removeChildNode = (parentNode, childNode) => parentNode.removeChild(childNode);

// Check for existence of child nodes in parent element:
export const hasChildNodes = element => element.childNodes.length;