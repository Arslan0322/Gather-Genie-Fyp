import { baseApiSlice } from "./baseApiSlice";
const USERS_URL = "/users"

export const usersSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => `${USERS_URL}/profile`
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (data) => {

                const body = new FormData();
                // Loop through the keys in the data object
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        // Append key-value pairs to the body object
                        body.append(key, data[key]);
                    }
                }

                return {
                    url: `${USERS_URL}`,
                    method: 'POST',
                    body
                }
            }
        }),
        updateUser: builder.mutation({
            query: (data) => {

                const body = new FormData();
                // Loop through the keys in the data object
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        // Append key-value pairs to the body object
                        body.append(key, data[key]);
                    }
                }

                return {
                    url: `${USERS_URL}/profile`,
                    method: 'PUT',
                    body: body,
                };
            },
        }),
        setPassword: builder.mutation({
            query: (data) => ({
                url: `/admins/registration/password`,
                method: 'PUT',
                body: data
            })
        }),
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: `${USERS_URL}/${email}`,
                method: 'POST'
            })
        }),
    })
})

export const { useGetUserProfileQuery , useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useSetPasswordMutation, useForgetPasswordMutation } = usersSlice