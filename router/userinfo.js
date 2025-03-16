const express = require("express");
const router = express.Router(); // 创建路由实例
const expressJoi = require("@escook/express-joi"); // 导入express-joi
const userinfo = require("../router_handle/userinfo"); // 登录模块逻辑

// 上传头像
router.post("/uploadAvatar", userinfo.uploadAvatar);

module.exports = router;
