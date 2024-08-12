const express = require('express');
const router = express.Router();
const webitems = require('../models/WebItem');

// Create Item
router.post('/', async (req, res) => {
  try {
    const item = await webitems.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Items
router.get('/', async (req, res) => {
  try {
    const items = await webitems.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await webitems.findByPk(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Item
router.put('/:id', async (req, res) => {
  try {
    const item = await webitems.findByPk(req.params.id);
    if (item) {
      await item.update(req.body);
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Item
router.delete('/:id', async (req, res) => {
  try {
    const item = await webitems.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;