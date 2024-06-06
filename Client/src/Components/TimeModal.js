import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-router-dom";
import { useIsMobile } from "../contexts/isMobile";
import moment from "moment";

export default function TimeModal({ open, setOpen, dateTimeData }) {
  const isMobile = useIsMobile();

  const handleSubmit = () => {
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
        // onSubmit={handleSubmit}
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
            width: 500,
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
              Event Date & Time Details
            </Typography>
            <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(false)}>
              <CloseIcon />
            </Box>
          </Stack>

          <Grid container justifyContent="center" textAlign="center" mt={2}>
            <Grid item md={6} xs={6}>
              <Typography variant="h6">Event Date</Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Typography variant="h6">Event Time</Typography>
            </Grid>
            {dateTimeData?.map((items, index) => (
              <>
                <Grid item md={6} xs={6}>
                  <Typography key={index} variant="body1" mt={2}>
                    {" "}
                    {moment(items?.date).format("MMMM Do YYYY")}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={6}>
                  <Typography key={index} variant="body1" mt={2}>
                    {moment(items?.eventTime).format("hh:mm A")} -{" "}
                    {moment(items?.endTime).format("hh:mm A")}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}