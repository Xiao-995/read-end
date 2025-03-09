/**
 * 登录注册模块路由
 */
const express = require("express");

const router = express.Router(); // 使用express路由模块
const Login = require("../router_handle/login"); // 登录模块逻辑
const expressJoi = require("@escook/express-joi"); // 导入express-joi
const { login_limit } = require("../limit/login.js");

// 注册
router.post("/register", expressJoi(login_limit), Login.register);
// 登录
router.post("/login", expressJoi(login_limit), Login.login);
module.exports = router; // 对外暴露
