import React from "react";
import DropdownAddOns from "../AddOnsDropdown";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import DesertsDropdown from "./DesertsDropdown";
import CateringAddOnsDropdown from "../CateringAddOnsDropdown";
import StartersDropDown from "./StartersDropDown";
import BeveragesDropdown from "./BeveragesDropDown";
export const AddOnData = [
  { _id: 1, title: "Deserts" },
  { _id: 2, title: "Hot Beverages" },
  { _id: 3, title: "Starters" },
];
export default function CateringAddOns({
  form,
  setForm,
  addOnsData,
  setAddOnsData,
  data
}) {

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedDeserts, setSelectedDeserts] = useState([]);
  const [selectedStarters, setSelectedStarters] = useState([]);
  const [selectedBeverages, setSelectedBeverages] = useState([]);


  const onChangeText = (e, item, title) => {
    const { value } = e.target;
    const existingDataIndex = addOnsData.findIndex(
      (data) => data?.title === title
    );

    if (existingDataIndex !== -1) {
      // If the add-on data exists, update the price
      const updatedData = addOnsData?.map((data, index) => {
        if (index === existingDataIndex) {
          const existingCategoryItemIndex = data.category.findIndex(
            (cat) => cat.title === item
          );

          if (existingCategoryItemIndex !== -1) {
            // If item with the same title exists, update its price
            const updatedCategory = [...data.category]; // Shallow copy
            updatedCategory[existingCategoryItemIndex] = {
              title: item,
              price: value,
            };

            // Update the entire data object with the updated category
            return { ...data, category: updatedCategory };
          } else {
            // If item doesn't exist, add it to the category array
            return {
              ...data,
              category: [...data.category, { title: item, price: value }],
            };
          }
        }

        return data;
      });


      setAddOnsData(updatedData);
    }
  };


  React.useEffect(() => {
    // Remove objects from addOnsData that are not in selectedAddOns
    // if(selectedAddOns?.length !== 0){
    //   setAddOnsData((prevData) =>
    //     prevData.filter((data) => selectedAddOns.includes(data.title))
    //   );
    // }
    // console.log(selectedAddOns);
  }, [selectedAddOns]);

  React.useEffect(() => {
    if (data.length !== 0) {
      const desertData = data?.filter(items => items?.title === "Deserts")
      const startersData = data?.filter(items => items?.title === "Starters");
      const beveragesData = data?.filter(items => items?.title === "Hot Beverages");

      const desertCategory = desertData[0]?.category;
      const startersCategory = startersData[0]?.category;
      const beveragesCategory = beveragesData[0]?.category;

      const filteredTitle = desertCategory?.map(items => items?.title)
      const filteredStarters = startersCategory?.map(items => items?.title)
      const filteredBeverages = beveragesCategory?.map(items => items?.title)

      setSelectedDeserts(filteredTitle);
      setSelectedStarters(filteredStarters);
      setSelectedBeverages(filteredBeverages);
    }

  }, [data])


  return (
    <>
      <Grid item xs={12} md={6} mt={2}>
        <CateringAddOnsDropdown
          {...{
            selectedAddOns,
            setSelectedAddOns,
            setForm,
            form,
            AddOnData,
            setAddOnsData,
            addOnsData,
          }}
        />
      </Grid>
      {/* {selectedAddOns} */}
      {/* {selectedAddOns?.map((items, index) => (
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id={`price-${items?.title}`}
                label={`Price of ${items?.title}`}
                value={
                  (addOnsData.find((data) => data.title === items?.title) || {})
                    .price
                }
                onChange={(e) => onChangeText(e, items?.title)}
              />
            </Grid>
          ))
        : */}
      {selectedAddOns?.map((data, index) => (
        <>
          {data?.title === "Deserts" && (
            <>
              <Grid item xs={12} md={6} mt={2}>
                <DesertsDropdown
                  {...{
                    selectedDeserts,
                    setSelectedDeserts,
                    addOnsData,
                    setAddOnsData,
                  }}
                />
              </Grid>
              {selectedDeserts && selectedDeserts.map((items) => (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id={`price-${items}`}
                      label={`Price of ${items}`}
                      value={
                        (addOnsData
                          .map((data) => data.category.find((categoryItem) => categoryItem.title === items))
                          .find((item) => item !== undefined)
                          || {})
                          .price
                      }
                      onChange={(e) => onChangeText(e, items, data?.title)}
                    />
                  </Grid>
                </>
              ))}
            </>
          )}

          {data?.title === "Starters" && (
            <>
              <Grid item xs={12} md={6} mt={2}>
                <StartersDropDown
                  {...{
                    selectedStarters,
                    setSelectedStarters,
                    addOnsData,
                    setAddOnsData,
                  }}
                />
              </Grid>
              {selectedStarters.map((items) => (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id={`price-${items}`}
                      label={`Price of ${items}`}
                      value={
                        (addOnsData
                          .map((data) => data.category.find((categoryItem) => categoryItem.title === items))
                          .find((item) => item !== undefined)
                          || {})
                          .price
                      }
                      onChange={(e) => onChangeText(e, items, data?.title)}
                    />
                  </Grid>
                </>
              ))}
            </>
          )}

          {data?.title === "Hot Beverages" && (
            <>
              <Grid item xs={12} md={6} mt={2}>
                <BeveragesDropdown
                  {...{
                    selectedBeverages,
                    setSelectedBeverages,
                    addOnsData,
                    setAddOnsData,
                  }}
                />
              </Grid>
              {selectedBeverages?.map((items) => (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id={`price-${items}`}
                      label={`Price of ${items}`}
                      value={
                        (addOnsData
                          ?.map((data) => data.category.find((categoryItem) => categoryItem.title === items))
                          ?.find((item) => item !== undefined)
                          || {})
                          .price
                      }
                      onChange={(e) => onChangeText(e, items, data?.title)}
                    />
                  </Grid>
                </>
              ))}
            </>
          )}
        </>
      ))}
    </>
  );
}
