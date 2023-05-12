const UserProfileModel = require("../models/user-profile-model");
const { google } = require("googleapis");
const gmailService = require("./gmail-service");

class AuthService {
  async saveEmail(code, mainEmail, email) {
    // const { access_token: accessToken, refresh_token: refreshToken } =
    //   await this.getTokens(code);

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: token,
    });

    const res = await oauth2Client.getTokenInfo(accessToken);
    console.log(res);

    const candidate = await UserProfileModel.findOne({ mainEmail });
    if (!candidate) {
      await UserProfileModel.create({
        userMainEmail: mainEmail,
        userEmails: [],
      });
    }
    candidate.userEmails.push({ email, accessToken, refreshToken });
    await candidate.save();
  }
  async getProfile() {
    const oAuthClient = await gmailService.oAuthClient(
      "vityakish200@gmail.com"
    );
    const gmail = google.gmail({ version: "v1", auth: oAuthClient });

    const { data } = await gmail.users.getProfile({
      userId: "me",
      auth: oAuthClient,
    });

    return data;
  }

  async refreshAccessToken() {
    const oAuthClient = await gmailService.oAuthClient(
      "vityakish200@gmail.com"
    );
    const tokens = await oAuthClient.refreshAccessToken();
    const user = await UserProfileModel.findOne({
      userMainEmail: "vityakish200@gmail.com",
    });
    user.userEmails[0].accessToken = tokens.credentials.access_token;
    await user.save();
    return tokens;
  }

  async getTokens(authCode) {
    const { OAuth2 } = google.auth;
    const oAuth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.CLIENT_URL
    );

    const { tokens } = await oAuth2Client.getToken(authCode);
    return tokens;
  }

  async logoutFromGmail(accessToken) {
    const { OAuth2 } = google.auth;
    const oAuth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.CLIENT_URL
    );
    oAuth2Client.revokeToken(accessToken, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  }
}

module.exports = new AuthService();
