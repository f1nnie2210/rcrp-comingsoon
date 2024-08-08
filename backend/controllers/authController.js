const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.login = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        console.log("Finding user with username:", Username);
        const user = await User.findOne({ where: { Username } });
        if (!user) {
            console.log("User not found");
            return res.status(400).send("Invalid username or password.");
        }

        const validPassword = await bcrypt.compare(Password, user.Password);
        if (!validPassword) {
            console.log("Invalid password");
            return res.status(400).send("Invalid username or password.");
        }

        const token = jwt.sign(
            { ID: user.ID, Admin: user.Admin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.send({ token, isAdmin: user.Admin > 0 });
    } catch (err) {
        res.status(500).send("Server error.");
    }
};