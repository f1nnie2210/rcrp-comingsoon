const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

require("dotenv").config();

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign(
            { ID: user.ID, Admin: user.Admin },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign({ ID: user.ID }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        });
    },

    login: async (req, res) => {
        const { Username, Password } = req.body;
        const user = await User.findOne({ where: { Username } });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(Password, user.Password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
        });
        res.status(200).json({ accessToken });
    },

    refreshToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res
                .status(401)
                .json({ message: "No refresh token provided" });
        }

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            (err, user) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: "Invalid refresh token" });
                }

                const newAccessToken = generateAccessToken(user);
                res.status(200).json({ accessToken: newAccessToken });
            }
        );
    },

    userLogout: (req, res) => {
        res.cookie("refreshToken", "", {
            httpOnly: true,
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });
    },

};

module.exports = authController;
