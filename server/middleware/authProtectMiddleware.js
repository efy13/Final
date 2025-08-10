const { getUserFromToken } = require("../utils/authUtils");

const authProtectMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const tokenFromHeader =
    bearerToken && bearerToken.startsWith("Bearer ")
      ? bearerToken.split(" ")[1]
      : null;
  const token = tokenFromHeader || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const user = getUserFromToken(token);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  req.user = user;
  next();
};

module.exports = {
  authProtectMiddleware,
};
 