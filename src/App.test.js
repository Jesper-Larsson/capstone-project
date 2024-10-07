import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
  getByLabelText,
} from "@testing-library/react";
import { getTodayString, initializeTimes } from "./Utils/DateFuntions";
import { MemoryRouter } from "react-router-dom";
import Main from "./Layout/Main/Main";

const today = getTodayString();
const tomorrow = new Date(
  Date.now() + 24 * 60 * 60 * 1000
).toLocaleDateString();

const yesterday = new Date(
  Date.now() - 24 * 60 * 60 * 1000
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

  expect(timeOptionsAtStart).toEqual([
    "Choose an option",
    ...expectedAvailableTimesAtStart,
  ]);

  const datepicker = screen.getByLabelText(/Select a date */);
  expect(datepicker.value).toBe(today);

  //change date and verify availableTimes

  fireEvent.change(datepicker, { target: { value: tomorrow } });
  expect(datepicker.value).toBe(tomorrow);

  const expectedAvailableTimesAfterDateChange = [
    "Choose an option",
    "17:30",
    "18:00",
    "21:30",
  ];

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
  //choose some valid values
  const timeDropDown = screen.getByLabelText(/Select a time */);
  fireEvent.change(timeDropDown, { target: { value: "17:00" } });

  const numberInput = screen.getByLabelText(/Number of guests */);
  fireEvent.change(numberInput, { target: { value: 2 } });

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

  //choose some valid values
  const timeDropDown = screen.getByLabelText(/Select a time */);
  fireEvent.change(timeDropDown, { target: { value: "17:00" } });

  const numberInput = screen.getByLabelText(/Number of guests */);
  fireEvent.change(numberInput, { target: { value: 2 } });

  //sumbit firt part of booking form
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

test("HTML validation date", () => {
  setup();
  const datepicker = screen.getByLabelText(/Select a date */);
  const ariaRequired = datepicker.getAttribute("aria-required");
  const minDate = datepicker.getAttribute("min");
  expect(ariaRequired).toBe("true");
  expect(datepicker).toBeRequired();
  expect(minDate).toBe(today);
  cleanup();
});

test("HTML validation time", () => {
  setup();
  const timeDropdown = screen.getByLabelText(/Select a time */);
  const ariaRequired = timeDropdown.getAttribute("aria-required");
  expect(ariaRequired).toBe("true");
  expect(timeDropdown).toBeRequired();
  cleanup();
});

test("HTML validation guests", () => {
  setup();
  const guestsInput = screen.getByLabelText(/Number of guests */);
  const ariaRequired = guestsInput.getAttribute("aria-required");
  const min = guestsInput.getAttribute("min");
  const max = guestsInput.getAttribute("max");
  expect(ariaRequired).toBe("true");
  expect(guestsInput).toBeRequired();
  expect(min).toBe("1");
  expect(max).toBe("10");
  cleanup();
});

test("HTML validation occassion", () => {
  setup();
  const occasionDropdown = screen.getByLabelText(/Occasion/);
  const ariaRequired = occasionDropdown.getAttribute("aria-required");
  expect(ariaRequired).toBe("false");
  expect(occasionDropdown).not.toBeRequired();
  cleanup();
});

test("JS validation of date", () => {
  setup();
  const datepicker = screen.getByLabelText(/Select a date */);
  fireEvent.change(datepicker, { target: { value: yesterday } });
  fireEvent.blur(datepicker);
  const errorText = screen.getByText(/Selected date must be in the future/);
  expect(errorText).toBeInTheDocument();
  fireEvent.change(datepicker, { target: { value: tomorrow } });
  fireEvent.blur(datepicker);
  expect(errorText).not.toBeInTheDocument();
  cleanup();
});

test("JS validation of time", () => {
  setup();
  const timeDropdown = screen.getByLabelText(/Select a time */);
  fireEvent.blur(timeDropdown);
  const errorText = screen.getByText(
    /You need to choose an available time slot/
  );
  expect(errorText).toBeInTheDocument();
  fireEvent.change(timeDropdown, { target: { value: "17:00" } });
  fireEvent.blur(timeDropdown);
  expect(errorText).not.toBeInTheDocument();
  cleanup();
});

test("JS validation of guests", () => {
  setup();
  const guestsInput = screen.getByLabelText(/Number of guests */);
  fireEvent.change(guestsInput, { target: { value: 0 } });
  fireEvent.blur(guestsInput);
  const errorText = screen.getByText(
    /Number of guests must be between 1 and 10/
  );
  expect(errorText).toBeInTheDocument();

  fireEvent.change(guestsInput, { target: { value: -1 } });
  fireEvent.blur(guestsInput);
  expect(errorText).toBeInTheDocument();

  fireEvent.change(guestsInput, { target: { value: 11 } });
  fireEvent.blur(guestsInput);
  expect(errorText).toBeInTheDocument();

  fireEvent.change(guestsInput, { target: { value: 2 } });
  fireEvent.blur(guestsInput);
  expect(errorText).not.toBeInTheDocument();
  cleanup();
});

test("JS validation of button", () => {
  setup();
  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeDisabled();

  const timeDropdown = screen.getByLabelText(/Select a time */);
  fireEvent.change(timeDropdown, { target: { value: "17:00" } });
  fireEvent.blur(timeDropdown);

  const guestsInput = screen.getByLabelText(/Number of guests */);
  fireEvent.change(guestsInput, { target: { value: 2 } });
  fireEvent.blur(guestsInput);

  expect(submitButton).toBeEnabled();
  cleanup();
});
