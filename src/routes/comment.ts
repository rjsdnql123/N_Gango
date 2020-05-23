import express from 'express';
const router = express.Router();
const { commentController } = require('../controller');

router.post('/', commentController.comment);
router.get('/comment', commentController.comment);

module.exports = router;
