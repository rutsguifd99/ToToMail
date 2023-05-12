const authService = require("../service/auth-service");

class AuthController {
  async saveEmail(req, res, next) {
    try {
      const { code } = req.body;
      await authService.saveEmail(
        code,
        "vityakish200@gmail.com",
        "vityakish200@gmail.com"
      );
      return res.send("tokens saved");
    } catch (e) {
      next(e);
    }
  }
  async getProfile(req, res, next) {
    try {
      const userProfile = await authService.getProfile();
      return res.send(userProfile).json();
    } catch (e) {
      next(e);
    }
  }

  async logoutFromGmail(req, res, next) {
    try {
      const { accessToken } = req.body;
      await authService.logoutFromGmail(accessToken);
      return res.send().status(200);
    } catch (e) {
      next(e);
    }
  }

  async refreshAccessToken(req, res, next) {
    try {
      const resp = await authService.refreshAccessToken();
      return res.send(resp).status(200);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
