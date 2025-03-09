const joi = require("joi");

/**
 * 对账号密码进行验证规则设置
 * @string :指定字段类型为字符型
 * @alphanum :确保字段只包括字母和数字
 * @required :必填项
 * @pattern :使用正则表达式
 */
const account = joi.string().alphanum().min(6).max(12).required();
const password = joi
  .string()
  .pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)
  .min(6)
  .max(12)
  .required();

exports.login_limit = {
  body: {
    account,
    password,
  },
};
