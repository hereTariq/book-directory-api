const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { signupValidation, loginValidation } = require("../utils/validation");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }

  const { name, email, password } = req.body;
  const userExits = await User.findOne({ email });
  if (userExits) {
    return res.status(400).send("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ name, email, password: hashedPassword });
  const savedUser = await user.save();
  res.status(201).send(`User created with id: ${savedUser._id}`);
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email is not found.");
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(401).json({
      token: null,
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.header("auth-token", token);

  return res.json({
    _id: user._id,
    name: user.name,
    message: "Auth Succesful",
    token: token,
  });
};
