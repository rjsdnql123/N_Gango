const express = require("express");
const router = express.Router();

const { stuffController } = require("../controller");

router.post("/category", stuffController.category);

router.post("/stuff", stuffController.stuff);

router.get('/stuffRecipe', stuffController.stuffRecipe)

router.post('/recipe', stuffController.recipe)
// router.post("/search", stuffController.search);
module.exports = router;
