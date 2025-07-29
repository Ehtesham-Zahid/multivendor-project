const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const uploadAvatar = require("../utils/cloudinary");
const POST = require("../utils/email");

const generateToken = (id, expire) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expire });
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

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

  const verifiedToken = generateToken(user._id, "1h");
  user.verifiedToken = verifiedToken;
  user.verifiedTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour from now

  await user.save();

  const tokenLink = `https://yourapp.com/verify-email?token=${verifiedToken}`;

  const emailDetails = {
    to: user.email,
    subject: "Account Actiavtion",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="color: #2E3A8C;">Verify Your Email Address</h2>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
            <a href="${tokenLink}" style="display: inline-block; background-color: #2E3A8C; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                Verify Now
            </a>
            <p style="margin-top: 20px; color: #555555;">⚠️ This verification link will expire in <strong>1 hour</strong>. If it expires, you’ll need to request a new one.</p>
        </div>
        `,
  };

  await POST(emailDetails);

  res.status(201).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    imageUrl: user.imageUrl,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email?.trim() || !password?.trim()) {
    res.status(400);
    throw new Error("Plase provide Email and Password");
  }

  const user = await User.findOne({ email });

  if (
    user &&
    user.isVerified === true &&
    (await bcrypt.compare(password, user.password))
  ) {
    const token = generateToken(user._id, "30d");

    if (rememberMe) {
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // set this only if using HTTPS
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in ms
      });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        sameSite: "strict",
        // No maxAge → session cookie → deleted when browser closes
      });
    }

    res.json({
      name: user.fullname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verifiedToken: token });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Token");
  }
  if (user.verifiedTokenExpires < Date.now()) {
    res.status(400);
    throw new Error("Token has expired.");
  }

  user.isVerified = true;
  user.verifiedToken = "";
  user.verifiedTokenExpires = null;
  await user.save();

  res.redirect("/auth/login");
});

module.exports = { registerUser, verifyToken };
