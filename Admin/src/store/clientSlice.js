import { baseApiSlice } from './baseApiSlice';

const CLIENT_URL = '/admins/client';

export const clientSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => `${CLIENT_URL}`,
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `${CLIENT_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllClientsQuery, useDeleteClientMutation } = clientSlice;
