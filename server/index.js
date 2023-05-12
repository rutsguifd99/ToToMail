require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./auth/router/index.js");
const apiRouter = require("./api/router/index.js");
const errorMiddleware = require("./auth/middleware/error-middleware.js");
//----------------
const fs = require("fs").promises;
const path = require("path");
const Process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

//----------google api-------------
// If modifying these scopes, delete token.json.
const SCOPES = [
  // "https://www.googleapis.com/auth/gmail.readonly",
  // "https://www.googleapis.com/auth/gmail.send",
  // "https://www.googleapis.com/auth/gmail.compose",
  // "https://www.googleapis.com/auth/gmail.insert",
  // "https://www.googleapis.com/auth/gmail.labels",
  // "https://www.googleapis.com/auth/gmail.modify",
  // "https://www.googleapis.com/auth/gmail.metadata",
  // "https://www.googleapis.com/auth/gmail.settings.basic",
  // "https://www.googleapis.com/auth/gmail.settings.sharing",
  "https://mail.google.com/",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(Process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(Process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.labels.list({
    userId: "me",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  console.log("Labels:");
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

authorize().then(listLabels).catch(console.error);
