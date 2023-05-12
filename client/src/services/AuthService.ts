import { api } from ".";
import { IUser } from "../models/IUser";

interface IUserPost {
  email: string;
  password: string;
}

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<IUser, IUserPost>({
      query: (user) => ({
        url: "auth/registration",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<IUser, IUserPost>({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<IUser, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
