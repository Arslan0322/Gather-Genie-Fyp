import { baseApiSlice } from "./baseApiSlice";
const ADDONS_URL = "/addon";

export const addOnSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddOn: builder.mutation({
      query: (data) => ({
        url: `${ADDONS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAddonByID: builder.query({
      query: (id) => `${ADDONS_URL}/${id}`,
    }),
    getAddonByServicesID: builder.query({
      query: (id) => `${ADDONS_URL}/serviceId/${id}`,
    }),
    updateAddon: builder.mutation({
      query: ({data, id}) => ({
        url: `${ADDONS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateAddOnMutation,
  useGetAddonByServicesIDQuery,
  useGetAddonByIDQuery,
  useUpdateAddonMutation,
} = addOnSlice;
