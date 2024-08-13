const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { Username, Password } = req.body;
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
            { ID: user.ID, Admin: user.Admin, Role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.send({ token, isAdmin: user.Admin > 0 });
    } catch (err) {
        res.status(500).send("Server error.");
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

        const newToken = jwt.sign(
            { ID: decoded.ID, Admin: decoded.Admin, Role: decoded.Role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.send({ token: newToken });
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.ID, {
            attributes: ['Username', 'Admin']
        });
        res.send(user);
    } catch (err) {
        res.status(500).send("Server error.");
    }
};