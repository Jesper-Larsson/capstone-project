import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import BookingForm from "./BookingPage/Stages/BookingForm";
import { getTodayString, initializeTimes } from "./Utils/DateFuntions";
import { MemoryRouter } from "react-router-dom";
import Main from "./Layout/Main/Main";

const today = getTodayString();
const tomorrow = new Date(
  Date.now() + 24 * 60 * 60 * 1000
).toLocaleDateString();
const store = {};

const setup = () => {
  global.fetchAPI = jest.fn().mockImplementation((date) => {
    if (date.toLocaleDateString() === tomorrow) {
      return ["17:30", "18:00", "21:30"];
    }
    return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  });
  global.submitAPI = jest.fn().mockImplementation((formData) => true);
  const getItemMock = jest
    .fn()
    .mockImplementation((key) =>
      store.hasOwnProperty(key) ? store[key] : null
    );
  const setItemMock = jest.fn().mockImplementation((key, value) => {
    store[key] = value.toString();
  });

  Storage.prototype.setItem = setItemMock;
  Storage.prototype.getItem = getItemMock;
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Main />
    </MemoryRouter>
  );
  //initialize app with state
  const goToBookingButton = screen.getByRole("button", {
    name: /Reserve a Table/,
  });
  fireEvent.click(goToBookingButton);
};

afterAll(() => {
  jest.clearAllMocks();
});

//basic rendering
test("renders booking form", () => {
  setup();
  const header = screen.getByText(/Enter booking information/i);
  expect(header).toBeInTheDocument();
  cleanup();
});

test("available times are correctly changing", () => {
  setup();

  //go to booking page
  const timeDropDown = screen.getByLabelText(/Select a time */);

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
  expect(datepicker.value).toBe(today);

  //change date and verify availableTimes

  fireEvent.change(datepicker, { target: { value: tomorrow } });
  expect(datepicker.value).toBe(tomorrow);

  const expectedAvailableTimesAfterDateChange = ["17:30", "18:00", "21:30"];

  const timeOptionsAfterDateChange = Array.from(timeDropDown.children).map(
    (option) => option.textContent
  );

  expect(timeOptionsAfterDateChange).toEqual(
    expectedAvailableTimesAfterDateChange
  );
  cleanup();
});

test("localstorage is being written to", () => {
  setup();
  //sumbit firt part of booking form
  const goToConfirmationButton = screen.getByRole("button", {
    name: /Go to confirmation/,
  });
  fireEvent.click(goToConfirmationButton);
  const bookingDetailsHeader = screen.getByText(/Booking details/);
  expect(bookingDetailsHeader).toBeInTheDocument();

  //confirm bookings
  const emailIput = screen.getByLabelText(/Your email address */);
  fireEvent.change(emailIput, { target: { value: "abc@123.com" } });
  fireEvent.blur(emailIput);
  const confirmBookingButton = screen.getByRole("button", {
    name: /Confirm booking/,
  });
  fireEvent.click(confirmBookingButton);
  expect(store["bookings"]).toContain("date");
  cleanup();
});

test("bookings are read from localstorage", async () => {
  setup();
  const goToConfirmationButton = screen.getByRole("button", {
    name: /Go to confirmation/,
  });
  fireEvent.click(goToConfirmationButton);

  //confirm bookings
  const emailIput = screen.getByLabelText(/Your email address */);
  fireEvent.change(emailIput, { target: { value: "abc@123.com" } });
  fireEvent.blur(emailIput);
  const confirmBookingButton = screen.getByRole("button", {
    name: /Confirm booking/,
  });
  fireEvent.click(confirmBookingButton);
  await waitFor(() => {
    //let useEffect read from localstorage
    const createdBookingInfo = screen.getByText(/Regular booking/);
    expect(createdBookingInfo).toBeInTheDocument();
  });
  cleanup();
});
