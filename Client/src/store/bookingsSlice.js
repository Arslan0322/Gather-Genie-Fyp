import { baseApiSlice } from "./baseApiSlice";
const BOOKINGS_URL = "/bookings";

export const bookingsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendorBooking: builder.query({
      query: (tab) => `${BOOKINGS_URL}/vendor/${tab}`,
    }),
    getClientBooking: builder.query({
      query: (tab) => `${BOOKINGS_URL}/client/${tab}`,
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKINGS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    cancelBooking: builder.mutation({
      query: (body) => ({
        url: `${BOOKINGS_URL}/cancel`,
        method: "PUT",
        body
      }),
    }),
    acceptBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKINGS_URL}/accept/${id}`,
        method: "PUT",
      }),
    }),
    completeBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKINGS_URL}/complete/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetVendorBookingQuery,
  useGetClientBookingQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
  useAcceptBookingMutation,
  useCompleteBookingMutation,
} = bookingsSlice;
