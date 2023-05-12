const AuthError = require("../exceptions/auth-error");
const tokenService = require("../service/token-service");

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(AuthError.unAuthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    if (!authHeader) {
      return next(AuthError.unAuthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(AuthError.unAuthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(AuthError.unAuthorizedError());
  }
}
