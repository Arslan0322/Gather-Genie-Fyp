import React, { useEffect, useState, useRef } from "react";
import {
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Paper,
  Container,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChatSidebar from "./ChatSidebar";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  useGetMessagesQuery,
  useGetUserChatQuery,
  useCreateMessageMutation,
} from "../../store/chatsSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../Components/Loader";
import { socket } from "../../socket";

const Messages = () => {
  const { id } = useParams();
  const [createMessage] = useCreateMessageMutation();
  const scroll = useRef();
  const [chatData, setChatData] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [sendNotification, setSendNotification] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const chat = id ? true : false;
  const _id = useSelector((state) => state.user?.userInfo?.data?._id);
  const vendor = useSelector((state) => state.user?.userInfo?.data?.vendor);
  const name = useSelector((state) => state.user?.userInfo?.data?.name);
  const userPhoto = useSelector(
    (state) => state.user?.userInfo?.data?.userPhoto
  );
  const { data, isLoading, refetch } = useGetMessagesQuery(id);
  const { data: userChat, isLoading: chatLoading } = useGetUserChatQuery(_id);

  const navigate = useNavigate();
  const handleBackClick = () => {
    const isVendor = vendor ? "/home" : "/bookings";
    navigate(isVendor);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const [NewMessage, setNewMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const onSave = async () => {
    let chat;
    if (id) {
      chat = chatData?.filter((item) => item?._id === id);
    }
    const receiverId = chat[0]?.members[0]?._id;

    if (receiverId) {
      const message = {
        senderId: _id,
        text: NewMessage,
        chatId: id,
        senderType: vendor ? "Vendor" : "Client",
        receiverId,
      };

      const notification = {
        senderId: _id,
        receiverId,
        text: `A new message from ${name}`,
        url: `/chat/${id}`,
        createdAt: `${new Date()}`,
      };

      setSendMessage(message);
      setSendNotification(notification);

      const creationData = await createMessage(message);
      setMessageData([...messageData, creationData?.data]);
      setNewMessage("");
    }
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  useEffect(() => {
    if (data) {
      setMessageData(data);
    }
  }, [data, _id]);

  useEffect(() => {
    // Check if the 'userChat' variable is defined and not null
    if (userChat) {
      // Map through the 'userChat' array and create a new array of objects
      const filteredData = userChat
        .map((item) => ({
          ...item,
          // Filter the 'members' array of the current 'item' object
          members: item.members.filter((memberData) => memberData?._id !== _id),
          // ^ Keep only members whose '_id' is not equal to the specified '_id'
        }))
        ?.filter((item) => item.members.length > 0);

      // console.log("filteredMember :", filteredMember)

      // Update the state variable 'chatData' with the filtered data
      setChatData(filteredData);
    }
  }, [userChat, _id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
      socket.emit("send-notification", sendNotification);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  // Receive Message from parent component
  useEffect(() => {
    let chat;
    if (id) {
      chat = chatData?.filter((item) => item._id === id);
    }

    if (receivedMessage !== null && receivedMessage.chatId === chat[0]?._id) {
      setMessageData([...messageData, receivedMessage]);
    }
  }, [receivedMessage]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

  useEffect(() => {
    if (!_id) return navigate("/login");
  }, [_id]);

  useEffect(() => {
    refetch();
  }, [id]);

  if (isLoading && chatLoading) return <Loader />;
  return (
    <Container>
      <Box>
        <Grid container mt={2}>
          <Grid item>
            <IconButton onClick={handleBackClick}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5" className="header-message">
              Chat
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          component={Paper}
          sx={{ width: "100%", height: "88vh" }}
        >
          <ChatSidebar
            chatData={chatData}
            currentUser={_id}
            photo={userPhoto}
            isVendor={vendor ? true : false}
          />
          <Grid
            item
            md={9}
            xs={12}
            sx={{ display: !isMobile && !id && "none" }}
          >
            {!chat || messageData?.length === 0 ? (
              <List
                sx={{
                  height: !isMobile ? "78vh" : "72vh",
                  overflowY: "auto",
                }}
              >
                <ListItem
                  key="1"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Box
                    display="inline-block"
                    bgcolor={"secondary.main"}
                    color="white"
                    borderRadius="10px"
                    p={2}
                    boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
                  >
                    No Chats Yet
                  </Box>
                </ListItem>
              </List>
            ) : (
              <List
                sx={{ height: !isMobile ? "78vh" : "72vh", overflowY: "auto" }}
              >
                {messageData?.map((item, index) => {
                  return (
                    <>
                      <ListItem
                        key={`Link-${index}`}
                        ref={scroll}
                        sx={{
                          justifyContent:
                            item?.senderType === "Vendor"
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        <Box
                          display="inline-block"
                          bgcolor={
                            item?.senderType === "Vendor"
                              ? "primary.main"
                              : "secondary.main"
                          }
                          color="white"
                          borderRadius="10px"
                          p={2}
                          boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
                        >
                          {item?.text}
                        </Box>
                      </ListItem>
                      <ListItemText
                        align={item?.senderType === "Vendor" ? "right" : "left"}
                        secondary={moment(item?.createdAt).format("hh:mm A")}
                        sx={{
                          mr: item?.senderType === "Vendor" ? 2.5 : 0,
                          ml: item?.senderType === "Vendor" ? 0 : 2.5,
                        }}
                      />
                    </>
                  );
                })}
              </List>
            )}

            {id && (
              <>
                {" "}
                <Divider />
                <Grid
                  container
                  style={{ padding: !isMobile ? "10px" : "20px" }}
                >
                  <Grid item md={11} xs={10}>
                    <TextField
                      id="outlined-basic-email"
                      label="Type Something"
                      fullWidth
                      value={NewMessage}
                      name="message"
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKey}
                    />
                  </Grid>
                  <Grid xs={2} md={1} align="right">
                    <Fab color="primary" aria-label="add" onClick={onSave}>
                      <SendIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Messages;
