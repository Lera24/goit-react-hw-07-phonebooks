import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6166d25413aa1d00170a67d3.mockapi.io/",
  }),
  tagTypes: ["contacts"],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => `contacts/`,
      providesTags: ["contacts"],
    }),
    deleteContacts: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
    createContact: builder.mutation({
      query: ({ name, number }) => ({
        url: `contacts/`,
        method: "POST",
        body: {
          name,
          number,
        },
      }),
      invalidatesTags: ["contacts"],
    }),
    filterContacts: builder.query({
      query: (value) => `contacts/?filter=${value}`,
      providesTags: ["contacts"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useDeleteContactsMutation,
  useCreateContactMutation,
  useFilterContactsQuery,
} = contactsApi;
