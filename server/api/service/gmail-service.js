const { google } = require("googleapis");
const userProfileModel = require("../models/user-profile-model");

class GmailService {
  async oAuthClient(email) {
    const { OAuth2 } = google.auth;

    const { userEmails } = await userProfileModel.findOne({ email });

    let accessToken, refreshToken;
    for (const email of userEmails) {
      accessToken = email.accessToken;
      refreshToken = email.refreshToken;
    }
    const oAuth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.CLIENT_URL
    );
    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return oAuth2Client;
  }
}

module.exports = new GmailService();
