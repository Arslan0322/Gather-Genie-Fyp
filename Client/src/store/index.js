import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "./baseApiSlice";
import authReducer from "./authSlice";
import onlineUsersReducer from "./onlineUsersSlice"
import cartCountsReducer from "./cartCountsSlice";

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    user: authReducer,
    onlineUser: onlineUsersReducer,
    cartCount : cartCountsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: true,
});

export default store;
