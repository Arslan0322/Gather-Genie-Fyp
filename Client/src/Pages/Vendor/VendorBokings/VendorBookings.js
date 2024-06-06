import React, { useEffect, useState } from "react";
import { Card, Grid, Rating, Typography } from "@mui/material";
import { useIsMobile } from "../../../contexts/isMobile";
import { SolidButton } from "../../../Components/SolidButton";
import moment from "moment";
import {
  useAcceptBookingMutation,
  useCancelBookingMutation,
  useCompleteBookingMutation,
} from "../../../store/bookingsSlice";
import { useCreateNotificationMutation } from "../../../store/notificationsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { socket } from "../../../socket";
import TimeModal from "../../../Components/TimeModal";

export function VendorBookings({ currentTab, data, refetchAgain, reviewData }) {
  const isMobile = useIsMobile();

  const senderId = useSelector((state) => state?.user?.userInfo?.data?._id);

  const [isEmpty, setIsEmpty] = useState(null);
  const [dateTimeData, setDateTimeData] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [acceptBooking, { isSuccess }] = useAcceptBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [completeBooking, { isSuccess: isSuccessComplete }] =
    useCompleteBookingMutation();
  const [createNotification] = useCreateNotificationMutation();
  const option = "Reject";

  const handleDateModal = (e, date) => {
    setDateTimeData(date);
    setOpenDate(!openDate);
  };

  const createNotificationFunction = async (body) => {
    await createNotification(body);
  };

  const handleCancel = (id, rid, name, pid, amount) => {
    const body = { id, option, pid, amount: parseInt(amount) };
    const sendingData = {
      senderId,
      receiverId: rid,
      text: `Your booking for ${name} has been rejected`,
      url: `/bookings`,
      createdAt: `${new Date()}`,
    };

    cancelBooking(body);

    createNotificationFunction(sendingData);
    socket.emit("send-notification", sendingData);

    refetchAgain();
  };

  const handleAccept = (id, rid, name) => {
    const sendingData = {
      senderId,
      receiverId: rid,
      text: `Your booking for ${name} has been accepted`,
      url: `/bookings`,
      createdAt: `${new Date()}`,
    };

    acceptBooking(id);

    createNotificationFunction(sendingData);
    socket.emit("send-notification", sendingData);

    refetchAgain();
  };

  const handleComplete = (id, rid, name) => {
    const sendingData = {
      senderId,
      receiverId: rid,
      text: `Your booking for ${name} has been Completed`,
      url: `/bookings`,
      createdAt: `${new Date()}`,
    };

    completeBooking(id);

    createNotificationFunction(sendingData);
    socket.emit("send-notification", sendingData);

    refetchAgain();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Booking accepted Successfully");
    }

    if (isSuccessComplete) {
      toast.success("Booking complete Successfully");
    }
  }, [isSuccess, isSuccessComplete]);

  useEffect(() => {
    const allCartIdsZero = data?.filter((item) => item.cartId.length !== 0);
    const check = allCartIdsZero?.length > 0;
    setIsEmpty(check);
  }, [currentTab]);

  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <>
      {isEmpty ? (
        data?.map((item, index) => {
          return (
            <>
              <Grid key={index} md={12} xs={12} alignItems="center">
                {item?.cartId?.map((cartItem, cartIndex) => {
                  return (
                    <Card
                      key={cartIndex}
                      elevation={2}
                      sx={{
                        marginTop: 6,
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 2,
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        margin={2}
                        justifyContent={isMobile ? "center" : "left"}
                      >
                        <Grid
                          md={2}
                          xs={12}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={
                              cartItem?.servicesId?.coverImage
                                ? `http://localhost:5000/uploads/${cartItem?.servicesId?.coverImage}`
                                : require("../../../assests/noimg.jpeg")
                            }
                            alt="Logo"
                            style={{
                              width: isMobile ? 200 : 150,
                            }}
                          />
                        </Grid>

                        <Grid item md={2} xs={12}>
                          <Typography variant="body1">Service Name </Typography>
                          <Typography variant="body2">
                            {cartItem.servicesId.name}
                          </Typography>
                        </Grid>
                        <Grid item md={2} xs={12}>
                          <Typography variant="body1">Service Type </Typography>
                          <Typography variant="body2">
                            {cartItem.servicesId.userId.vendor}
                          </Typography>
                        </Grid>
                        <Grid item md={2} xs={12}>
                        <Typography variant="body1" >
                            Date & Time
                          </Typography>
                          <SolidButton
                            label="View Details"
                            onClick={(e) => handleDateModal(e, cartItem.dateTime)}
                            btnwidth={isMobile ? "40%" : "70%"}
                          />
                          {/* <Typography variant="body1">Event Date </Typography>
                          <Typography variant="body2">
                            {moment(cartItem.eventDate).format("MMMM Do YYYY")}
                          </Typography> */}
                        </Grid>
                        {/* <Grid item md={2} xs={12}>
                          <Typography variant="body1">Event Time </Typography>
                          <Typography variant="body2">
                            {moment(item.eventTime).format("hh:mm A")} -
                            {moment(item.endTime).format("hh:mm A")}
                          </Typography>
                        </Grid> */}
                        <Grid item md={2} xs={12}>
                          <Typography variant="body1">Status</Typography>
                          <Typography variant="body2">
                            {cartItem.status}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          mt={!isMobile && "-2.5rem"}
                          ml={!isMobile && "11.5rem"}
                          mr={isMobile ? "4rem" : "11rem"}
                        >
                          <Typography variant="body1">Private Note </Typography>
                          <Typography variant="body2">
                            {cartItem?.description}
                          </Typography>
                        </Grid>
                        {currentTab !== "current" &&
                          cartItem?.status === "Complete" && (
                            <Grid
                              item
                              md={6}
                              xs={12}
                              ml={isMobile ? 0 : "11.5rem"}
                              mt={isMobile ? 2 : -2}
                              mr={isMobile && "4rem"}
                            >
                              {reviewData?.map((review) => {
                                return (
                                  <>
                                    {cartItem?._id === review?.cartId?._id && (
                                      <>
                                        <Typography variant="body1">
                                          Comments
                                        </Typography>
                                        <Typography variant="body2">
                                          {review?.client?.comment}{" "}
                                        </Typography>

                                        <Typography variant="body1" mt={1}>
                                          {" "}
                                          Ratings
                                        </Typography>
                                        <Rating
                                          name="review"
                                          value={review?.client?.rating}
                                          readOnly="true"
                                          precision={1}
                                        />
                                      </>
                                    )}
                                  </>
                                );
                              })}
                            </Grid>
                          )}
                        {currentTab === "upcoming" && (
                          <Grid
                            container
                            justifyContent={!isMobile && "end"}
                            ml={!isMobile && -6}
                            item
                            xs={12}
                          >
                            <SolidButton
                              label="Accept"
                              onClick={() =>
                                handleAccept(
                                  cartItem._id,
                                  item?.userId,
                                  cartItem?.servicesId?.name
                                )
                              }
                              btnwidth={isMobile ? "20%" : "8%"}
                            />
                            <SolidButton
                              label="Reject"
                              onClick={() =>
                                handleCancel(
                                  cartItem._id,
                                  item?.userId,
                                  cartItem?.servicesId?.name,
                                  item?.paymentId,
                                  cartItem?.servicesId?.price
                                )
                              }
                              btnwidth={isMobile ? "20%" : "8%"}
                            />
                          </Grid>
                        )}

                        {cartItem?.status === "Accept" && (
                          <Grid
                            container
                            justifyContent={!isMobile && "end"}
                            ml={!isMobile && -20}
                          >
                            <SolidButton
                              label="Complete"
                              onClick={() =>
                                handleComplete(
                                  cartItem._id,
                                  item?.userId,
                                  cartItem?.servicesId?.name
                                )
                              }
                              btnwidth={isMobile ? "40%" : "8%"}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Card>
                  );
                })}
              </Grid>
            </>
          );
        })
      ) : (
        <Typography
          variant="h6"
          textAlign="center"
          mt={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          No Data Availabe
        </Typography>
      )}

      <TimeModal open={openDate} setOpen={setOpenDate} dateTimeData={dateTimeData || []} />

    </>
  );
}
