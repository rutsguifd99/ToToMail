import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ProvideAuth } from "./context/useAuthProvider";
import { setupStore } from "./store/store";
import { ColorModeContextProvider } from "./uiConfig/ColorModeContextProvider";

const CLIENT_ID =
  "761213390644-7922sruomtd4v9lfvtojdkndb8v8ooi9.apps.googleusercontent.com";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ColorModeContextProvider>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter>
          <ProvideAuth>
            <CssBaseline>
              <App />
            </CssBaseline>
          </ProvideAuth>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </ColorModeContextProvider>
);
