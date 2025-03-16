// 数据验证库
const joi = require("joi");

// 姓名正则表达式，可是为2-10的汉字或英文
const name = joi
  .string()
  .pattern(/^([\u4e00-\u9fa5]{2,10}|[A-Za-z]+([\s\-'][A-Za-z]+)*)$/)
  .required();

const id = joi.required();
const email = joi
  .string()
  .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required();

exports.name_limit = {
  body: {
    name,
  },
};
exports.email_limit = {
  body: {
    email,
  },
};
