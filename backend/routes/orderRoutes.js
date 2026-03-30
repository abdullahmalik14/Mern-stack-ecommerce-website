const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getUserOrders,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, protectOptional, admin } = require("../middleware/authMiddleware");

router.route("/").post(protectOptional, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
