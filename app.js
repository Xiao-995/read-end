const express = require("express"); // 引入Express框架
const cors = require("cors"); // 引入cors中间件
const bodyParser = require("body-parser"); // 引入body-parser中间件
const app = express(); // 创建Express实例
app.use(cors); // 全局挂载中间件
app.use(bodyParser.urlencoded({ extended: false })); // 解析url编码格式的请求体,false:值为数组或字符串,true:值为任意类型
app.use(bodyParser.json()); // 解析JOSN格式数据
const port = "3000";

/**
 * 绑定和监听指定端口
 */
app.listen(port, () => {
  console.log("http://127.0.0.1", port);
});
