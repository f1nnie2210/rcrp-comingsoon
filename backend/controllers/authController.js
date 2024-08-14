const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

require("dotenv").config();

const generateAccessToken = (user) => {
    return jwt.sign(
        { ID: user.ID, Admin: user.Admin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign({ ID: user.ID }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
};

const login = async (req, res) => {
    const { Username, Password } = req.body;
    const user = await User.findOne({ where: { Username } });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(Password, user.Password);
    if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
    console.log({refreshToken});
};

const refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    login,
    refreshToken,
};
