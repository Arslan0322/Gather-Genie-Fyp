import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { SolidButton } from "./SolidButton";
import CloseIcon from "@mui/icons-material/Close";
import { Form, useNavigate } from "react-router-dom";
import { useIsMobile } from "../contexts/isMobile";
import { useCreateNotificationMutation } from "../store/notificationsSlice";
import {socket} from "../socket"

export default function DeleteModal({ open, setOpen, deleteItem, id, option, refetchAgain,paymentID, sendNotification, refundAmount }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [createNotification] = useCreateNotificationMutation()

  const handleSubmit = () => {
    if(option){
      const body = {id, option,pid:paymentID, amount: parseInt(refundAmount)}
      deleteItem(body)
      createNotification(sendNotification)
      socket.emit("send-notification", sendNotification);
      refetchAgain();
      // navigate("/bookings"); 
    } else {
      deleteItem(id);
      navigate("/home");
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            width: 400,
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
              Do you want to Delete the Service?
            </Typography>
            <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </Box>
          </Stack>

          <Grid container justifyContent="center" mt={2}>
            <SolidButton
              label="Yes"
              onClick={handleSubmit}
              btnwidth={isMobile ? "90%" : "30%"}
            />
            <SolidButton
              label="No"
              onClick={handleSubmit}
              btnwidth={isMobile ? "90%" : "30%"}
            />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
