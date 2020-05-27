const express = require('express');
const router = express.Router();
// const API = require('../API')
const { stuffController } = require('../controller');

router.post('/category', stuffController.category);

router.post('/', stuffController.stuff);

router.get("/stuffsearch", stuffController.stuffsearch);

router.get('/categorysearch', stuffController.categorySearch)
module.exports = router;
