import "./BookingPage.css";
import HeroImage from "../Images/HeroImage.jpg";
import { useEffect, useState } from "react";

import BookingForm from "./Stages/BookingForm";
import BookingConfirmation from "./Stages/BookingConfirmation";

const BookingPage = ({
  selectedDate,
  availableTimes,
  updateAvailableTimes,
  minDate,
  submitForm,
}) => {
  const [bookingStage, setBookingStage] = useState(1);

  const [time, setTime] = useState("");

  const [noOfGuests, setNoOfGuests] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [emailInputValue, setEmailInputValue] = useState({
    isValid: false,
    email: "",
  });

  useEffect(() => {
    setTime("");
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
                updateAvailableTimes(date);
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
              confirm={() =>
                submitForm({
                  date: selectedDate,
                  time: time,
                  noOfGuests: noOfGuests,
                  email: emailInputValue.email,
                  occasion: occasion,
                })
              }
              emailInputValue={emailInputValue}
              setEmailInputValue={setEmailInputValue}
              occasion={occasion}
            />
          )}
        </div>
        <div className="booking-right">
          <img src={HeroImage} alt="Chef holding plate of food" />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
