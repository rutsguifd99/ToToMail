import { api } from ".";
import { IMessagesResponse } from "../models/GmailResponses";
import { IUser } from "../models/IUser";

export const gmailAPI = api.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.mutation<
      IMessagesResponse,
      { messageDepartment: String; nextPageToken: String | null }
    >({
      query: (options) => ({
        url: "api/messages",
        method: "POST",
        body: options,
      }),
      invalidatesTags: ["Gmail"],
    }),
    addGmailAccount: build.mutation<IUser, String>({
      query: (code) => ({
        url: "api/auth",
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["Gmail"],
    }),
    getProfile: build.query<void, void>({
      query: () => "api/get-profile",
    }),
    getMessage: build.query({
      query: () => "api/message",
    }),
    sendMessage: build.mutation<
      void,
      { sendTo: String; subject: String; body: String }
    >({
      query: (message) => ({
        url: "api/send-message",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Gmail"],
    }),
    saveDraft: build.mutation<
      void,
      { sendTo: String; subject: String; body: String }
    >({
      query: (message) => ({
        url: "api/save-draft",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Gmail"],
    }),
  }),
});
