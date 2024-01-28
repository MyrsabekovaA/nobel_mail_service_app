import { useEffect, useState, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import "./CustomDatepicker.css";
import moment from "moment";

function CustomDatepicker({ initialDate, onDateChange, timeOptionOn }) {
  const [date, setDate] = useState("");
  const [userTimezoneOffset, setUserTimezoneOffset] = useState(0);

  useEffect(() => {
    if (initialDate) {
      const formattedDate = timeOptionOn
        ? moment.utc(initialDate).format("DD.MM.YYYY HH:mm")
        : moment.utc(initialDate).format("DD.MM.YYYY");
      setDate(formattedDate);
    } else {
      setDate("");
    }
  }, [initialDate, timeOptionOn]);

  useEffect(() => {
    setUserTimezoneOffset(new Date().getTimezoneOffset());
  }, []);

  const handleDateChange = (selectedDates) => {
    const adjustedDate = moment(selectedDates[0]).subtract(
      userTimezoneOffset,
      "minutes"
    );
    console.log(adjustedDate.toDate());
    onDateChange(adjustedDate.toDate());
  };

  return (
    <Flatpickr
      value={date}
      onChange={handleDateChange}
      options={{
        enableTime: timeOptionOn,
        dateFormat: timeOptionOn ? "d.m.Y H:i" : "d.m.Y",
      }}
    />
  );
}

export default CustomDatepicker;
