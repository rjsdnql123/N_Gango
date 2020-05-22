import express from 'express';
const router = express.Router();
const { commentController } = require('../controller');

router.post('/', commentController.comment);

module.exports = router;
