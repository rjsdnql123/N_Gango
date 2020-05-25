import express from 'express';
const router = express.Router();
const { commentController } = require('../controller');

router.post('/', commentController.comment);
router.get('/', commentController.comment);

module.exports = router;
