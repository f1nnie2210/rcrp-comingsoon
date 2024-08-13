const express = require('express');
const router = express.Router();
const webitemController = require('../controllers/webitemController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Create WebItem
router.post('/', adminMiddleware, webitemController.createWebItem);

// Get All Items
router.get('/', webitemController.getAllItems);

// Get Item by ID
router.get('/:id', webitemController.getItemById);

// Edit WebItem
router.put('/:id', adminMiddleware, webitemController.editWebItem);

// Delete WebItem
router.delete('/:id', adminMiddleware, webitemController.deleteWebItem);

module.exports = router;