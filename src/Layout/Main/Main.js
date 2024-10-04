import { json, Link, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../../HomePage/HomePage";
import BookingPage from "../../BookingPage/BookingPage";
import "./Main.css";
import { useEffect, useReducer, useState } from "react";
import {
  initializeTimes,
  updateTimes,
  getTodayString,
} from "../../Utils/DateFuntions";
import ConfirmedBooking from "../../ConfirmedBooking/ConfirmedBooking";

const Main = () => {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );
  const navigate = useNavigate();
  const [{ selectedDate, availableTimes }, dispatch] = useReducer(
    updateTimes,
    initializeTimes()
  );

  useEffect(
    () => localStorage.setItem("bookings", JSON.stringify(bookings)),
    [bookings]
  );
  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate("/confirmation");
    }
    setBookings([...bookings, formData]);
  };
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<HomePage scrollTo="about" />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              selectedDate={selectedDate}
              availableTimes={availableTimes}
              dispatch={dispatch}
              minDate={getTodayString()}
              submitForm={submitForm}
            />
          }
        />
        <Route
          path="/confirmation"
          element={<ConfirmedBooking bookings={bookings} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
};
export default Main;

const NotFound = () => (
  <section className="row not-found">
    <h1>
      404 - Page not found -
      <span>
        <Link to="/"> Go to homepage</Link>
      </span>
    </h1>
  </section>
);
