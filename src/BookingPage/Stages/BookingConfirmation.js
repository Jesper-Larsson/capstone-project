import EmailInput from "../../Components/EmailInput/EmailInput";
import ActionButton from "../../Components/ActionButton/ActionButton";

const BookingConfirmation = ({
  date,
  time,
  noOfGuests,
  occasion,
  goBack,
  emailInputValue,
  setEmailInputValue,
  confirm,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        confirm();
      }}
    >
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
        <p>Occasion: {occasion}</p>
      </div>
      <h2>Enter confirmation details</h2>
      <EmailInput
        id="email"
        label="Your email address *"
        value={emailInputValue.email}
        setValue={setEmailInputValue}
        isRequired={true}
      />
      <ActionButton isDisabled={!emailInputValue.isValid}>
        Confirm booking
      </ActionButton>
    </form>
  );
};

export default BookingConfirmation;
