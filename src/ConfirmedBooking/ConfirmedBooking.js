import { useEffect, useState } from "react";
import "./ConfirmedBooking.css";
const ConfirmedBooking = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("bookings")) || []);
  }, []);

  return (
    <section className="row confirmation">
      <h1>Booking confirmed!</h1>
      <p>We are looking forward to you visiting us!</p>
      <p>A confirmation email has been sent to you. (Not implemented)</p>
      <h2>All your bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b.date + b.email}>
            <BookingEntry {...b} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ConfirmedBooking;

const BookingEntry = ({ date, time, noOfGuests, email, occasion }) => (
  <div className="booking-entry">
    <p>
      <b>{occasion === "" ? "Regular" : occasion} booking</b>
    </p>
    <p>Date: {date}</p>
    <p>Time: {time}</p>
    <p>Number of guests: {noOfGuests}</p>
    <p>Your provided email address: {email}</p>
  </div>
);
