import express from 'express';
const router = express.Router();
const { mypageController } = require('../controller');

router.get('/', mypageController.mypage);

module.exports = router;
