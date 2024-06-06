import { baseApiSlice } from "./baseApiSlice";

const REGISTRATION_URL = "/admins/registration";

export const registrationSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: () => `${REGISTRATION_URL}`,
    }),
    getVendorByID: builder.query({
      query: (id) => `${REGISTRATION_URL}/${id}`,
    }),

    changeVendorStatus: builder.mutation({
      query: ({id,status}) => ({
        url: `${REGISTRATION_URL}/${id}/${status}`,
        method: "PUT"
      }),
    }),
    changeServiceStatus: builder.mutation({
      query: ({id,status}) => ({
        url: `${REGISTRATION_URL}/service/${id}/${status}`,
        method: "PUT"
      }),
    }),
    createVendor: builder.mutation({
      query: (body) => ({
        url: `${REGISTRATION_URL}`,
        method: "POST",
        body
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/admins/service/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllVendorsQuery, useGetVendorByIDQuery, useChangeVendorStatusMutation, useCreateVendorMutation, useChangeServiceStatusMutation, useDeleteServiceMutation } = registrationSlice;
