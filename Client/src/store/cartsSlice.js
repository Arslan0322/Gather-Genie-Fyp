// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: JSON.parse(localStorage.getItem("items")) || [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const alreadyExistItem = state.items.some(
//         (item) => item.id === action.payload.id
//       );

//       if (alreadyExistItem) {
//         return state;
//       } else {
//         // payload will contain object
//         const newItem = action.payload;

//         // the object will be store in items
//         state.items.push(newItem);

//         // We will save items in localStorage
//         localStorage.setItem("items", JSON.stringify(state.items));
//       }
//     },
//     removeFromCart: (state, action) => {
//       // action.payload contain the id of items object
//       const idToRemove = action.payload;

//       // we will filter out the items array
//       state.items = state.items.filter((item) => item.id !== idToRemove);

//       // Update the localStorage with this items array
//       localStorage.setItem("items", JSON.stringify(state.items));
//     },
//     emptyCart: (state, action) => {
//       state.items = [];
//       localStorage.removeItem("items");
//     },
//   },
// });

// export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { baseApiSlice } from "./baseApiSlice";
const CARTS_URL = "/carts";

export const cartsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FindCartByUserID: builder.query({
      query: () => `${CARTS_URL}`,
    }),
    getVendorEarning: builder.query({
      query:(id)=> `${CARTS_URL}/${id}`
    }),
    getCartByID: builder.query({
      query:(id)=> `${CARTS_URL}/edit/${id}`
    }),
    CheckoutCartByUserID: builder.mutation({
      query: () => ({
        url: `${CARTS_URL}`,
        method: "PUT",
      }),
    }),
    reportCart: builder.mutation({
      query: (id) => ({
        url: `${CARTS_URL}/${id}`,
        method: "PUT",
      }),
    }),

    createCart: builder.mutation({
      query: (data) => ({
        url: `${CARTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    DeleteCartByID: builder.mutation({
      query: (id) => ({
        url: `${CARTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    updateCart: builder.mutation({
      query: ({data, id}) => ({
        url: `${CARTS_URL}/edit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useFindCartByUserIDQuery,
  useGetVendorEarningQuery,
  useGetCartByIDQuery,
  useCheckoutCartByUserIDMutation,
  useReportCartMutation,
  useCreateCartMutation,
  useDeleteCartByIDMutation,
  useUpdateCartMutation,
} = cartsSlice;
