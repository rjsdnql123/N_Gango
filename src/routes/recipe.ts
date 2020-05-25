import express from "express";
import { jwtVerify } from "../middleware/jwt";

const router = express.Router();
const { recipeController } = require('../controller');

router.post('/', jwtVerify, recipeController.recipe);

router.get("/search", recipeController.searchRecipe)

router.get('/getrecipe:id', recipeController.getrecipe)
module.exports = router;
