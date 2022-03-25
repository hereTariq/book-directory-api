const jwt = require("jsonwebtoken");
const User = require("../models/user");

// function for verification of user that the user has token
const verifyToekn = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized. You need to sign in to get the token." });
  }
};

module.exports = verifyToekn;
