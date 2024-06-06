import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { useIsMobile } from "../contexts/isMobile";
import { useState, useEffect } from "react";

export default function TimeRangePicker({ cartItem, setCartItem, vendor, items,timeArray, setTimeArray }) {
  const [value, setValue] = useState(() => [
    dayjs("2022-04-17T00:00"),
    dayjs("2022-04-17T00:00"),
  ]);
  const isMobile = useIsMobile();

  const handleTimeChange = (newValue, items) => {
    setValue(newValue);
  
    // Assuming newValue is an array with [startTime, endTime]
    const [startTime, endTime] = newValue;
  
    // Calculate the difference in hours
    const differenceInMilliseconds = endTime - startTime;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  
    // Convert items to a Date object
    const dateObject = new Date(items);
  
    const newObject = {
      date: dateObject.toISOString(),
      eventTime: startTime ? startTime.$d : null,
      endTime: endTime ? endTime.$d : null,
      hours: differenceInHours.toFixed(2) // round to two decimal places
    };
  
    if (timeArray.length !== 0) {
      const index = timeArray.findIndex(data => data?.date === newObject.date);
  
      if (index !== -1) {
        // If an object with the same date exists, update eventTime, endTime, and hours
        setTimeArray(prevData => {
          const updatedArray = [...prevData];
          updatedArray[index] = {
            ...updatedArray[index],
            eventTime: newObject?.eventTime,
            endTime: newObject?.endTime,
            hours: newObject.hours
          };
          return updatedArray;
        });
      } else {
        // If no object with the same date exists, add a new object to timeArray
        setTimeArray(prevData => [...prevData, newObject]);
      }
    } else {
      // If timeArray is empty, add a new object
      setTimeArray([newObject]);
    }
  
    // Update cartItem with startTime, endTime, and hours
    const updatedCartItem = {
      ...cartItem,
      eventTime: startTime ? startTime.$d : null,
      endTime: endTime ? endTime.$d : null,
      hours: differenceInHours.toFixed(0),
      price:0 // round to two decimal places
    };
    setCartItem(updatedCartItem);
  };
  
  useEffect(()=>{
    if(cartItem?.dateTime.length > 0){
      for (const dateTimeObj of cartItem?.dateTime) {
        const first = dayjs(dateTimeObj.eventTime);
        const last = dayjs(dateTimeObj.endTime);
        
        setValue([first,last])
      }
    }
  },[cartItem?.dateTime])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["SingleInputTimeRangeField"]}>
        <div style={{ width: isMobile ? "250px" : "260px" }}>
          <SingleInputTimeRangeField
            sx={{ width: "100%" }}
            label={`Event Time For ${new Date(items).getDate()}`}
            value={value}
            onChange={(newValue)=>handleTimeChange(newValue, items)}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
