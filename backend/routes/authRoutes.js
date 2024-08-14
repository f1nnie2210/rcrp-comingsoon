const express = require("express");
const { login, refreshToken } = require('../controllers/authController');
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get("/user-info", authMiddleware.verifyToken, userController.getUsersInfo);

module.exports = router;
