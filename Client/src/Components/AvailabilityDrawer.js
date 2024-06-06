import {
  Box,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCreateCartMutation } from "../store/cartsSlice";
import { useIsMobile } from "../contexts/isMobile";
import { setCartCount } from "../store/cartCountsSlice";
import { toast } from "react-toastify";
import { SolidButton } from "./SolidButton";
import MultiDatePicker from "./DateField";
import TimeRangePicker from "./TimeField";
import moment from "moment";

const Content = ({
  toggleDrawer,
  userId,
  vendor,
  data,
  isPackage,
  addOnData,
}) => {
  const dispatch = useDispatch();
  const [filteredDates, setFilteredDates] = useState([]);
  const [cartPrice, setCartPrice] = useState(parseInt(data?.price));
  const [NumberOfDays, setNumberOfDays] = useState(1);
  const [cartItem, setCartItem] = useState({
    status: "Pending",
    isCheckout: false,
    quantity: "",
    description: "",
    location: "",
    hours: null,
    option: "",
    dateTime: [],
  });
  const { id } = useParams();
  const [createCart, { isSuccess }] = useCreateCartMutation();
  const _id = useSelector((state) => state?.user?.userInfo?.data?._id);
  const countState = useSelector((state) => state?.cartCount);
  const isMobile = useIsMobile();
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [updatedPrice, setupdatedPrice] = useState(0);
  const [timeArray, setTimeArray] = useState([]);

  const isShow = cartItem?.quantity !== "" || (vendor === "Decor" || vendor === "Photographer" || vendor === "Event Planner") || cartItem?.hours

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data?.userId?.vendor === "Venue" &&
      parseInt(cartItem?.quantity) > parseInt(data?.capacity)
    ) {
      toast.error("Persons are more than Capacity!");
    } else {
      const Cartdata = await createCart({
        ...cartItem,
        cartPrice,
        userId: _id,
        servicesId: id,
        addOn: selectedAddOns,
        dateTime: timeArray,
      });

      if (Cartdata?.data) {
        dispatch(setCartCount(countState + 1));
      }

      const CartDataArray = JSON.parse(localStorage.getItem("CartData")) || [];

      const CartDataObject = {
        cartId: Cartdata?.data?._id,
        userId,
      };

      localStorage.setItem(
        "CartData",
        JSON.stringify([...CartDataArray, CartDataObject])
      );

      toggleDrawer(false);

      if (Cartdata?.error?.status === 500) {
        toast.error(Cartdata?.error?.data?.message);
      }
    }
  };

  const onChange = (e) => {
    setCartItem((cartItem) => ({
      ...cartItem,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (item) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      if (prevSelectedAddOns.includes(item)) {
        // If the item is already in the selectedAddOns, remove it
        return prevSelectedAddOns.filter(
          (selectedItem) => selectedItem !== item
        );
      } else {
        // If the item is not in selectedAddOns, add it
        return [...prevSelectedAddOns, item];
      }
    });
  };

  useEffect(() => {
    if (vendor === "Venue") {
      const total =
        (parseInt(data?.price) * parseInt(cartItem?.quantity) + updatedPrice) * NumberOfDays;
      if (!isNaN(total)) {
        setCartPrice(total);
      }
    } else if (vendor === "Caterer") {
      const total =
        (parseInt(data?.price) * parseInt(cartItem?.quantity) +
        updatedPrice * parseInt(cartItem?.quantity)) * NumberOfDays ;
      // + (updatedPrice * parseInt(cartItem?.quantity))
      if (!isNaN(total)) {
        setCartPrice(total);
      }
    }
  }, [cartItem?.quantity, updatedPrice, NumberOfDays]);

  useEffect(() => {
    if (vendor === "Car Rental" && timeArray.length > 0) {
      let total = 0;
  
      // Iterate through timeArray
      timeArray.forEach(item => {
        // Check if hours and price exist in the current item and if hours is not zero
        if (item.hours && item.hours !== 0) {
          item.price=parseInt(data?.price)* item.hours
          // Calculate the price based on the hours and add it to the total
          total += parseInt(data?.price)* item.hours;
        }
      });
  
      // Add the updatedPrice and NumberOfDays to the total
      total += updatedPrice * NumberOfDays;
  
      // Set the cart price with the calculated total
      setCartPrice(total);
    }
  }, [timeArray, updatedPrice, NumberOfDays, vendor]);
  
  useEffect(() => {
    if (
      vendor === "Decor" ||
      vendor === "Photographer" ||
      vendor === "Event Planner"
    ) {
      const total = (parseInt(data?.price) + updatedPrice) * NumberOfDays;
      if (!isNaN(total)) {
        setCartPrice(total);
      }
    }
  }, [updatedPrice,NumberOfDays]);

  useEffect(() => {
    const priceArray = selectedAddOns.map((item) => item.price);
    const totalPrice = priceArray.reduce((total, price) => {
      // Convert price to a number before adding
      return total + Number(price);
    }, 0);

    let update = totalPrice;

    // if(vendor === "Caterer"){
    //   update = totalPrice ;
    // } else {
    //   update = totalPrice + parseInt(data?.price) ;
    // }

    setupdatedPrice(update);
  }, [selectedAddOns]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Added to Cart");
    }
  }, [isSuccess]);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "3rem" }}
      >
        <Typography variant="h6">
          Availability Check For {isPackage ? "Package" : "Service"}
        </Typography>
        <Box sx={{ cursor: "pointer" }} onClick={() => toggleDrawer(false)}>
          <CloseIcon />
        </Box>
      </Stack>
      <Box component="form" noValidate autoComplete="off">
        <Grid container mt={2}>
          <Grid item xs={10.5} md={12} mt={2}>
            <MultiDatePicker
              {...{ cartItem, setCartItem, filteredDates, setFilteredDates, setNumberOfDays }}
            />
          </Grid>

          {filteredDates?.map((items) => (
            <Grid item xs={10.5} md={6} mt={2}>
              <TimeRangePicker
                {...{
                  cartItem,
                  setCartItem,
                  vendor,
                  items,
                  timeArray,
                  setTimeArray,
                }}
              />
            </Grid>
          ))}

          {vendor === "Venue" || vendor === "Caterer" ? (
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                required
                id="quantity"
                label="Total Persons"
                name="quantity"
                value={cartItem.quantity}
                onChange={onChange}
                sx={{ width: "86%" }}
              />
            </Grid>
          ) : null}

          {vendor !== "Venue" && (
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                required
                id="location"
                label="Location "
                name="location"
                value={cartItem.location}
                onChange={onChange}
                sx={{ width: "86%" }}
              />
            </Grid>
          )}
          {/* {vendor === "Car Rental" && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="hours"
                  label="Total Hours "
                  name="hours"
                  value={cartItem.hours}
                  onChange={onChange}
                  sx={{ width: "88%", mt: 2 }}
                />
              </Grid> */}
          {/* <Grid item xs={12} md={12} mt={2}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select </FormLabel>
                  <RadioGroup
                    aria-label="option"
                    name="option"
                    value={cartItem.option}
                    onChange={onChange}
                    row
                  >
                    <FormControlLabel
                      value="With Driver"
                      control={<Radio />}
                      label="With Driver"
                    />
                    <FormControlLabel
                      value="Without Driver "
                      control={<Radio />}
                      label="Without Driver "
                    />
                  </RadioGroup>
                </FormControl>
              </Grid> */}
          {/* </>
          )} */}

          <Grid item xs={11} md={12}>
            <TextField
              required
              multiline
              rows={4}
              id="description"
              label="Private Note"
              name="description"
              value={cartItem.description}
              onChange={onChange}
              sx={{ width: "93%", mt: 3 }}
            />
          </Grid>
          <Grid item mt={4}>
            {addOnData?.map((addOnGroup, index) => (
              <div key={index}>
                <Typography variant="h6" mt={1}>
                  Add Ons
                </Typography>
                <Typography>
                  {addOnGroup?.addOn?.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.title !== "Starters" &&
                        item.title !== "Deserts" &&
                        item.title !== "Hot Beverages" ? (
                        <Typography
                          variant="body1"
                          fontWeight="normal"
                          style={{ maxHeight: "105px" }}
                        >
                          <Checkbox
                            checked={selectedAddOns.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                          />
                          {item.title} - {item.price} Rs
                        </Typography>
                      ) : (
                        <>
                          <Typography
                            variant="body1"
                            fontWeight="normal"
                            style={{ maxHeight: "105px" }}
                          >
                            {item.title}
                          </Typography>
                          {item?.category?.map(
                            (categoryItem, categoryIndex) => (
                              <Typography
                                key={categoryIndex}
                                variant="body1"
                                fontWeight="normal"
                                style={{ maxHeight: "105px" }}
                              >
                                <Checkbox
                                  checked={selectedAddOns.includes(
                                    categoryItem
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(categoryItem)
                                  }
                                />
                                {categoryItem.title} - {categoryItem.price} Rs
                              </Typography>
                            )
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </Typography>
              </div>
            ))}
          </Grid>

          {(isShow && filteredDates?.length > 0) && vendor !=='Car Rental' ? (
            <Grid item md={12} textAlign="left" ml={3} mt={2}>
              <Typography variant="h6">Price Per Day</Typography>
              {filteredDates?.map((items, index) => (
                <Typography key={index} variant="body1">{moment(items).format("MMMM Do YYYY")} : Rs. {cartPrice / NumberOfDays}</Typography>
              ))}
            </Grid>
          ):(isShow && timeArray?.length > 0) && 
           <Grid item md={12} textAlign="left" ml={3} mt={2}>
          <Typography variant="h6">Price Per Day</Typography>
          {timeArray?.map((items, index) => (
            <Typography key={index} variant="body1">{moment(items?.date).format("MMMM Do YYYY")} : Rs. {items?.price}</Typography>
          ))}
        </Grid>}

          <Grid item md={12} textAlign="left" ml={3} mt={2}>
            <Typography variant="h6">Total Price</Typography>
            <Typography variant="body1">{cartPrice}</Typography>
          </Grid>

          <Grid item xs={10} mt={2} md={12} textAlign="center">
            <SolidButton
              label="Check Availability"
              onClick={handleSubmit}
              btnwidth={isMobile ? "90%" : "40%"}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default function AvailabilityDrawer({
  open,
  toggleDrawer,
  userId,
  data,
  vendor,
  isPackage,
  addOnData,
}) {
  const isMobile = useIsMobile();
  return (
    <React.Fragment key={"anchor"}>
      <Drawer
        sx={{
          display: { sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            overflowX: "hidden",
            width: isMobile ? "90%" : "50%",
          },
        }}
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Content
          toggleDrawer={() => toggleDrawer(false)}
          userId={userId}
          vendor={vendor}
          data={data || []}
          isPackage={isPackage}
          addOnData={addOnData}
        />
      </Drawer>
    </React.Fragment>
  );
}
