const User = require("../models/User");

const userController = {
    getUserInfo: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.ID, {
                attributes: ['Username', 'Admin']
            });
            res.send(user);
        } catch (err) {
            res.status(500).send("Server error.");
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
