import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, OutlinedInput, TextField } from "@mui/material";

const eventTypeData = [
  { _id: 1, title: "Wedding" },
  { _id: 2, title: "Birthday Party" },
  { _id: 3, title: "Parties" },
  { _id: 4, title: "Meetings" },
  { _id: 5, title: "Exhibitions" },
  { _id: 6, title: "Other Events" },
];

export function DropdownEventType({
  form,
  setForm,
  setSelectedEventType,
  selectedEventType,
}) {
  const { eventType } = form;
  const [selectedEvent, setSelectedEvent] = React.useState([]);
  const handlePriceChange = (e, item) => {
    const { value } = e.target;
    const existingDataIndex = selectedEventType?.findIndex(
      (data) => data?.title === item
    );

    if (existingDataIndex !== -1) {
      // If the add-on data exists, update the price
      const updatedData = selectedEventType?.map((data, index) => {
        if (index === existingDataIndex) {
          return { ...data, price: value };
        } else {
          return data;
        }
      });

      setSelectedEventType(updatedData);
      setForm((form) => ({ ...form, eventType: updatedData }));

    } else {
      // If the add-on data doesn't exist, add a new entry
      setSelectedEventType( [
        { title: item, price: value },
      ]);
      setForm((form) => ({ ...form, eventType: selectedEventType }));

    }
  };

  const handleChange = (e) => {
    const selectedEventTypeTitle = e.target.value;
  
    // Update the selected event type
    setSelectedEvent([{ title: selectedEventTypeTitle, price: "0" }]);
    setForm((form) => ({ ...form, eventType: [{ title: selectedEventTypeTitle , price: "0" }] }));
  };
  

  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      if (tagID?.title) {
        return eventTypeData?.find((tag) => tag?.title === tagID?.title)?.title;
      } else {
        return eventTypeData?.find((tag) => tag?.title === tagID)?.title;
      }
    });

  React.useEffect(() => {
    if (selectedEventType) {
      setSelectedEvent(selectedEventType);
    }
  }, [selectedEventType]);
  return (
    <>
      <Grid item xs={12} md={6} mt={2}>
        <Box
          sx={{
            minWidth: 160,
            backgroundColor: "white",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Event Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="eventType"
              value={eventType || []}
              label="Select Event Type"
              onChange={handleChange}
              input={
                <OutlinedInput
                  sx={{ height: "100%" }}
                  label="select Event Type"
                />
              }
              renderValue={(selected) => selectedTagsText(selected).join(", ")}
            >
              {eventTypeData.map((values) => (
                <MenuItem key={values._id} value={values.title}>
                  {values.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        {selectedEvent?.length > 0 && selectedEvent[0]?.title
          ? selectedEvent?.map((item)=>(
              <TextField
                margin="normal"
                required
                fullWidth
                id={`price-${item?.title}`}
                label={`Price of ${item?.title}`}
                value={
                  (
                    selectedEventType?.find(
                      (data) => data.title === item?.title
                    ) || {}
                  ).price
                }
                onChange={(e) => handlePriceChange(e, item?.title)}
                sx={{ marginTop: "20px" }}
              />
              ))
          : selectedEvent?.map((items, index) => (
              <TextField
                margin="normal"
                required
                fullWidth
                id={`price-${items}`}
                label={`Price of ${items}`}
                value={
                  (
                    selectedEventType?.find((data) => data.title === items) ||
                    {}
                  ).price
                }
                onChange={(e) => handlePriceChange(e, items)}
                sx={{ marginTop: "20px" }}
              />
            ))}
      </Grid>
    </>
  );
}
