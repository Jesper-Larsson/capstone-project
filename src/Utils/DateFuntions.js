const getToday = () => new Date(Date.now());
const getTodayString = () => getToday().toLocaleDateString();

const initializeTimes = () => {
  return {
    selectedDate: getTodayString(),
    availableTimes: fetchAPI(getToday()),
  };
};

const updateTimes = (state, action) => {
  if (action.type === "changed_date") {
    return {
      selectedDate: action.selectedDate,
      availableTimes: fetchAPI(new Date(Date.parse(action.selectedDate))),
    };
  }
  throw Error("Unknown action.");
};

export { getTodayString, initializeTimes, updateTimes };
