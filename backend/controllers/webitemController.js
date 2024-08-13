const WebItem = require("../models/WebItem");

const webitemController = {
    // Create WebItem
    createWebItem: async (req, res) => {
        try {
            const { itemName, itemType, itemPrice } = req.body;
            const webItem = await WebItem.create({
                itemName,
                itemType,
                itemPrice,
            });
            res.status(201).json(webItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get All Items
    getAllItems: async (req, res) => {
        try {
            const items = await WebItem.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Get Item by ID
    getItemById: async (req, res) => {
        try {
            const item = await WebItem.findByPk(req.params.id);
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ error: "Item not found" });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Edit WebItem
    editWebItem: async (req, res) => {
        const { itemName, itemType, itemPrice } = req.body;

        try {
            const webItem = await WebItem.findByPk(req.params.id);
            if (!webItem) {
                return res.status(404).json({ error: "WebItem not found" });
            }

            await webItem.update(req.body);
            res.status(200).json(webItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Delete WebItem
    deleteWebItem: async (req, res) => {
        try {
            const webItem = await WebItem.findByPk(req.params.id);
            if (!webItem) {
                return res.status(404).json({ error: "WebItem not found" });
            }

            await webItem.destroy();
            res.status(204).json();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = webitemController;
