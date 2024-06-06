import {
  Box,
  Button,
  Drawer,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import TimeAgo from "react-timeago";
import CloseIcon from "@mui/icons-material/Close";
import { useIsMobile } from "../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import { useReadNotificationMutation } from "../store/notificationsSlice"

export default function NotificationDrawer({ open, toggleDrawer, data, refetchAgain }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [readNotification] = useReadNotificationMutation()

  const view = (url, id) => {
    readNotification(id);
    navigate(url);
    refetchAgain()
  }
  return (
    <React.Fragment key={"anchor"}>
      <Drawer
        sx={{
          display: { sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            overflowX: "hidden",
            width: isMobile ? "80%" : "50%",
          },
        }}
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginLeft: "25px", marginRight: "25px" }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "400",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            Notifications
          </Typography>
          <Box
            sx={{ cursor: "pointer", maringRight: "1rem" }}
            onClick={() => toggleDrawer(false)}
          >
            <CloseIcon />
          </Box>
        </Stack>
        {/* <Box
          sx={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "18px",
            color: "#1a2b43",
          }}
        >
          No new notifications.
        </Box> */}
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ marginBottom: "10px", marginLeft: "25px" }}
        >
          {data?.length > 0 && (
            <Typography sx={{ fontFamily: "Bold" }}>Recent</Typography>
          )}
        </Grid>
        {data.length === 0
          ?
          (<Box
            sx={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "18px",
              color: "#1a2b43",
            }}
          >
            No new notifications.
          </Box>)
          :
          data?.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                backgroundColor: !item?.isRead && "#dac287",
                padding: "12px",
                marginLeft: "25px",
                marginRight: "25px",
                marginBottom: "20px",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ marginBottom: "10px" }}
              >
                <Typography sx={{ fontFamily: "Medium" }}>
                  {item?.text}
                </Typography>
                {!isMobile && (
                  new Date(item?.createdAt).getTime() >= Date.now() - 60000 ? (
                    <Typography variant="body2">Just Now</Typography>
                  ) : (
                    <TimeAgo date={item?.createdAt} />
                  )
                )}
              </Grid>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    background: "#1a2b43",
                    borderRadius: "8px",
                    fontFamily: "Semibold",
                    width: "100px",
                    height: "30px",
                    color: "white",
                  }}
                  onClick={() => {
                    view(item?.url, item?._id);
                  }}
                >
                  View
                </Button>
                {isMobile && (
                  new Date(item?.createdAt).getTime() >= Date.now() - 60000 ? (
                    <Typography variant="body2">Just Now</Typography>
                  ) : (
                    <TimeAgo date={item?.createdAt} />
                  )
                )}
              </Stack>
            </Paper>

          ))}
      </Drawer>
    </React.Fragment>
  );
}
