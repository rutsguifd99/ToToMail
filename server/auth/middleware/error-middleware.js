const AuthError = require("../exceptions/auth-error");

function errorMiddleware(err, req, res, next) {
  console.log(err);
  if (err instanceof AuthError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unexpected Error" });
}

module.exports = errorMiddleware;
