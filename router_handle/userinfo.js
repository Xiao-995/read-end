const db = require("../db/index"); // 引入Express框架
const bcrypt = require("bcryptjs"); // 导入bcrypt加密中间件
const crypto = require("crypto"); // 生成uuid
fs = require("fs"); // fs处理文件

exports.uploadAvatar = (req, res) => {
  /*  const sourcePath =
    "D:\\Mu\\project\\后台管理系统\\rear-end\\public\\upload\\0845167f4cdded38ec7523b2e3169f66";
  const destinationPath =
    "D:\\Mu\\project\\后台管理系统\\rear-end\\public\\upload\\renamed.txt";

  fs.renameSync(sourcePath, destinationPath); */
  // 生成唯一标识
  const onlyId = crypto.randomUUID();
  let oldName = req.files[0].filename;
  let newName = Buffer.from(req.files[0].originalname, "latin1").toString(
    "utf8"
  );
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
