const express = require("express");
const { login, refreshToken } = require('../controllers/authController');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get("/user-info", authMiddleware.verifyToken, userController.getUsersInfo);
router.post('/logout', authMiddleware.verifyToken, authController.userLogout);

module.exports = router;
