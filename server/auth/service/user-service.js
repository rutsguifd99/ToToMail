const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const MailService = require("./mail-service.js");
const TokenService = require("./token-service.js");
const UserDto = require("../dto/user-dto");
const AuthError = require("../exceptions/auth-error");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw AuthError.badRequest(`User ${email} already exists!`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.AUTH_URL}/auth/activate/${activationLink}`
    );
    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw AuthError.badRequest("This User Does Not Exist");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw AuthError.badRequest("User Not Found");
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw AuthError.badRequest("Wrong Password");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    return { ...tokens, user: userDto };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw AuthError.unAuthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw AuthError.unAuthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
