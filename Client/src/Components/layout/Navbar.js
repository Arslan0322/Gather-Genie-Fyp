import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../assests/logo.png";
import { SolidButton } from "../SolidButton";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";
import NotificationDrawer from "../NotificationDrawer";
import { NotificationsActiveOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {socket} from "../../socket";
import {useGetNotificationQuery, useViewNotificationMutation} from "../../store/notificationsSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [receivedNotification, setReceivedNotification] = useState(null);
  const [CartCount, setCartCount] = useState(0);
  const [Count, setCount] = useState(0);
  const navigate = useNavigate();
  const {data , isLoading, refetch} = useGetNotificationQuery();
  const [viewNotification] = useViewNotificationMutation()
  const userInfo = useSelector((state) => state.user?.userInfo);
  const vendor = useSelector((state) => state.user?.userInfo?.data?.vendor);
  const userId = useSelector((state) => state.user?.userInfo?.data?._id);
  const countState = useSelector((state) => state?.cartCount);

  const refetchAgain = () =>{
    refetch()
  }
  const toggleDrawer = async() => {
    await viewNotification()
    setOpen(!open);
    setCount(0);
  };
  const handleRedirect = () => {
    navigate(`/login`);
  };
  const handleCart = () => {
    navigate(`/cart`);
  };

    // // Get the notification from socket server
    useEffect(() => {
      socket.on("receive-notification", (data) => {
        setCount(prevCount => prevCount + 1);
        setReceivedNotification(data);
      });
    
      // Clean up the socket event listener when the component unmounts
      return () => {
        socket.off("receive-notification");
      };
    }, []);
    

    useEffect(()=> {
    
      if ( receivedNotification !== null && receivedNotification?.receiverId === userId) {
        const sortedArray = [...notificationData, receivedNotification].sort((a, b) =>
        b?.createdAt?.localeCompare(a?.createdAt)
      );
        setNotificationData(sortedArray);
      }
    
    },[receivedNotification])

    useEffect(()=>{
      if(data){
        const filterCount = data?.filter(item => item?.isCount === false);
        setCount(filterCount.length)
        setNotificationData(data)

      }
    },[data, isLoading])

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar>
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 55, marginRight: 30, borderRadius: "18px" }}
          />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h5" color="primary">
            Gather Genie
            </Typography>
          </Link>
        </div>

        {/* Right side */}
        <div style={{ marginLeft: "auto" }}>
          <Grid container>
            {userInfo ? (
              <>
                <Grid>
                  <IconButton
                    aria-label={"more than 99 notifications"}
                    onClick={toggleDrawer}
                  >
                    <Badge badgeContent={Count}>
                      <NotificationsActiveOutlined color="primary" />
                    </Badge>
                  </IconButton>
                </Grid>
                {!vendor && (
                  <Grid>
                    <IconButton aria-label="cart" onClick={handleCart}>
                      <Badge badgeContent={countState} color="primary">
                        <AddShoppingCartIcon color="primary" />
                      </Badge>
                    </IconButton>
                  </Grid>
                )}
                <ProfileDropdown />
              </>
            ) : (
              <SolidButton
                label="Login"
                onClick={(e) => handleRedirect(e)}
                btnwidth="20%"
              />
            )}
          </Grid>
        </div>
      </Toolbar>
      <NotificationDrawer toggleDrawer={toggleDrawer} open={open} data={notificationData} refetchAgain={refetchAgain} />
    </AppBar>
  );
};

export default Navbar;
