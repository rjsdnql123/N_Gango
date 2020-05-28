import express from 'express';
import { jwtVerify } from '../middleware/jwt';
const router = express.Router();
const { commentController } = require('../controller');

router.post('/', jwtVerify, commentController.comment);
router.get('/get', commentController.getcomment);

module.exports = router;
