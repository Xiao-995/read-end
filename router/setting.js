const express = require("express");
const router = express.Router(); // 创建路由实例
const setting = require("../router_handle/setting.js"); // 登录模块逻辑

// 上传轮播图
router.post("/uploadSwiper", setting.uploadSwiper);
// 获取轮播图
router.post("/getAllSwiper", setting.getAllSwiper);
// 获取公司名称
router.post("/getCompanyName", setting.getCompanyName);
// 修改公司名称
router.post("/changeCompanyName", setting.changeCompanyName);
// 修改公司介绍
router.post("/changeCompanyIntroduce", setting.changeCompanyIntroduce);
// 获取公司介绍
router.post("/getCompanyIntroduce", setting.getCompanyIntroduce);
module.exports = router;
