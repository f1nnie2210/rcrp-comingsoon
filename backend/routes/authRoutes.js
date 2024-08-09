const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.get("/user-info", authMiddleware, authController.getUserInfo);

module.exports = router;
