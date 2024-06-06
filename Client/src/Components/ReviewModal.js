import {
  Box,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { SolidButton } from "./SolidButton";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCreateReviewMutation } from "../store/reviewsSlice";
import { useCreateNotificationMutation } from "../store/notificationsSlice";
import { socket } from "../socket";
import { useIsMobile } from "../contexts/isMobile";

export default function ReviewModal({
  open,
  setOpen,
  data,
  id,
  sendNotification,
  bookingID,
  isClient,
  refetchAgain,
  username,
  serviceName,
  sendNotificationAdmin,
}) {
  const [review, setReview] = useState(null); // Default rating value
  const [comment, setComment] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const _id = useSelector((state) => state.user.userInfo?.data?._id);

  const [createReview] = useCreateReviewMutation();
  const [createNotification] = useCreateNotificationMutation();
  const isMobile = useIsMobile();
  const handleReviewChange = (event, newReview) => {
    setReview(newReview);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let body = {};

      if (reviewData.length > 0) {
        body = {
          ...reviewData[0],
          [isClient ? "client" : "vendor"]: {
            userId: _id,
            comment,
            rating: review,
          },
        };
      } else if (bookingID || id) {
        body = {
          bookingId: bookingID,
          cartId: id,
          [isClient ? "client" : "vendor"]: {
            userId: _id,
            comment,
            rating: review,
          },
        };
      } else {
        throw new Error("Missing data for review");
      }

      const sendingDataAdmin = {
        ...sendNotificationAdmin,
        text: `${username} has reviewed ${serviceName} by ${review} stars `,
      };

      await createReview(body);
      await createNotification(sendNotification);
      socket.emit("send-notification", sendNotification);
      await createNotification(sendingDataAdmin);
      socket.emit("send-notification-to-admin", sendingDataAdmin);
      toast.success("Service Reviewed Successfully");
      refetchAgain();
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      const filteredData = data?.filter((item) => {
        return item.cartId._id === id;
      });
      setReviewData(filteredData);
    }
  }, [id]);

  return (
    <div>
      <Modal
        component={Form}
        open={open}
        onSubmit={handleSubmit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? 350 : 400,
            bgcolor: "#F5F5F5",
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Client Review
            </Typography>
            <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </Box>
          </Stack>
          <Box id="modal-modal-description" md={12} xs={12} sx={{ mt: 2 }}>
            <Rating
              name="review"
              value={review}
              precision={1}
              onChange={handleReviewChange}
            />

            <TextField
              onChange={handleCommentChange}
              label="Comments"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rows={4}
              sx={{ width: "100%", mt: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Box sx={{ ml: "auto" }}>
                <SolidButton label="Review" onClick={handleSubmit} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
