const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middewares/authMiddleware");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);
router.get("/protected", authMiddleware, authController.protectedRoute);

module.exports = router;
