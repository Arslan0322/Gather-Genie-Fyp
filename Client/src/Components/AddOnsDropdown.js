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

export default function DropdownAddOns({
  form,
  setForm,setAddOnsData,
  selectedAddOns,
  setSelectedAddOns,
  AddOnData,
  data,
  isLoadingAddon
}) {
  // Deconstruction and declaration
  const { addOns } = form;


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
        setAddOnsData(filteredSelectedAddOns)
        setForm((form) => ({ ...form, addOns: filteredSelectedAddOns }))
      } else {
        // If the addOn is not in selectedAddOns array then add it with object i.e. price initially 0.
        const newAddOn = {
          title: e.target.value[e.target.value.length === 0 ? 0 : e.target.value.length - 1],
          price: "0"
        }
  
        if(selectedAddOns?.length > 0){
          const updatedSelectedAddOns = [...selectedAddOns, newAddOn];
  
          setSelectedAddOns(updatedSelectedAddOns)
  setAddOnsData(updatedSelectedAddOns)
          setForm((form) => ({ ...form, addOns: updatedSelectedAddOns }))
        }else{
          const updatedSelectedAddOns = [newAddOn];
  
          setSelectedAddOns(updatedSelectedAddOns)
  setAddOnsData(updatedSelectedAddOns)
          setForm((form) => ({ ...form, addOns: updatedSelectedAddOns }))
        }
  
      }
    }
  };

  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      if (tagID?.title) {
        return AddOnData?.find((tag) => tag?.title === tagID?.title)?.title;
      } else {
        return AddOnData?.find((tag) => tag?.title === tagID)?.title;
      }
    });


  // useEffect:
  useEffect(() => {
    if (addOns) {
      setSelectedAddOns(addOns);
    }
  }, [addOns]);
  

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
        <InputLabel id="demo-multiple-checkbox-label">Add Ons</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="addOns"
          value={addOns || []}
          label="AddOns"
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="AddOns" />}
          renderValue={(selected) => selectedTagsText(selected).join(", ")}
        >
          {AddOnData.map((item, index) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox
                checked={
                  addOns && addOns.every(element => typeof element === 'object' && element !== null)
                  // addOns && addOns[index]?.title
                    ? addOns.findIndex((addon) => addon.title === item?.title) > -1
                    : addOns && addOns.indexOf(item?.title) > -1
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
