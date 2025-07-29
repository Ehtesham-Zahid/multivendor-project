const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const uploadAvatar = require("../utils/cloudinary");

const generateToken = (id, expire) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expire });
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, image } = req.body;

  if (!fullname?.trim() || !email?.trim() || !password?.trim()) {
    res.status(400);
    throw new Error("Fullname, email, and password are required");
  }

  //   Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({ fullname, email, password: hashedPassword });

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const { original } = await uploadAvatar(dataURI, user._id);
    user.imageUrl = original;
  }

  const verificationToken = generateToken(user._id, "1h");
  user.verificationToken = verificationToken;

  await user.save();

  res.status(201).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    imageUrl: user.imageUrl,
    verificationToken: user.verificationToken,
  });
});

module.exports = { registerUser };
