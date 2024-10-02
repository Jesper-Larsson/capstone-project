import "./BookingPage.css";
import HeroImage from "../Images/HeroImage.jpg";
import ActionButton from "../Components/ActionButton/ActionButton";
import { useState } from "react";
import DatePicker from "../Components/DatePicker/DatePicker";
import DropDown from "../Components/DropDown/DropDown";
import EmailInput from "../Components/EmailInput/EmailInput";
const BookingPage = () => {
  const todayDateString = new Date(Date.now()).toLocaleDateString();
  const [date, setDate] = useState(todayDateString);
  const [time, setTime] = useState("17:00");
  const [noOfGuests, setNoOfGuests] = useState("1-2");
  const [stage, setStage] = useState(1);
  const [emailInputValue, setEmailInputValue] = useState({
    isValid: false,
    email: "",
  });
  return (
    <div className="booking row">
      <div className="booking-flex">
        <div className="booking-left">
          <h1 className="lemon-yellow-text">Book a table</h1>
          {stage === 1 && (
            <Stage1
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              noOfGuests={noOfGuests}
              setNoOfGuests={setNoOfGuests}
              goToConfirmation={() => setStage(2)}
              todayDateString={todayDateString}
            />
          )}
          {stage === 2 && (
            <Stage2
              date={date}
              time={time}
              noOfGuests={noOfGuests}
              goBack={() => setStage(1)}
              confirm={() => setStage(3)}
              emailInputValue={emailInputValue}
              setEmailInputValue={setEmailInputValue}
            />
          )}
          {stage === 3 && <Stage3 email={emailInputValue.email} />}
        </div>
        <div className="booking-right">
          <img src={HeroImage} alt="Chef holding plate of food" />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

const Stage1 = ({
  date,
  setDate,
  time,
  setTime,
  noOfGuests,
  setNoOfGuests,
  goToConfirmation,
  todayDateString,
}) => (
  <>
    <div className="top">
      <div></div>
      <div>
        <b>Step 1/2</b>
      </div>
    </div>
    <form>
      <h2>Enter booking details</h2>
      <DatePicker
        id="date"
        label="Select a date *"
        date={date}
        setDate={(date) => {
          if (date >= todayDateString) {
            setDate(date);
          } else alert("Booking date must be in the future.");
        }}
        todayDateString={todayDateString}
      />
      <DropDown
        id="time"
        label="Select a time *"
        values={["17:00", "18:00", "19:00", "20:00", "21:00"]}
        value={time}
        setValue={setTime}
      />
      <DropDown
        id="no-of-guests"
        label="Number of guests *"
        values={["1-2", "3-4", "5-8", "9+"]}
        value={noOfGuests}
        setValue={setNoOfGuests}
      />
    </form>
    <div className="booking-bottom">
      <ActionButton onAction={goToConfirmation}>
        Go to confirmation
      </ActionButton>
    </div>
  </>
);

const Stage2 = ({
  date,
  time,
  noOfGuests,
  goBack,
  emailInputValue,
  setEmailInputValue,
  confirm,
}) => {
  return (
    <>
      <div className="top">
        <div>
          <b className="back" onClick={goBack}>
            {"⮌"}
          </b>
        </div>
        <div>
          <b>Step 2/2</b>
        </div>
      </div>
      <div className="booking-details">
        <h2>Booking details</h2>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Number of guests: {noOfGuests}</p>
      </div>
      <h2>Enter confirmation details</h2>
      <EmailInput
        id="email"
        label="Your email address *"
        value={emailInputValue.email}
        setValue={setEmailInputValue}
      />
      <ActionButton isDisabled={!emailInputValue.isValid} onAction={confirm}>
        Confirm booking
      </ActionButton>
    </>
  );
};

const Stage3 = ({ email }) => (
  <>
    <h2>Booking confirmed!</h2>
    <p>We look forward to your visit!</p>
    <p>A confirmation email has been sent to {email}. (Not implemented)</p>
  </>
);
