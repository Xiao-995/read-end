const db = require("../db/index"); // 引入Express框架
const bcrypt = require("bcryptjs"); // 导入bcrypt加密中间件
const crypto = require("crypto"); // 生成uuid
fs = require("fs"); // fs处理文件

/**
 * 上传头像接口
 */
exports.uploadAvatar = (req, res) => {
  // uuid
  const onlyId = crypto.randomUUID();
  // 上传时文件的随机名
  let oldName = req.files[0].filename;
  // 上传时的原文件名
  let newName = Buffer.from(req.files[0].originalname, "latin1").toString(
    "utf8"
  );
  // 更改文件名
  fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName);
  const sql = "insert into image set ?";
  db.query(
    sql,
    {
      image_url: `http://127.0.0.1:3007/upload/${newName}`,
      onlyId,
    },
    (err, result) => {
      if (err) return res.cc(err);
      res.send({
        onlyId,
        status: 0,
        url: "http://127.0.0.1:3007/upload/" + newName,
      });
    }
  );
};

/**
 * 绑定账号接口
 * @param {*id *onlyId *url} req
 */
exports.bindAccount = (req, res) => {
  const { onlyid, account, url } = req.body;
  // 设置image表的账号
  const sql = "update image set account =? where onlyId=?";
  db.query(sql, [account, onlyid], (error, result) => {
    if (error) return res.cc(error);
    if (result.affectedRows == 1) {
      // 设置users表的图片地址
      const sql1 = "update users set image_url =? where account=?";
      db.query(sql1, [url, account], (error, result) => {
        if (error) return res.cc(error);
        res.send({
          status: 0,
          message: "修改成功",
        });
      });
    }
  });
};

/**
 * 获取用户信息 *
 * @param {*id} req
 */
exports.getUserInfo = (req, res) => {
  const sql = "select * from users where id=?";
  db.query(sql, req.body.id, (error, result) => {
    if (error) return res.cc(error);
    res.send(result);
  });
};

/**
 * 修改姓名
 * @param {*id *name} req
 */
exports.changeName = (req, res) => {
  const { id, name } = req.body;
  const sql = "update users set name=? where id=?";
  db.query(sql, [name, id], (error, result) => {
    if (error) return res.cc(error);
    res.send({
      status: 0,
      message: "修改成功",
    });
  });
};

/**
 * 修改性别
 * @param {*id *sex } req
 */
exports.changeSex = (req, res) => {
  const { id, sex } = req.body;
  const sql = "update users set sex=? where id=?";
  db.query(sql, [sex, id], (error, result) => {
    if (error) return res.cc(error);
    res.send({
      status: 0,
      message: "修改成功",
    });
  });
};

/**
 * 修改邮箱
 * @param {*id *email } req
 */
exports.changeEmail = (req, res) => {
  const { id, email } = req.body;
  const sql = "update users set email=? where id=?";
  db.query(sql, [email, id], (error, result) => {
    if (error) return res.cc(error);
    res.send({
      status: 0,
      message: "修改成功",
    });
  });
};
