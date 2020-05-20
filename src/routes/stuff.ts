const express = require("express");
const router = express.Router();

const { stuffController } = require("../controller");

router.post("/category", stuffController.category);

module.exports = router;
