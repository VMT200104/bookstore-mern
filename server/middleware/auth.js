import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(403).json({
        message: "Please Login",
      });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `${req.user.role} can not access this resources`,
      });
    }
    next();
  };
};
