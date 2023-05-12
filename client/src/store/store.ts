import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthService";
import { gmailAPI } from "../services/GmailService";
import { api } from "../services";

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [gmailAPI.reducerPath]: gmailAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(api.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
