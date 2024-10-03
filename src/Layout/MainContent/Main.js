import { Link, Route, Routes } from "react-router-dom";
import HomePage from "../../HomePage/HomePage";
import BookingPage from "../../BookingPage/BookingPage";
import "./Main.css";
import { useReducer } from "react";
import {
  initializeTimes,
  updateTimes,
  getTodayString,
} from "../../Utils/DateFuntions";

const Main = () => {
  const [{ selectedDate, availableTimes }, dispatch] = useReducer(
    updateTimes,
    initializeTimes()
  );

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
            />
          }
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
