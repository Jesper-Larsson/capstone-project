const getTodayString = () => new Date(Date.now()).toLocaleDateString();

const initializeTimes = () => {
  return {
    selectedDate: getTodayString(),
    availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
  };
};

const updateTimes = (state, action) => {
  if (action.type === "changed_date") {
    return {
      selectedDate: action.selectedDate,
      availableTimes: getAvaliableTimesForDate(action.selectedDate),
    };
  }
  throw Error("Unknown action.");
};

const getAvaliableTimesForDate = (date) => {
  return ["18:00", "19:45", "20:00", "22:30"];
};

export { getTodayString, initializeTimes, updateTimes };
