import { FILTER_EVENTS } from '../constants/constants.js';

const { FILTER_ALL, FILTER_INCOMPLETE, FILTER_COMPLETED, ALL, INCOMPLETE, COMPLETED } = FILTER_EVENTS;

const initialState = {
  activeFilter: ALL
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {

    case FILTER_ALL:

      return {
        activeFilter: ALL
      };

    case FILTER_INCOMPLETE:

      return {
        activeFilter: INCOMPLETE
      };

    case FILTER_COMPLETED:

      return {
        activeFilter: COMPLETED
      };

    default:

      return state;

  }
};

export default filterReducer;