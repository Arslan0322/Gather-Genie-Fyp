import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import VendorCard from "../../Components/VendorCard";
import { useIsMobile } from "../../contexts/isMobile";
import { SolidButton } from "../../Components/SolidButton";
import { useNavigate } from "react-router-dom";
import { useCreateChatMutation } from "../../store/chatsSlice";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import { toast } from "react-toastify";

export function VendorDetail({ data, allServices, allReview }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const _id = useSelector((state) => state?.user?.userInfo?.data?._id);
  const [createChat] = useCreateChatMutation();

  const handleClick = async () => {
    if (_id) {
      const body = {
        senderId: _id,
        receiverId: data?.userId?._id,
      };
      const responseData = await createChat(body);

      if (responseData?.data?._id) {
        navigate(`/chat/${responseData?.data?._id}`);
      } else {
        toast.error("Something went wrong, Try again!");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Container sx={{ marginBottom: "2rem" }}>
        <Grid item>
          <Typography variant="h6" mt={6}>
            Vendor Details
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={10}>
            <Typography variant="h6" mt={1}>
              Name
            </Typography>
            <Typography variant="body1">
              {data?.userId?.firstname} {data?.userId?.lastname}
            </Typography>
            <Typography variant="h6" mt={1}>
              City
            </Typography>
            <Typography variant="body1" mb={2}>
              {data?.userId?.city}
            </Typography>

            <SolidButton
              label="Contact Vendor"
              onClick={handleClick}
              btnwidth={isMobile ? "100%" : "30%"}
            />
          </Grid>
          {allReview ? (
            <>
              {allReview?.map((item) => (
                <Grid item md={3} xs={12}>
                  <ReviewCard data={item} />
                </Grid>
              ))}
            </>
          ) : (
            <Grid item md={3}>
              <Typography variant="body1">No Ratings Available</Typography>
            </Grid>
          )}

          {allServices.length > 0 && (
            <Typography variant="h5" mt={2} width={isMobile ? 350 : 1100}>
              All Services
              <Grid container spacing={2} mt={2}>
                <VendorCard data={allServices} />
              </Grid>
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
