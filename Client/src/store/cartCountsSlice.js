import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cartCount")) || 0

const cartCountsSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      // Update initialState based on the payload
      const newCount = action.payload;
      localStorage.setItem("cartCount", JSON.stringify(newCount))
      return newCount;
    },
  },
});

export const { setCartCount } = cartCountsSlice.actions;
export default cartCountsSlice.reducer;
