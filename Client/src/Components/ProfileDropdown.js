import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useLogoutMutation } from "../store/usersSlice";
import { useGetVendorEarningQuery } from "../store/cartsSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ProfileDropdown({ VendorType, setVendorType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vendor = useSelector((state) => state.user?.userInfo?.data?.vendor);
  const id = useSelector((state) => state.user?.userInfo?.data?._id);

  const {data} = useGetVendorEarningQuery(id)
  const [logoutApiCall] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutApiCall().unwrap();
    dispatch(logout());
    toast.success("Logged out Successfully");
    // navigate("/");
    window.location.href = "/";
  };

  const profileNavigate = vendor ? "/vendorprofile" : "/clientprofile";
  const bookingNavigate = vendor ? "/vendorbookings" : "/bookings";

  return (
    <>
      <IconButton color="primary" onClick={handleOpenMenu}>
        <ManageAccountsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Box
          sx={{
            minWidth: 160,
            backgroundColor: "white",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <Link
            to={profileNavigate}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>Profile</MenuItem>
          </Link>

          <Link to="/chat" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem> Chats</MenuItem>
          </Link>
          <Link
            to={bookingNavigate}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem> Bookings</MenuItem>
          </Link>
          {vendor &&
            <Box>
              <MenuItem>Earnings : {data ? data : 0}</MenuItem>
            </Box>
          }


          {/* <Link
            to="/deals"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem> Deals</MenuItem>
          </Link> */}
          <div
            onClick={handleLogout}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem>Log Out </MenuItem>
          </div>
        </Box>
      </Menu>
    </>
  );
}

export default ProfileDropdown;
