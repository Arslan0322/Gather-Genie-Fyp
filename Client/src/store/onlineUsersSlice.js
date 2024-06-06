import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [], // Initial state for online users
};

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload; // Set online users array in the state
    },
  },
});

export const { setOnlineUsers } = onlineUsersSlice.actions;
export const selectOnlineUsers = (state) => state.onlineUsers.onlineUsers;
export default onlineUsersSlice.reducer;
