const toggleFilter = (filterEvent, filter) => (
  {
    type: filterEvent,
    activeFilter: filter
  }
);

export default toggleFilter;