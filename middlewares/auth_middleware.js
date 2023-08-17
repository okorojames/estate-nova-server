const UserSchema = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// requireAuth

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // decoded token
    const decoded_token = jwt.verify(token, JWT_SECRET);
    req.user = await UserSchema.findById(decoded_token.id).select("_id");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "authorization not valid" });
  }
};
module.exports = { requireAuth };
