'use strict';
const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/products', require('./products'));
router.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

module.exports = router;
