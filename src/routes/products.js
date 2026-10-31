'use strict';
const router = require('express').Router();
const { list, get, checkout } = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');

router.get('/', list);
router.get('/:id', get);
router.post('/:id/checkout', authenticate, checkout);

module.exports = router;
