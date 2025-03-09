const express = require("express"); // 引入Express框架
const cors = require("cors"); // 引入cors中间件
const bodyParser = require("body-parser"); // 引入body-parser中间件
const app = express(); // 创建Express实例
const jwtconfig = require("./jwt_config/index"); // 生成token中间件
const { expressjwt: jwt } = require("express-jwt"); // 解析token中间件
app.use(
  jwt({
    secret: jwtconfig.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({
    path: [/^\/api\//],
  })
);

/**
 * 注册返回错误中间件
 * @status :0--成功  1--失败
 */
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // 判断是错误对象还是字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

/**
 * 对不符合joi规则的情况进行报错
 */
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err);
});
app.use(cors()); // 解决跨域问题中间件
app.use(bodyParser.urlencoded({ extended: false })); // 解析url编码格式的请求体,false:值为数组或字符串,true:值为任意类型
app.use(bodyParser.json()); // 解析JOSN格式数据

const LoginRouter = require("./router/login");
const Joi = require("joi");
app.use("/api", LoginRouter);
/**
 * 绑定和监听指定端口
 */
app.listen(3007, () => {
  console.log("http://127.0.0.1");
});
