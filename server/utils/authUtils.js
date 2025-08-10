const jwt = require("jsonwebtoken");

const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return {
      id: payload.id,
      email: payload.email,
      roles: payload.roles || [],
    };
  } catch (error) {
    console.error("JWT decode error:", error.message);
    return null;
  }
};

module.exports = {
  getUserFromToken,
};
