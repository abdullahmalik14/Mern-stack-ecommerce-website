const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
