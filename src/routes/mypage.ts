import express from 'express';
const router = express.Router();
const { mypageController } = require('../controller');

router.get('/', jwtVerify, mypageController.mypage);

module.exports = router;
