import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useIsMobile } from "../contexts/isMobile";

export default function CustomDateFormat({
  cartItem,
  setCartItem,
  setFilteredDates,
  setNumberOfDays
}) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const isMobile = useIsMobile();

  // Function to get dates between start and end dates
  const getDatesBetweenRange = (firstDate, lastDate) => {
    const dates = [];
    let currentDate = firstDate; // Access the native JavaScript Date object from Day.js
    const numberOfDays =
      Math.floor((lastDate - firstDate) / (24 * 60 * 60 * 1000)) + 1;

    if (currentDate.getDate() === lastDate.getDate()) {
      dates.push(new Date(currentDate));
    } else {
      for (let i = 0; i < numberOfDays; i++) {
        const current = new Date(firstDate.getTime() + i * 24 * 60 * 60 * 1000);
        dates.push(current);
      }
    }

    return dates;
  };

  React.useEffect(() => {
    if (startDate?.$d && endDate?.$d) {
      const updatedCartItem = {
        ...cartItem,
        eventDate: startDate?.$d,
      };
      setCartItem(updatedCartItem);

      // Filter dates between start and end dates
      const datesBetweenRange = getDatesBetweenRange(
        startDate?.$d,
        endDate?.$d
      );

      const dateLength = datesBetweenRange.length === 0 ? 1 : datesBetweenRange?.length

      setNumberOfDays(dateLength)
      setFilteredDates(datesBetweenRange);
    }
  }, [startDate, endDate]);

  React.useEffect(()=>{
    if(cartItem?.dateTime.length > 0){
      const first = dayjs(cartItem?.dateTime[0]?.date);
      const last = dayjs(cartItem?.dateTime[cartItem?.dateTime.length - 1]?.date)
      setStartDate(first);
      setEndDate(last);
    }
  },[cartItem?.dateTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField", "DateField"]}>
        <div style={{ width: !isMobile && "43%" }}>
          <DateField
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            format="MM-DD-YYYY"
            fullWidth
          />
        </div>
        <div
          style={{
            marginLeft: !isMobile && "2.5rem",
            width: !isMobile && "43%",
          }}
        >
          <DateField
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            format="MM-DD-YYYY"
            fullWidth
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
