const { Schema, model } = require("mongoose");

const UserProfileSchema = new Schema({
  userMainEmail: { type: String, unique: true },
  userEmails: [
    {
      email: { type: String, unique: true },
      accessToken: String,
      refreshToken: String,
    },
  ],
});

module.exports = model("UserProfile", UserProfileSchema);
