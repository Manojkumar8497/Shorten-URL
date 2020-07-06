const router = require('express').Router();
const urlController = require('../controller/url');

// Create a shorten url
router.post('/shorten', urlController.createShorten);

module.exports = router;