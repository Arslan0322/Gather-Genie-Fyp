import {
    Box,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
  } from "@mui/material";
  import React, { useEffect } from "react";
  
  export default function DropdownWeddingEvent({
    form,
    setForm,
    selectedAddOns,
    setSelectedAddOns,
    weddingTypeData,
    data,
    isLoadingAddon
  }) {
    // Deconstruction and declaration
    const { weddingEvent } = form;
  
  
    // Functions:
    const handleChange = (e) => {
      if (data?.length === 0) {
        // This will be used when form is in creation mode
        setSelectedAddOns(e.target.value);
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
      } else {
        // This will be used when form is in edit mode
        const isExisting = selectedAddOns?.find(items => items?.title === e.target.value[e.target.value.length === 0 ? 0 : e.target.value.length - 1])
  
        if (isExisting) {
          // If the addOn is already existing then remove it from selectedAddOns array
          const filteredSelectedAddOns = selectedAddOns?.filter(items => items?.title !== e.target.value[e.target.value.length === 0 ? 0 : e.target.value.length - 1])
  
          setSelectedAddOns(filteredSelectedAddOns)
          setForm((form) => ({ ...form, weddingEvent: filteredSelectedAddOns }))
        } else {
          // If the addOn is not in selecctedAddOns array then add it with object i.e. price initially 0.
          const newAddOn = {
            title: e.target.value[e.target.value.length === 0 ? 0 : e.target.value.length - 1],
            price: "0"
          }
  
          if(selectedAddOns?.length > 0){
            const updatedSelectedAddOns = [...selectedAddOns, newAddOn];
    
            setSelectedAddOns(updatedSelectedAddOns)
    
            setForm((form) => ({ ...form, weddingEvent: updatedSelectedAddOns }))
          }else{
            const updatedSelectedAddOns = [newAddOn];
    
            setSelectedAddOns(updatedSelectedAddOns)
    
            setForm((form) => ({ ...form, weddingEvent: updatedSelectedAddOns }))
          }
  
        }
      }
    };
  
    const selectedTagsText = (selected) =>
      selected?.map((tagID) => {
        if (tagID?.title) {
          return weddingTypeData?.find((tag) => tag?.title === tagID?.title)?.title;
        } else {
          return weddingTypeData?.find((tag) => tag?.title === tagID)?.title;
        }
      });
  
  
    // useEffect:
    useEffect(() => {
      if (weddingEvent) {
        setSelectedAddOns(weddingEvent);
      }
    }, [weddingEvent]);
    
  
    useEffect(() => {
      if (data?.length !== 0) {
        setSelectedAddOns(data);
      }
    }, [data]);
  
    return (
      <Box
        sx={{
          minWidth: 160,
          backgroundColor: "white",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Wedding Events</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            required
            id="demo-multiple-checkbox"
            multiple
            name="weddingEvent"
            value={weddingEvent || []}
            label="weddingEvent"
            onChange={handleChange}
            input={<OutlinedInput sx={{ height: "100%" }} label="weddingEvent" />}
            renderValue={(selected) => selectedTagsText(selected).join(", ")}
          >
            {weddingTypeData.map((item, index) => (
              <MenuItem key={item._id} value={item.title}>
                <Checkbox
                  checked={
                    weddingEvent && weddingEvent.every(element => typeof element === 'object' && element !== null)
                    // weddingEvent && weddingEvent[index]?.title
                      ? weddingEvent.findIndex((addon) => addon.title === item?.title) > -1
                      : weddingEvent && weddingEvent.indexOf(item?.title) > -1
                  }
                />
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
  