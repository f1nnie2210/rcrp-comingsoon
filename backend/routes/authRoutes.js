const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.get(
    "/user-info",
    authMiddleware.verifyToken,
    userController.getUserInfo
);
router.post("/logout", authMiddleware.verifyToken, authController.userLogout);

module.exports = router;
