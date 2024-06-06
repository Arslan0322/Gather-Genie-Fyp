import { Grid, Card, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import { useIsMobile } from "../../contexts/isMobile";
import moment from "moment/moment";
import { useDeleteCartByIDMutation, useGetCartByIDQuery } from "../../store/cartsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount } from "../../store/cartCountsSlice";
import { SolidButton } from "../../Components/SolidButton";
import TimeModal from "../../Components/TimeModal";
import EditAvailabilityDrawer from "../../Components/EditAvailabilityDrawer";

export default function AddToCartCard({ data, refetchAgain }) {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const countState = useSelector((state) => state?.cartCount);
  const _id = useSelector((state) => state?.user?.userInfo?.data?._id);
  const [dateTimeData, setDateTimeData] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteCart, { isSuccess }] = useDeleteCartByIDMutation();
  const {data: cartData, isLoading: isCartLoading, refetch} = useGetCartByIDQuery(cartId)
  const isPackage =
    cartData?.data?.servicesId?.userId?.vendor === "Photographer" || cartData?.data?.servicesId?.userId?.vendor === "Decor";

  const handleDelete = async (id) => {
    const updatedCountState = countState - 1;
    dispatch(setCartCount(updatedCountState));
    // Removing the cart from localStorage
    const CartDataArray = JSON.parse(localStorage.getItem("CartData"));
    const filteredArray = CartDataArray.filter((item) => item?.cartId !== id);
    localStorage.setItem("CartData", JSON.stringify(filteredArray));

    // Removing the cart from mongoDB
    const data = await deleteCart(id);
    if (data) {
      toast.success("Successfully Removed from Cart");
    }
    refetchAgain();
  };

  const refetchCart = ()=>{
    refetch()
  }

  
  const closeEdit = () => {
    setEditOpen(!editOpen);
  }

  const handleEdit = (id) => {
    setCartId(id)
    refetchCart()
    closeEdit()
  };

  const handleDateModal = (e, date) => {
    setDateTimeData(date);
    setOpen(!open);
  };

  React.useEffect(()=>{
    refetch()
  },[])

  return (
    <>
      {data?.length === 0 ? (
        <Typography variant="h6" textAlign="center" mt={4}>
          No items in the cart
        </Typography>
      ) : (
        data?.map((item, index) => (
          <Card
            elevation={2}
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              marginBottom: 2,
            }}
          >
            <Grid
              key={index}
              container
              spacing={2}
              justifyContent={isMobile && "center"}
            >
              <Grid
                md={3}
                xs={12}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={
                    item?.servicesId?.coverImage
                      ? `http://localhost:5000/uploads/${item?.servicesId?.coverImage}`
                      : require("../../assests/noimg.jpeg")
                  }
                  alt="Logo"
                  style={{
                    width: isMobile ? 200 : 160,
                    marginLeft: "60px",
                  }}
                />
              </Grid>

              <Grid item md={3} xs={4} mt={2} ml={1} mb={!isMobile && 2}>
                <Typography variant="body1">
                  {item.servicesId?.userId?.vendor === "Photographer" ||
                  item.servicesId?.userId?.vendor === "Decor"
                    ? "Package"
                    : "Service"}{" "}
                  Name{" "}
                </Typography>
                <Typography variant="body2">{item?.servicesId?.name} </Typography>
                <Typography variant="body1" mt={2}>
                  Date & Time
                </Typography>
                <SolidButton
                  label="View Details"
                  onClick={(e) => handleDateModal(e, item.dateTime)}
                  btnwidth={isMobile ? "40%" : "50%"}
                />
                {/* <Typography variant="body1" mt={2}>
                  Event Date
                </Typography>
                <Typography variant="body2">
                  {moment(item?.eventDate).format("MMMM Do YYYY")}
                </Typography>*/}
              </Grid> 
              <Grid item md={3} xs={4} mt={2} mb={!isMobile && 2}>
                <Typography variant="body1">
                  {item?.servicesId?.userId?.vendor === "Photographer" ||
                  item?.servicesId?.userId?.vendor === "Decor"
                    ? "Package"
                    : "Service"}{" "}
                  Total Price{" "}
                </Typography>
                <Typography variant="body2">{item?.cartPrice} </Typography>
                {/* <Typography variant="body1" mt={2}>
                  Event Time
                </Typography>
                <Typography variant="body2">
                  {moment(item?.eventTime).format("hh:mm A")} -
                  {moment(item?.endTime).format("hh:mm A")}
                </Typography> */}
              </Grid>

              <Grid item md={2} xs={4} mt={2}>
                {item?.servicesId?.userId?.vendor !== "Venue" && (
                  <>
                    <Typography variant="body1">Location</Typography>
                    <Typography variant="body2">
                      {item?.location}
                    </Typography>{" "}
                  </>
                )}
                {(item?.servicesId?.userId?.vendor === "Venue" ||
                  item?.servicesId?.userId?.vendor === "Caterer") && (
                  <>
                    <Typography variant="body1" mt={!isMobile && 2}>
                      No. of Persons
                    </Typography>
                    <Typography variant="body2">{item?.quantity}</Typography>
                  </>
                )}
                {item?.servicesId?.userId?.vendor === "Car Rental" && (
                  <>
                    <Typography variant="body1" mt={2}>
                      No. of hours{" "}
                    </Typography>
                    <Typography variant="body2">{item?.hours}</Typography>
                  </>
                )}

                <IconButton
                  onClick={() => handleDelete(item?._id)}
                  style={{
                    marginLeft: isMobile ? "8rem" : "12rem",
                    marginTop: isMobile ? 0 : 4,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleEdit(item?._id)}
                  style={{
                    marginLeft: isMobile ? "8rem" : "12rem",
                    marginTop: isMobile ? 0 : 4,
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))
      )}
      <TimeModal {...{ open, setOpen }} dateTimeData={dateTimeData || []} />
      <EditAvailabilityDrawer
        open={editOpen}
        toggleDrawer={closeEdit}
        data={cartData?.data || []}
        userId={_id}
        vendor={cartData?.data?.servicesId?.userId?.vendor || null}
        isPackage={isPackage}
        addOnData={cartData?.serviceAddOns?.addOn || []}
        isLoading={isCartLoading}
        refetchAgain={refetchAgain}
      />
    </>
  );
}
