import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import ErrorToast from "../../Components/ErrorToast/ErrorToast";
import delay from "../../Utils/Delay";

const Main = () => {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    msg: "",
  });
  const [error, setError] = useState("");
  const [{ selectedDate, availableTimes }, dispatch] = useReducer(
    updateTimes,
    initializeTimes()
  );

  const updateAvailableTimes = async (newDate) => {
    setLoadingState({ isLoading: true, msg: "Loading time slots..." });
    await delay(800);
    dispatch({ type: "changed_date", selectedDate: newDate });
    setLoadingState({ isLoading: false, msg: "" });
  };
  useEffect(
    () => localStorage.setItem("bookings", JSON.stringify(bookings)),
    [bookings]
  );
  const submitForm = async (formData) => {
    setError("");
    setLoadingState({ isLoading: true, msg: "Submitting booking..." });
    await delay(800);
    if (submitAPI(formData)) {
      navigate("/confirmation");
    } else {
      setError("Submission went wrong. Please try again.");
    }
    setLoadingState({ isLoading: false, msg: "" });
    setBookings([...bookings, formData]);
  };
  return (
    <main>
      {loadingState.isLoading && (
        <LoadingIndicator loadingMessage={loadingState.msg} />
      )}
      {error && (
        <ErrorToast
          errorMessage={error}
          destroySelf={() => {
            setError("");
          }}
        />
      )}
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
              updateAvailableTimes={updateAvailableTimes}
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
