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
          setDate(date);
        }}
        minDate={minDate}
        errorMsg="Selected date must be in the future."
        isRequired={true}
      />
      {availableTimes.length > 0 && date >= minDate ? (
        <>
          <DropDown
            id="time"
            label="Select a time *"
            values={availableTimes}
            value={time}
            setValue={setTime}
            isRequired={true}
            errorMsg="You need to choose an available time slot."
          />
          <NumberInput
            min={1}
            max={10}
            id="guests"
            label="Number of guests *"
            value={noOfGuests}
            setValue={setNoOfGuests}
            isRequired={true}
            errorMsg="Number of guests must be between 1 and 10."
          />
          <DropDown
            id="occasion"
            label="Occasion"
            values={["Birthday", "Anniversary"]}
            value={occasion}
            setValue={setOccasion}
            isRequired={false}
          />
        </>
      ) : (
        <p>
          Sorry, we don't have any available slots this date. Please choose
          another date.
        </p>
      )}
      <div className="booking-bottom">
        <ActionButton
          isDisabled={
            availableTimes.length === 0 ||
            noOfGuests <= 0 ||
            noOfGuests > 10 ||
            time === "" ||
            date < minDate
          }
        >
          Go to confirmation
        </ActionButton>
      </div>
    </form>
  </>
);

export default BookingForm;
