const db = require("../db/index");

/*
 * 上传轮播图
 *  @param {*set_value *set_name } req
 */
exports.uploadSwiper = (req, res) => {
	let str = req.body.set_name
	// 上传时文件的随机名
	let oldName = req.files[0].filename;
	// 上传时的原文件名
	let newName = Buffer.from(req.files[0].originalname, "latin1").toString(
		"utf8"
	);
	// 更改文件名
	fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName);
	const sql = "update setting set set_value=? where set_name=?";
	db.query(
		sql, [`http://127.0.0.1:3007/upload/${newName}`, str],
		(err, result) => {
			if (err) return res.cc(err);
			res.send({
				status: 0,
				message: "上传轮播图成功"
			});
		}
	);
}

/*
 * 获取轮播图
 */
exports.getAllSwiper = (req, res) => {
	const sql = "select * from setting where set_name like 'swiper%'"
	db.query(sql, (err, result) => {
		if (err) {
			return res.cc(err)
		}
		res.send({
			status: 0,
			result,
			message: "获取轮播图成功"
		})
	})
}

/**
 * 获取公司名称
 */
exports.getCompanyName = (req, res) => {
	const sql = "select * from setting where set_name= '公司名称'";
	db.query(sql, (error, result) => {
		if (error) return res.cc(error);
		res.send(result[0].set_value);
	});
};

/**
 * 修改公司名称
 * @param {*set_value}
 */
exports.changeCompanyName = (req, res) => {
	const sql = "update setting set set_value=? where set_name='公司名称'";
	db.query(sql, req.body.set_value, (error, result) => {
		if (error) return res.cc(error);
		res.send({
			status: 0,
			message: "修改成功"
		});
	});
};

/**
 * 编辑公司介绍
 * @param {*set_value *set_name}
 */
exports.changeCompanyIntroduce = (req, res) => {
	const data = req.body;
	const sql = "update setting set set_value=? where set_name=?";
	db.query(sql, [data.set_value, data.set_name], (error, result) => {
		if (error) return res.cc(error);
		res.send({
			status: 0,
			message: "修改成功"
		});
	});
};

/**
 * 获取公司介绍
 * @param {*set_name}
 */
exports.getCompanyIntroduce = (req, res) => {
	const sql = "select * from setting where set_name= ?";
	db.query(sql,req.body.set_name,(error, result) => {
		if (error) return res.cc(error);
		res.send(result[0].set_value);
	});
};
