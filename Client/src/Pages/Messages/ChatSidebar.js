import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, {useState, useEffect} from "react";
import profile from "../../assests/profile.jpg";
import { useNavigate } from "react-router";
import { UserData } from "./UserUtils";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux"

export default function ChatSidebar({chatData, currentUser, isVendor, photo}) {
  const onlineUsers = useSelector(state => state?.onlineUser?.onlineUsers);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([])


  const handleChat = (id) => {
    navigate(`/chat/${id}`);
  };
  const handleClick = () => {
    const profile = isVendor ? '/vendorprofile' : '/clientprofile'
    navigate(`${profile}`);
  };

  const checkOnlineStatus = (chat) => {
    const online = onlineUsers.find((user) => user.userId === chat.members[0]?._id);
    return online ? "Online" : "Offline";
  };

  useEffect(()=>{
    if(searchText !== ""){
      const filteredData = chatData?.filter(item => {
        const firstName = item?.members[0]?.firstname?.toLowerCase();
        const lastName = item?.members[0]?.lastname?.toLowerCase();
        const searchTerm = searchText.trim().toLowerCase();
      
        return firstName.includes(searchTerm) || lastName.includes(searchTerm);
      });
      
      setSearchData(filteredData);
    } else {
      setSearchData(chatData)
    }
  },[searchText, chatData])

  return (
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        borderRight: "1px solid #e0e0e0",
        display: id && !isMobile && "none",
      }}
    >
      <List>
        <ListItem onClick={handleClick} key="1" sx={{ cursor: "pointer" }}>
          <ListItemIcon>
            <Avatar alt="" src={photo ? `http://localhost:5000/uploads/${photo}` : profile} />
          </ListItemIcon>
          <ListItemText primary="My Profile"></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Grid item xs={12} style={{ padding: "10px" }}>
        <TextField
          id="outlined-basic-email"
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Grid>
      <Divider />
      {searchData.map((item, index) => {
        return (
          <List>
            <ListItem
              onClick={() => handleChat(item._id)}
              key={index}
              sx={{ cursor: "pointer", background: item?._id == id && "#dac287" }}
            >
              <ListItemIcon>
                <Avatar alt="" src={item.members[0]?.photo ? `http://localhost:5000/uploads/${item.members[0]?.photo}` : profile} />
              </ListItemIcon>
              <ListItemText primary={`${item.members[0]?.firstname} ${item.members[0]?.lastname}`}>
                {`${item.members[0]?.firstname} ${item.members[0]?.lastname}`}
              </ListItemText>
              <ListItemText
                secondary={checkOnlineStatus(item)}
                align="right"
              ></ListItemText>
            </ListItem>
          </List>
        );
      })}
    </Grid>
  );
}
