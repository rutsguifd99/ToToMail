const { google } = require("googleapis");
const gmailService = require("./gmail-service");

// const { OAuth2 } = google.auth;
// const gmail = google.gmail({ version: "v1" });

// const oAuth2Client = new OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.CLIENT_URL
// );
// oAuth2Client.setCredentials({
//   access_token: accessToken,
//   refresh_token: refreshToken,
// });

class AuthService {
  async getMessages(messageDepartment, nextPageToken = null) {
    const oAuthClient = await gmailService.oAuthClient(
      "vityakish200@gmail.com"
    );
    const gmail = google.gmail({ version: "v1", auth: oAuthClient });

    const options = {
      userId: "me",
      q: `in:${messageDepartment}`,
      maxResults: 25,
      pageToken: nextPageToken,
    };

    const { data } = await gmail.users.messages.list(options);
    if (data.resultSizeEstimate === 0) {
      return { noMessages: true };
    }

    const messageIds = data.messages.map((el) => el.id);
    //-------
    const messagePromises = messageIds.map((id) =>
      gmail.users.messages.get({
        userId: "me",
        id,
        format: "metadata", // Use metadata format to retrieve a short description of the message
        metadataHeaders: ["Subject", "From", "Date"], // Specify the headers you want to include in the description
      })
    );

    const messages = await Promise.all(messagePromises)
      .then((messages) => {
        const descriptions = messages.map((message) => {
          const headers = message.data.payload.headers;
          const subject = headers.find((h) => h.name === "Subject")?.value;
          const from = headers
            .find((h) => h.name === "From")
            ?.value.split(" ")[0];
          // ?.value.match(/"?(.*?)"?\s?<.*?>/)?.[1];
          const date = headers.find((h) => h.name === "Date")?.value;
          return {
            id: message.data.id,
            subject,
            from,
            date,
          };
        });
        return descriptions;
      })
      .catch((err) => console.error(err));

    return { nextPageToken: data.nextPageToken, messages };
  }
  async getMessage() {
    const options = {
      userId: "me",
      id: "187b41712ea7160d",
      format: "minimal",
    };
    const oAuthClient = await gmailService.oAuthClient(
      "vityakish200@gmail.com"
    );
    const gmail = google.gmail({ version: "v1", auth: oAuthClient });

    const { data } = await gmail.users.messages.get(options);
    return data;
  }
  async sendMessage(message) {
    const messageData =
      "From: work.viktor.kish@gmail.com\r\n" +
      `To: ${message.sendTo}\r\n` +
      `Subject: ${message.subject}\r\n\r\n` +
      message.body;

    const encodedMessage = Buffer.from(messageData)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const oAuthClient = await gmailService.oAuthClient(
      "vityakish200@gmail.com"
    );
    const gmail = google.gmail({ version: "v1", auth: oAuthClient });

    const res = await gmail.users.messages.send({
      userId: "me",
      resource: {
        raw: encodedMessage,
      },
    });
    return res;
  }
  async saveDraft(message) {
    const messageData =
      "From: work.viktor.kish@gmail.com\r\n" +
      `To: ${message.sendTo}\r\n` +
      `Subject: ${message.subject}\r\n\r\n` +
      message.body;

    const encodedMessage = Buffer.from(messageData)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const oAuthClient = await gmailService.oAuthClient(
      "vityakish200@gmail.com"
    );
    const gmail = google.gmail({ version: "v1", auth: oAuthClient });

    const messageDraft = {
      userId: "me",
      resource: {
        message: {
          raw: encodedMessage,
        },
      },
    };

    const res = gmail.users.drafts.create(messageDraft);
    return res;
  }
}

module.exports = new AuthService();
