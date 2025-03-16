const db = require("../db/index.js"); // 引入Express框架
const bcrypt = require("bcryptjs"); // 导入bcrypt加密中间件
const jwt = require("jsonwebtoken"); // 导入jwt,用于生成token
const jwtconfig = require("../jwt_config/index.js"); // 导入jwt配置文件，用于加密跟解密

/**
 *  注册
 * @exports 是一个对象,为其添加属性方法，这些属性方法都会被导出
 * @param {*} req 前端传入数据
 * @param {*} res 返回前端数据
 * @returns
 */
exports.register = (req, res) => {
  const reginfo = req.body;
  // 判断前端传过来的数据有没有空
  if (!reginfo.account || !reginfo.password) {
    return res.send({
      status: 1,
      message: "账号或者密码不能为空",
    });
  }
  // 判断前端传过来账号有没有已经存在在数据表中
  const sql = "select * from users where account = ?";
  // 第一个参数是执行语句，第二个是参数，第三个是一个函数，用于处理结果
  db.query(sql, reginfo.account, (err, results) => {
    // 返回长度大于0说明账号已存在
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: "账号已存在",
      });
    }
    // 使用加密中间件 bcrypt.js 对密码进行加密 --- bcrypt.hashSync(加密数据, 加密长度);
    reginfo.password = bcrypt.hashSync(reginfo.password, 10);
    // 把账号跟密码插入到users表里面
    const sql1 = "insert into users set ?";
    const identity = "用户"; // 注册身份
    const create_time = new Date(); // 创建时间
    db.query(
      sql1,
      {
        account: reginfo.account, // 账号
        password: reginfo.password, // 密码
        identity, // 身份
        create_time, // 创建时间
        status: 0, // 初始未冻结状态为0
      },
      (err, results) => {
        // 第一个,插入失败
        // affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
        if (results.affectedRows !== 1) {
          return res.send({
            status: 1,
            message: "注册账号失败",
          });
        }
        res.send({
          status: 0,
          message: "注册账号成功",
        });
      }
    );
  });
};

/**
 * 登录
 */
exports.login = (req, res) => {
  const loginfo = req.body;
  // 查看数据表中有没有前端传过来的账号
  const sql = "select * from users where account = ?";
  db.query(sql, loginfo.account, (err, results) => {
    // 执行sql语句失败的情况 一般在数据库断开的情况会执行失败
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("账号不存在!");
    // 对前端传过来的密码进行解密
    const compareResult = bcrypt.compareSync(
      loginfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("密码错误!");
    }
    // 对账号是否冻结做判定
    if (results[0].status == 1) {
      return res.cc("账号被冻结");
    }
    // 生成返回给前端的token
    // 剔除加密后的密码,头像,创建时间,更新时间
    const user = {
      ...results[0],
      password: "",
      imageUrl: "",
      create_time: "",
      update_time: "",
    };
    // 生成token,设置token的有效时长
    // jwt.sign(加密的数据，签名的密钥，配置项)
    const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
      expiresIn: "7h",
    });
    res.send({
      results: results[0],
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};
