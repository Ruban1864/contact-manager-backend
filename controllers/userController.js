const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ _id: user.id, email: user.email, accessToken });
  } else {
    res.status(400);
    throw new Error("User data is not valid!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await Users.findOne({ email: email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid credentials: user not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid credentials: wrong password");
    }

    const accessToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user._id,
            },
        },
        process.env.JWT_SECRET, // Use the same secret as register
        { expiresIn: "1d" }
    );

    res.status(200).json({ accessToken });
});

const currentUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id).select('_id email username createdAt');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};  