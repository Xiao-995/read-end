const express = require("express");
const router = express.Router(); // 创建路由实例
const expressJoi = require("@escook/express-joi"); // 导入express-joi
const userinfo = require("../router_handle/userinfo"); // 登录模块逻辑
const { name_limit, email_limit } = require("../limit/user");
// 上传头像
router.post("/uploadAvatar", userinfo.uploadAvatar);
// 绑定账号
router.post("/bindAccount", userinfo.bindAccount);
// 获取用户信息
router.post("/getUserInfo", userinfo.getUserInfo);
// 修改姓名
router.post("/changeName", expressJoi(name_limit), userinfo.changeName);
// 修改性别
router.post("/changeSex", userinfo.changeSex);
// 修改邮箱
router.post("/changeEmail", expressJoi(email_limit), userinfo.changeEmail);

module.exports = router;
