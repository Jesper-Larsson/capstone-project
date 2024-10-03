import ActionButton from "../../Components/ActionButton/ActionButton";
import DatePicker from "../../Components/DatePicker/DatePicker";
import DropDown from "../../Components/DropDown/DropDown";
import NumberInput from "../../Components/NumberInput/NumberInput";

const BookingForm = ({
  date,
  setDate,
  time,
  setTime,
  noOfGuests,
  setNoOfGuests,
  occasion,
  setOccasion,
  goToConfirmation,
  availableTimes,
  minDate,
}) => (
  <>
    <div className="top">
      <div></div>
      <div>
        <b>Step 1/2</b>
      </div>
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        goToConfirmation();
      }}
    >
      <h2>Enter booking information</h2>
      <DatePicker
        id="date"
        label="Select a date *"
        date={date}
        setDate={(date) => {
          if (date >= minDate) {
            setDate(date);
          } else {
          } //alert("Booking date must be in the future.");
        }}
        minDate={minDate}
      />
      {availableTimes.length > 0 ? (
        <>
          <DropDown
            id="time"
            label="Select a time *"
            values={availableTimes}
            value={time}
            setValue={setTime}
            isRequired={true}
          />
          <NumberInput
            min="1"
            max="10"
            id="guests"
            label="Number of guests *"
            value={noOfGuests}
            setValue={setNoOfGuests}
            isRequired={true}
          />
          <DropDown
            id="occasion"
            label="Occasion"
            values={["-", "Birthday", "Anniversary"]}
            value={occasion}
            setValue={setOccasion}
            isRequired={false}
          />
        </>
      ) : (
        <p>Sorry, we are fully booked this date. Please choose another date.</p>
      )}
      <div className="booking-bottom">
        <ActionButton isDisabled={availableTimes.length === 0}>
          Go to confirmation
        </ActionButton>
      </div>
    </form>
  </>
);

export default BookingForm;
