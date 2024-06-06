import { Grid, Container, IconButton, Typography, Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import BookForm from "../../Components/BookForm";
import { useIsMobile } from "../../contexts/isMobile";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddToCartCard from "./AddToCartCard";
import { useNavigate } from "react-router-dom";
import { SolidButton } from "../../Components/SolidButton";
import Navbar from "../../Components/layout/Navbar";
import {
  useCheckoutCartByUserIDMutation,
  useFindCartByUserIDQuery,
} from "../../store/cartsSlice";
import Loader from "../../Components/Loader";
import { useCreateBookingMutation } from "../../store/bookingsSlice";
import { useCreateNotificationMutation } from "../../store/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "../../socket";
import StripeCheckout from "react-stripe-checkout";
import { setCartCount } from "../../store/cartCountsSlice";

export default function AddToCartPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = useFindCartByUserIDQuery();
  const [createBooking, { isSuccess, isLoading: createLoading }] =
    useCreateBookingMutation();
  const [CheckoutCartByUserID] = useCheckoutCartByUserIDMutation();
  const [createNotification] = useCreateNotificationMutation();

  const _id = useSelector((state) => state.user?.userInfo?.data?._id);
  const name = useSelector((state) => state.user?.userInfo?.data?.name);
  const [cartId, setCartId] = useState([]);
  const [total, setTotal] = useState(0);
  const [earning, setEarning] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    description: "",
    guests: "",
  });

  const refetchAgain = async () => {
    await refetch();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const createNotificationFunction = async (body) => {
    await createNotification(body);
  };

  const handlepay = async (token) => {
    const Bookingdata = await createBooking({
      ...bookingForm,
      userId: _id,
      cartId: cartId,
      token,
      total: earning,
      amount: total,
    });

    if (Bookingdata?.error) {
      toast.error("Something went wrong, Try again later!");
    } else {
      await CheckoutCartByUserID();

      dispatch(setCartCount(0));

      const CartDataArray = JSON.parse(localStorage.getItem("CartData"));
      const filteredArray = cartId.flatMap((item) => {
        return CartDataArray.filter(
          (CartDataItem) => CartDataItem.cartId === item
        );
      });

      for (let i = 0; i < filteredArray.length; i++) {
        const notificationData = {
          senderId: _id,
          receiverId: filteredArray[i].userId, // Assuming each filtered item has a 'userId' property
          text: `A new booking from ${name}`,
          url: "/vendorbookings",
          createdAt: `${new Date()}`,
        };
        createNotificationFunction(notificationData);
        socket.emit("send-notification", notificationData);
      }

      localStorage.removeItem("CartData");

      refetchAgain();
    }
  };

  useEffect(() => {
    if (data) {
      const filteredCartIds = data.map((item) => item._id);
      const filteredTotalAmount = data.map((item) => parseInt(item.cartPrice));
      const sum = filteredTotalAmount.reduce((acc, price) => acc + price, 0);
      const isDiscount = data?.length > 1;
      if (isDiscount) {
        setEarning(0);
        setTotal(sum);
      } else {
        setTotal(parseInt(sum) + 20);
        setEarning(20);
      }

      setCartId(filteredCartIds);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your booking is being placed");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!_id) return navigate("/login");
  }, [_id]);

  if (isLoading || createLoading) return <Loader />;

  return (
    <>
      <Navbar />
      <Container sx={{ margin: isMobile ? 0 : 6 }}>
        <Grid container spacing={2} alignItems="center" p={2}>
          <Grid
            container
            spacing={2}
            justifyContent="right"
            mt={isMobile ? 2 : 0}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <IconButton onClick={handleBackClick}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6">Shopping Cart</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Card
          elevation={2}
          sx={{
            margin: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3} p={2}>
            <Grid item md={12}>
              <AddToCartCard data={data} refetchAgain={refetchAgain} />
            </Grid>
            {data?.length > 0 && (
              <Grid item md={12} textAlign="left" ml={3} mt={1}>
                {data?.length > 1 ? (
                  <>
                    <Typography variant="h6">Discount</Typography>
                    <Typography variant="body1">
                      {parseInt(total) + 20} - 20
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">Service Fee</Typography>
                    <Typography variant="body1">20</Typography>
                  </>
                )}
                <Typography variant="h6">Total Price</Typography>
                <Typography variant="body1">{total}</Typography>
              </Grid>
            )}

            {/* <Grid item md={5}>
              <BookForm {...{ bookingForm, setBookingForm }} />
            </Grid> */}
          </Grid>

          {data?.length > 0 && (
            <Grid item m={4}>
              {/* <SolidButton label="Proceed To Pay" onClick={handlepay} /> */}
              <StripeCheckout
                amount={total * 100}
                token={handlepay}
                currency="PKR"
                stripeKey="pk_test_51P1nTOGlYvYtl5HIM9zmXpOvyjFr27MkY6ya96HZX4waXlsl17AbXONvgAsCnVks0gkgDx2mFj1WpMfOTVb8Iwsi00v1UzIWfl"
              >
                <SolidButton label={`Pay Rs.${total}`} />
              </StripeCheckout>
            </Grid>
          )}
        </Card>
      </Container>
    </>
  );
}
