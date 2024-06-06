import { baseApiSlice } from "./baseApiSlice";
const CHAT_URL = "/chats";

export const chatsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserChat: builder.query({
      query: (userId) => `${CHAT_URL}/${userId}`,
    }),
    getMessages: builder.query({
      query: (chatId) => `${CHAT_URL}/message/${chatId}`,
    }),
    createMessage: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/message`,
        method: "POST",
        body: data,
      }),
    }),
    createChat: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserChatQuery, useGetMessagesQuery, useCreateMessageMutation, useCreateChatMutation } = chatsSlice;
