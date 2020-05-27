export {};
const express = require('express');
const router = express.Router();
const { userController } = require('../controller');

//로그인
router.post('/signin', userController.signin);
//회원가입
router.post('/signup', userController.signup);

router.get('/:username', userController.member);

module.exports = router;
