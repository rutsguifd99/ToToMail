import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const BASE_URL = "http://localhost:3001/";

export const api = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Auth", "Gmail"],
  endpoints: (build) => ({}),
});
