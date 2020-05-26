export {};
const express = require('express');
const router = express.Router();
const {userController} = require('../controller');

//로그인
router.get("/signin", userController.signin);
//회원가입
router.post("/signup", userController.signup);

router.get("/member/:id", userController.member)

module.exports = router;
