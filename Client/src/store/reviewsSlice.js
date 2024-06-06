import { baseApiSlice } from "./baseApiSlice";
const REVIEW_URL = "/reviews";

export const reviewsSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query({
      query: () => `${REVIEW_URL}`,
    }),
    getOverallReview: builder.query({
      query: () => `${REVIEW_URL}/overall`,
    }),
    getReviewByUserId: builder.query({
      query: (id) => `${REVIEW_URL}/${id}`,
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetReviewQuery,
  useGetOverallReviewQuery,
  useGetReviewByUserIdQuery,
  useCreateReviewMutation,
} = reviewsSlice;
