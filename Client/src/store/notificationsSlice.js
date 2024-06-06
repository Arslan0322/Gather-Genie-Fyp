import { baseApiSlice } from "./baseApiSlice";
const NOTIFICATION_URL = "/notifications";

export const notificationsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => `${NOTIFICATION_URL}`,
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/${id}`,
        method: "PUT",
      }),
    }),
    viewNotification: builder.mutation({
      query: () => ({
        url: `${NOTIFICATION_URL}/view`,
        method: "PUT",
      }),
    }),
    createNotification: builder.mutation({
      query: (body) => ({
        url: `${NOTIFICATION_URL}`,
        method: "POST",
        body
      }),
    }),
  })
});

export const { useGetNotificationQuery, useReadNotificationMutation, useViewNotificationMutation, useCreateNotificationMutation } = notificationsSlice;
