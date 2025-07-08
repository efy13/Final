const { UserInfoFromToken } = require("../utils/authUtils");
const authProtectMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  const user = UserInfoFromToken(token);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = user;
  next();
};

module.exports = {
  authProtectMiddleware,
};
