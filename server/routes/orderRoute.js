import express from "express";
import { authorizeRoles, isAuth } from "../middleware/auth.js";
import { getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/order/new", isAuth, newOrder);
router.get("/order/:id", isAuth, getSingleOrder);
router.get("/orders/me", isAuth, myOrders);
router.get("/admin/orders", isAuth, authorizeRoles("admin"), getAllOrders);
router.put("/admin/order/:id", isAuth, authorizeRoles("admin"), updateOrder);
router.delete("/admin/order/:id", isAuth, authorizeRoles("admin"), deleteOrder);

export default router;
