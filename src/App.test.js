import { fireEvent, render, screen } from "@testing-library/react";
import BookingForm from "./BookingPage/Stages/BookingForm";
import App from "./App";
import {
  getTodayString,
  initializeTimes,
  updateTimes,
} from "./Utils/DateFuntions";

//basic rendering
test("renders booking form", () => {
  const dummyFunc = () => {};
  render(
    <BookingForm
      date="2024-10-02"
      setDate={dummyFunc}
      time="17:00"
      noOfGuests={1}
      setNoOfGuests={dummyFunc}
      occasion="-"
      setOccasion={dummyFunc}
      goToConfirmation={dummyFunc}
      availableTimes={["17:00", "22:00"]}
      minDate="2024-10-02"
    />
  );
  const header = screen.getByText(/Enter booking information/i);
  expect(header).toBeInTheDocument();
});

test("test selectable times and datepicker", () => {
  //initialize app with state
  render(<App />);
  const goToBookingButton = screen.getByRole("button", {
    name: /Reserve a Table/,
  });
  //go to booking page
  fireEvent.click(goToBookingButton);
  const timeDropDown = screen.getByLabelText(/Select a time */);
  expect(timeDropDown).toBeInTheDocument();

  const timeOptionsAtStart = Array.from(timeDropDown.children).map(
    (option) => option.textContent
  );

  const expectedAvailableTimesAtStart = initializeTimes().availableTimes;

  expect(expectedAvailableTimesAtStart).toEqual([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);

  expect(timeOptionsAtStart).toEqual(expectedAvailableTimesAtStart);

  const datepicker = screen.getByLabelText(/Select a date */);
  const today = getTodayString();
  expect(datepicker.value).toBe(today);

  //change date and verify availableTimes
  const newDate = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ).toLocaleDateString();
  fireEvent.change(datepicker, { target: { value: newDate } });
  expect(datepicker.value).toBe(newDate);

  const expectedAvailableTimesAfterDateChange = updateTimes(null, {
    type: "changed_date",
    selectedDate: newDate,
  }).availableTimes;

  const timeOptionsAfterDateChange = Array.from(timeDropDown.children).map(
    (option) => option.textContent
  );

  expect(timeOptionsAfterDateChange).toEqual(
    expectedAvailableTimesAfterDateChange
  );

  //sumbit firt part of booking form
  const goToConfirmationButton = screen.getByRole("button", {
    name: /Go to confirmation/,
  });
  fireEvent.click(goToConfirmationButton);
  const bookingDetailsHeader = screen.getByText(/Booking details/i);
  expect(bookingDetailsHeader).toBeInTheDocument();
});
