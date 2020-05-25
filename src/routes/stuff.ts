const express = require('express');
const router = express.Router();

const { stuffController } = require('../controller');

router.post('/category', stuffController.category);

router.post('/', stuffController.stuff);
module.exports = router;
