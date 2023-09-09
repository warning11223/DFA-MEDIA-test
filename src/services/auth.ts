import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://www.themoviedb.org/";

export const auth = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    askForPermission: builder.query<void, string>({
      query: (token) => {
        return {
          url: `authenticate/${token}`,
          method: "GEt",
        };
      },
    }),
  }),
});

export const { useLazyAskForPermissionQuery } = auth;
