import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  loginUser,
  logoutUser,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
  userDetails,
  verifyUser,
} from "../controllers/UserController.js";
import { isAuth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

//authenication login
router.get("/me", isAuth, userDetails);
router.put("/me/update", isAuth, updatePassword);
router.put("/me/update/infor", isAuth, updateProfile);

//admin routes
router.get("/admin/users", isAuth, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuth, authorizeRoles("admin"), getSingleUser)
  .put(isAuth, authorizeRoles("admin"), updateUserRole)
  .delete(isAuth, authorizeRoles("admin"), deleteUser);

export default router;
