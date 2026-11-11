const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');

router.get('/', utilityController.getAll);
router.get('/:id', utilityController.getById);
router.post('/', utilityController.create);
router.put('/:id', utilityController.update);
router.delete('/:id', utilityController.delete);

module.exports = router;
