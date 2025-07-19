const jwt = require("jsonwebtoken");
const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Forbidden" });
      req.adminInfo = {};
      req.adminInfo.id = decoded.id;
      req.adminInfo.email = decoded.email;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyJwt;
