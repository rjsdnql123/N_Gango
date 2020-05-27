const express = require('express');
const router = express.Router();
const { stuffController } = require('../controller');

router.post('/category', stuffController.category);

router.post('/', stuffController.stuff);

router.get("/stuffsearch", stuffController.stuffsearch);

router.get('/categorysearch', stuffController.categorySearch)

router.get('/getcooking', stuffController.getcooking)
module.exports = router;
