import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  endpoints: (builder) => ({
    getGuests: builder.query({
      query: () => '/guests',
    }),
    addNewGuest: builder.mutation({
      query: (initialGuestValues) => ({
        url: '/guests',
        method: 'POST',
        body: initialGuestValues,
      }),
    }),
  }),
});

export const { useGetGuestsQuery, useAddNewGuestMutation } = apiSlice;
