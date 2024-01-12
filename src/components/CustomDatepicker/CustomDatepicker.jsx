import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import "./CustomDatepicker.css";
import moment from "moment";

function CustomDatepicker({ initialDate, onDateChange, timeOptionOn }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialDate) {
      const formattedDate = timeOptionOn
        ? moment(initialDate).format("DD.MM.YYYY HH:mm")
        : moment(initialDate).format("DD.MM.YYYY");
      setDate(formattedDate);
    } else {
      setDate("");
    }
  }, [initialDate, timeOptionOn]);

  const handleDateChange = (selectedDates) => {
    onDateChange(selectedDates[0]);
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
