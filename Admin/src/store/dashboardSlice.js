import { baseApiSlice } from "./baseApiSlice";

const DASHBOARD_URL = "/admins";

export const dashboardSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCount: builder.query({
      query: () => `${DASHBOARD_URL}`,
    }),
    getNotifications: builder.query({
      query: () => `${DASHBOARD_URL}/notification`,
    }),
    viewNotification: builder.mutation({
      query: () => ({
        url: `${DASHBOARD_URL}/notification/view`,
        method: "PUT"
      }),
    }),
    viewSingleNotification: builder.mutation({
      query: (id) => ({
        url: `${DASHBOARD_URL}/notification/view/${id}`,
        method: "PUT"
      }),
    }),
    createNotification: builder.mutation({
      query: (body) => ({
        url: `/notifications`,
        method: "POST",
        body
      }),
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetDashboardCountQuery,
  useGetNotificationsQuery,
  useViewNotificationMutation,
  useViewSingleNotificationMutation,
  useCreateNotificationMutation,
  useReadNotificationMutation
} = dashboardSlice;
