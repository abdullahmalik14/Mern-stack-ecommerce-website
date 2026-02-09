const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getUserOrders,
} = require("../controllers/orderController");
const { protect, protectOptional } = require("../middleware/authMiddleware");

router.route("/").post(protectOptional, addOrderItems);
router.route("/myorders").get(protect, getUserOrders);

module.exports = router;
