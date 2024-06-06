import { baseApiSlice } from './baseApiSlice';

const BOOKING_URL = '/admins/payment';

export const registrationSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => `${BOOKING_URL}`,
    }),
    refundPayment: builder.mutation({
      query: ({ paymentID, totalAmount, cartID }) => ({
        url: `${BOOKING_URL}/refund/${paymentID}/${totalAmount}/${cartID}`,
        method: 'POST',
      }),
    }),
    releasePayment: builder.mutation({
      query: ({ paymentID, totalAmount, cartID }) => ({
        url: `${BOOKING_URL}/release/${paymentID}/${totalAmount}/${cartID}`,
        method: 'POST',
      }),
    }),
    reportCart: builder.mutation({
      query: (cartID) => ({
        url: `${BOOKING_URL}/report/${cartID}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useGetBookingsQuery, useRefundPaymentMutation, useReleasePaymentMutation, useReportCartMutation } = registrationSlice;
