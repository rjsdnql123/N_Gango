const express = require("express");
const router = express.Router();

const { stuffController } = require("../controller");

router.post("/category", stuffController.category);

router.post("/stuff", stuffController.stuff);

router.get("/stuffget", stuffController.stuffget);
module.exports = router;
