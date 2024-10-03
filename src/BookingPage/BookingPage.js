import "./BookingPage.css";
import HeroImage from "../Images/HeroImage.jpg";
import { useEffect, useState } from "react";

import BookingForm from "./Stages/BookingForm";
import BookingConfirmation from "./Stages/BookingConfirmation";

const BookingPage = ({ selectedDate, availableTimes, dispatch, minDate }) => {
  const [bookingStage, setBookingStage] = useState(1);

  const [time, setTime] = useState("");

  const [noOfGuests, setNoOfGuests] = useState(1);
  const [occasion, setOccasion] = useState("-");
  const [emailInputValue, setEmailInputValue] = useState({
    isValid: false,
    email: "",
  });

  useEffect(() => {
    if (availableTimes.length > 0) {
      setTime(availableTimes[0]);
    }
  }, [availableTimes]);

  return (
    <div className="booking row">
      <div className="booking-flex">
        <div className="booking-left">
          <h1 className="lemon-yellow-text">Book a table</h1>
          {bookingStage === 1 && (
            <BookingForm
              date={selectedDate}
              setDate={(date) => {
                dispatch({ type: "changed_date", selectedDate: date });
              }}
              time={time}
              setTime={setTime}
              noOfGuests={noOfGuests}
              setNoOfGuests={setNoOfGuests}
              goToConfirmation={() => setBookingStage(2)}
              occasion={occasion}
              setOccasion={setOccasion}
              availableTimes={availableTimes}
              minDate={minDate}
            />
          )}
          {bookingStage === 2 && (
            <BookingConfirmation
              date={selectedDate}
              time={time}
              noOfGuests={noOfGuests}
              goBack={() => setBookingStage(1)}
              confirm={() => setBookingStage(3)}
              emailInputValue={emailInputValue}
              setEmailInputValue={setEmailInputValue}
              occasion={occasion}
            />
          )}
          {bookingStage === 3 && <Stage3 email={emailInputValue.email} />}
        </div>
        <div className="booking-right">
          <img src={HeroImage} alt="Chef holding plate of food" />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

const Stage3 = ({ email }) => (
  <>
    <h2>Booking confirmed!</h2>
    <p>We are looking forward to you visiting us!</p>
    <p>A confirmation email has been sent to {email}. (Not implemented)</p>
  </>
);
