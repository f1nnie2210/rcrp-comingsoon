const express = require("express");
const router = express.Router();
const Blindbox = require("../models/Blindbox");
const WebItem = require("../models/WebItem");
const BlindboxItem = require("../models/BlindboxItem");

// Create Blindbox
router.post("/", async (req, res) => {
  const { name, type, image, price, available, maxItems, items } = req.body;

  try {
      const blindbox = await Blindbox.create({
          name,
          type,
          image,
          price,
          availableP: Boolean(available),
          maxItems,
      });

      // Ensure items are provided in the request body
      if (!items || items.length === 0) {
          return res
              .status(400)
              .json({ error: "No items provided for the blindbox" });
      }

      // Find the provided items in the database and filter by type
      const selectedItems = await WebItem.findAll({
          where: {
              id: items,
              type: type, // Filter items by type
          },
      });

      if (selectedItems.length !== items.length) {
          return res
              .status(400)
              .json({
                  error: "Some items were not found in the database or do not match the specified type",
              });
      }

      await Promise.all(
          selectedItems.map(async (item) => {
              const blindboxItem = await BlindboxItem.create({
                  blindboxId: blindbox.id,
                  webitemId: item.id,
              });
              console.log("Created BlindboxItem:", blindboxItem); // Log created BlindboxItem
          })
      );

      res.status(201).json(blindbox);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Get All Blindboxes
router.get("/", async (req, res) => {
    try {
        const blindboxes = await Blindbox.findAll();
        res.status(200).json(blindboxes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Blindbox by ID with associated WebItems
router.get("/:id/items", async (req, res) => {
  try {
      const blindbox = await Blindbox.findByPk(req.params.id, {
          include: {
              model: WebItem,
              attributes: ['itemName'],
          },
      });

      if (blindbox) {
          res.status(200).json(blindbox);
      } else {
          res.status(404).json({ error: "Blindbox not found" });
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

router.get("/available", async (req, res) => {
  try {
    const blindboxes = await Blindbox.findAll({
      where: { available: { [Op.gt]: 0 } }, 
    });
    res.status(200).json(blindboxes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get Blindbox by ID
router.get("/:id", async (req, res) => {
    try {
        const blindbox = await Blindbox.findByPk(req.params.id);
        if (blindbox) {
            res.status(200).json(blindbox);
        } else {
            res.status(404).json({ error: "Blindbox not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Blindbox
router.put("/:id", async (req, res) => {
  const { name, type, image, price, available, maxItems, items } = req.body;

  try {
    const blindbox = await Blindbox.findByPk(req.params.id);
    if (!blindbox) {
      return res.status(404).json({ error: "Blindbox not found" });
    }

    await blindbox.update({
      name,
      type,
      image,
      price,
      available: Boolean(available),
      maxItems,
    });

    if (items && items.length > 0) {
      // Fetch existing BlindboxItems
      const existingItems = await BlindboxItem.findAll({
        where: { blindboxId: blindbox.id },
      });

      const existingItemIds = existingItems.map(item => item.webitemId);

      // Add new items that are not already associated
      const newItems = items.filter(itemId => !existingItemIds.includes(itemId));
      await Promise.all(
        newItems.map(async (itemId) => {
          await BlindboxItem.create({
            blindboxId: blindbox.id,
            webitemId: itemId,
          });
        })
      );

      // Optionally, remove items that are no longer needed
      // const itemsToRemove = existingItemIds.filter(itemId => !items.includes(itemId));
      // await BlindboxItem.destroy({
      //   where: {
      //     blindboxId: blindbox.id,
      //     webitemId: itemsToRemove,
      //   },
      // });
    }

    res.status(200).json(blindbox);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete specific item from Blindbox
router.delete("/:blindboxId/item/:itemId", async (req, res) => {
  const { blindboxId, itemId } = req.params;

  try {
    const blindboxItem = await BlindboxItem.findOne({
      where: {
        blindboxId: blindboxId,
        webitemId: itemId,
      },
    });

    if (!blindboxItem) {
      return res.status(404).json({ error: "Item not found in the blindbox" });
    }

    await blindboxItem.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Blindbox
router.delete("/:id", async (req, res) => {
    try {
        const blindbox = await Blindbox.findByPk(req.params.id);
        if (!blindbox) {
            return res.status(404).json({ error: "Blindbox not found" });
        }

        await BlindboxItem.destroy({ where: { blindboxId: blindbox.id } });
        await blindbox.destroy();

        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
