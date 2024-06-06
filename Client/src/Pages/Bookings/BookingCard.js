import React, { useState, useEffect } from "react";
import service from "../../assests/download.jpg";
import { Card, Grid, Rating, Typography } from "@mui/material";
import { useIsMobile } from "../../contexts/isMobile";
import ReviewModal from "../../Components/ReviewModal";
import { SolidButton } from "../../Components/SolidButton";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../Components/DeleteModal";
import moment from "moment";
import { useCancelBookingMutation } from "../../store/bookingsSlice";
import { useReportCartMutation } from "../../store/cartsSlice";
import { useCreateNotificationMutation } from "../../store/notificationsSlice";
import { useCreateChatMutation } from "../../store/chatsSlice";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { isBookingRecent } from "./functions";
import TimeModal from "../../Components/TimeModal";

export function BookingCard({
  currentTab,
  data,
  refetchAgain,
  reviewData,
  refetchReviewAgain,
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [cartID, setCartID] = useState(null);
  const [sendNotification, setSendNotification] = useState(null);
  const [sendNotificationAdmin, setSendNotificationAdmin] = useState(null);
  const [modalID, setModalID] = useState(null);
  const [bookingID, setBookingID] = useState(null);
  const [username, setUsername] = useState(null);
  const [serviceName, setServiceName] = useState(null);
  const [refundAmount, setRefundAmount] = useState(null);
  const [paymentID, setPaymentID] = useState(null);
  const [isEmpty, setIsEmpty] = useState(null);
  const [dateTimeData, setDateTimeData] = useState([]);
  const [openDate, setOpenDate] = useState(false);

  const _id = useSelector((state) => state?.user?.userInfo?.data?._id);
  const name = useSelector((state) => state?.user?.userInfo?.data?.name);

  const navigate = useNavigate();
  const [cancelBooking] = useCancelBookingMutation();
  const [reportCart] = useReportCartMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [createChat] = useCreateChatMutation();

  const handleClick = (id, bookingId, rid, servicename) => {
    const sendingData = {
      senderId: _id,
      receiverId: rid,
      text: `${name} has reviewed your ${servicename} booking `,
      url: `/vendorbookings`,
      createdAt: `${new Date()}`,
    };

    const sendingDataAdmin = {
      senderId: _id,
      toAdmin: true,
      // text: `${name} has reviewed ${servicename} by 1 rating `,
      url: `/home/payments`,
      createdAt: `${new Date()}`,
    };

    setSendNotification(sendingData);
    setSendNotificationAdmin(sendingDataAdmin);

    setUsername(name);
    setServiceName(servicename);
    setBookingID(bookingId);
    setModalID(id);
    setOpen(!open);
  };

  const handleDelete = (id, rid, servicename, amount, pid) => {
    const sendingData = {
      senderId: _id,
      receiverId: rid,
      text: `${name} has been cancelled booking for ${servicename}`,
      url: `/vendorbookings`,
      createdAt: `${new Date()}`,
    };

    setSendNotification(sendingData);

    setRefundAmount(amount);
    setPaymentID(pid);
    setCartID(id);
    setOpenCancel(!openCancel);
  };

  const handleReport = async (id, rid, servicename) => {
    await reportCart(id);

    // 1- Notification will be sent to vendor
    const notificationData = {
      senderId: _id,
      receiverId: rid,
      text: `We have received a report about ${servicename} service; admin is investigating`,
      url: "/vendorbookings",
      createdAt: `${new Date()}`,
    };

    await createNotification(notificationData);
    socket.emit("send-notification", notificationData);

    // 2- Notification will be sent to admin as well.
    const adminNotificationData = {
      senderId: _id,
      toAdmin: true,
      text: `${name} report against ${servicename}`,
      url: `/home/payments`,
      createdAt: `${new Date()}`,
    };

    await createNotification(adminNotificationData);
    socket.emit("send-notification-to-admin", adminNotificationData);

    refetchAgain();
  };

  const handleDateModal = (e, date) => {
    setDateTimeData(date);
    setOpenDate(!openDate);
  };

  const handleChat = async (userId) => {
    if (_id) {
      const body = {
        senderId: _id,
        receiverId: userId,
      };
      const responseData = await createChat(body);

      if (responseData?.data?._id) {
        navigate(`/chat/${responseData?.data?._id}`);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (data) {
      const allCartIdsZero = data.filter((item) => item.cartId.length !== 0);
      const check = allCartIdsZero?.length > 0;
      setIsEmpty(check);
    }
  }, [currentTab, data]);

  return (
    <>
      {isEmpty ? (
        data?.map((item) => {
          return (
            <>
              {item?.cartId?.map((cartItem, cartIndex) => {
                return (
                  <Grid key={cartIndex} md={12} xs={12} alignItems="center">
                    <Card
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
                                : require("../../assests/noimg.jpeg")
                            }
                            alt="Logo"
                            style={{
                              width: isMobile ? 200 : 150,
                            }}
                          />
                        </Grid>

                        <Grid item md={2} xs={12} mb={!isMobile && 10}>
                          <Typography variant="body1">Service Name </Typography>
                          <Typography variant="body2">
                            {cartItem?.servicesId?.name}
                          </Typography>
                        </Grid>
                        <Grid item md={2} xs={12}>
                          <Typography variant="body1">Service Type </Typography>
                          <Typography variant="body2">
                            {cartItem?.servicesId?.userId?.vendor}
                          </Typography>
                        </Grid>
                        <Grid item md={2} xs={12}>
                          {/* <Typography variant="body1">Event Date </Typography>
                          <Typography variant="body2">
                            {moment(cartItem?.eventDate).format("MMMM Do YYYY")}
                          </Typography> */}
                          <Typography variant="body1" >
                            Date & Time
                          </Typography>
                          <SolidButton
                            label="View Details"
                            onClick={(e) => handleDateModal(e, cartItem.dateTime)}
                            btnwidth={isMobile ? "40%" : "70%"}
                          />
                        </Grid>
                        {/* <Grid item md={2} xs={12}>
                          <Typography variant="body1">Event Time </Typography>
                          <Typography variant="body2">
                            {moment(item.eventTime).format("hh:mm A")} -
                            {moment(item.endTime).format("hh:mm A")}
                          </Typography>
                       
                        </Grid> */}
                        <Grid item md={2} xs={12}>
                          <Typography variant="body1">Status </Typography>
                          <Typography variant="body2">
                            {cartItem?.status}{" "}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          mt={!isMobile && "-5.5rem"}
                          mx={!isMobile && "11.5rem"}
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
                              mt={isMobile ? 2 : 0}
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

                                        <Typography variant="body1" mt={2}>
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

                        {currentTab === "current" && (
                          <>
                            {" "}
                            <Grid
                              item
                              md={12}
                              xs={12}
                              ml={isMobile ? "2rem" : "11.5rem"}
                              mt={isMobile ? 2 : 0}
                            >
                              <SolidButton
                                label="Contact Vendor"
                                onClick={() =>
                                  handleChat(cartItem?.servicesId?.userId?._id)
                                }
                                btnwidth={isMobile ? "60%" : "20%"}
                              />
                            </Grid>
                            <Grid
                              item
                              md={6}
                              xs={12}
                              ml={isMobile ? 4 : "80%"}
                              mt={isMobile ? 2 : -6}
                            >
                              {cartItem.status === "Accept" && (
                                <SolidButton
                                  label="Cancel Booking"
                                  onClick={() =>
                                    handleDelete(
                                      cartItem?._id,
                                      cartItem?.servicesId?.userId?._id,
                                      cartItem?.servicesId?.name,
                                      cartItem?.servicesId?.price,
                                      item?.paymentId
                                    )
                                  }
                                  btnwidth={isMobile ? "60%" : "70%"}
                                />
                              )}
                            </Grid>
                          </>
                        )}
                        {cartItem?.status === "Complete" &&
                          !reviewData?.some(
                            (item) => item?.cartId?._id === cartItem?._id
                          ) &&
                          cartItem?.cartPaymentStatus !== "Refunded" &&
                          !cartItem?.isReported && (
                            <>
                              <Grid
                                item
                                md={3}
                                xs={12}
                                ml={isMobile ? 1 : "67%"}
                                mt={isMobile ? 1 : -6}
                              >
                                <SolidButton
                                  label="Review Service"
                                  onClick={() =>
                                    handleClick(
                                      cartItem?._id,
                                      item?._id,
                                      cartItem?.servicesId?.userId?._id,
                                      cartItem?.servicesId?.name
                                    )
                                  }
                                  btnwidth={isMobile ? "50%" : "50%"}
                                >
                                  Review Service
                                </SolidButton>
                              </Grid>
                              {isBookingRecent(
                                cartItem?.updatedAt,
                                cartItem?.cartPaymentStatus
                              ) &&
                                !reviewData?.some(
                                  (item) => item?.cartId?._id === cartItem?._id
                                ) && (
                                  <Grid
                                    item
                                    md={3}
                                    xs={12}
                                    ml={isMobile ? 1 : "80%"}
                                    mt={isMobile ? 1 : -6.5}
                                  >
                                    <SolidButton
                                      label="Report"
                                      onClick={() =>
                                        handleReport(
                                          cartItem?._id,
                                          cartItem?.servicesId?.userId?._id,
                                          cartItem?.servicesId?.name
                                        )
                                      }
                                      btnwidth={isMobile ? "50%" : "50%"}
                                    >
                                      Report
                                    </SolidButton>
                                  </Grid>
                                )}
                            </>
                          )}
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
            </>
          );
        })
      ) : (
        <Grid md={12} xs={12}>
          <Typography variant="h6" textAlign="center" mt={4}>
            No Data Availabe
          </Typography>
        </Grid>
      )}

      <ReviewModal
        open={open}
        setOpen={setOpen}
        data={reviewData}
        id={modalID}
        sendNotification={sendNotification}
        sendNotificationAdmin={sendNotificationAdmin}
        bookingID={bookingID}
        isClient={true}
        refetchAgain={refetchReviewAgain}
        username={username}
        serviceName={serviceName}
      />
      <DeleteModal
        open={openCancel}
        setOpen={setOpenCancel}
        deleteItem={cancelBooking}
        id={cartID}
        paymentID={paymentID}
        refundAmount={refundAmount}
        option={"Cancel"}z
        sendNotification={sendNotification}
        refetchAgain={refetchAgain}
        label=" cancel the booking?"
      />
      <TimeModal open={openDate} setOpen={setOpenDate} dateTimeData={dateTimeData || []} />
    </>
  );
}
