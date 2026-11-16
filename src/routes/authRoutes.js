const express = require("express");
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// routes of auth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.me);
router.post("/logout", authController.logout);

module.exports = router;