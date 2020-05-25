import express from 'express';
import { jwtVerify } from '../middleware/jwt';
const router = express.Router();
const { recipeController } = require('../controller');

router.post('/', jwtVerify, recipeController.recipe);

module.exports = router;
