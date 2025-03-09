const mysql = require("mysql"); // 导入数据库

// 创建数据库连接
const db = mysql.createPool({
  host: "localhost", // 本地地址
  user: "back_system", // 数据库用户名
  password: "123456", // 数据库密码
  database: "back_system", // 数据库名
});

module.exports = db; // 对外暴露数据库
