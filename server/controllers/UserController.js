import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";
import crypto from "crypto";
import { registerMail } from "../middleware/Email.js";
import cloudinary from "cloudinary";
import { generateResetEmail } from "../middleware/generateResetEmail.js";
import sendToken from "../middleware/sendToken.js";

export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;
  const file = req.files?.avatar;

  if (!email || !name || !password || !file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });

  let avatar = {};
  let uploadResponse;

  try {
    uploadResponse = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
    });
    avatar = {
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({ message: "Avatar upload failed" });
  }

  user = { name, email, password, avatar };

  const otp = Math.floor(100000 + Math.random() * 900000);
  const activationToken = jwt.sign({ user, otp }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const data = { name, otp };
  console.log("Generated Data:", data);

  await sendMail(email, "BookStore", registerMail(data));

  res.status(200).json({ message: "OTP sent to your email", activationToken });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.JWT_SECRET_KEY);

  if (!verify) return res.status(400).json({ message: "OTP EXPIRED" });

  if (verify.otp !== otp) return res.status(400).json({ message: "WRONG OTP" });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
    avatar: verify.user.avatar,
  });

  res.json({ message: "User Registered" });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await user.comparePassword(password);

  if (!mathPassword)
    return res.status(400).json({
      message: "wrong Password",
    });

  sendToken(user, 200, res)
});

export const logoutUser = TryCatch(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

export const forgotPassword = TryCatch(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(404).json({ message: "No User with this email" });

  const resetToken = user.getResetToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetLink = `https://bookstore-mern-lh17.onrender.com/api/password/reset/${resetToken}`;

  const emailContent = generateResetEmail(user.name, resetLink);

  try {
    await sendMail(user.email, "Reset Your Password", emailContent);
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
      error: err.message,
    });
  }
});

export const resetPassword = TryCatch(async (req, res, next) => {
  console.log("Received Token:", req.params.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log("Hashed Token (for lookup):", resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "Invalid or expired token" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password does not match" });
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

export const userDetails = TryCatch(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const updatePassword = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Old Password is incorrect",
    });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password not matched with each other",
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

export const updateProfile = TryCatch(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  const file = req.files?.avatar;

  const newUserData = {
    name: name || user.name,
    email: email || user.email,
  };

  if (file) {
    if (user.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    const uploadResponse = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "avatars",
        width: 400,
        quality: 100,
        fetch_format: "auto",
        crop: "scale",
      }
    );

    newUserData.avatar = {
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
    };
  }

  user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

export const getSingleUser = TryCatch(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export const updateUserRole = TryCatch(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User is not found with this id",
    });
  }

  await User.deleteOne({ _id: user._id });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
