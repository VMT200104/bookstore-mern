import express from "express";
import { authorizeRoles, isAuth } from "../middleware/auth.js";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProductDetails,
  getProductReviews,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router.post("/admin/product/new", isAuth, authorizeRoles("admin"), createProduct);
router.get("/admin/products", isAuth, authorizeRoles("admin"), getAdminProducts);
router.get("/product/:id", getProductDetails);
router.route("/admin/product/:id")
  .put(isAuth, authorizeRoles("admin"), updateProduct)
  .delete(isAuth, authorizeRoles("admin"), deleteProduct);

router.put("/review", isAuth, createProductReview);

router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuth, deleteReview);

export default router;
