const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users/UserSchema");
const { hashPassword } = require("../lib/HashPassword");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email is already in use",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid",
    });
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    })
    .json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
};

module.exports = { registerUser, loginUser };
