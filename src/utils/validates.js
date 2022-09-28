

import { checkIDCard } from './index';

/**
 * 手机号验证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkPhone = (rule, value, callback) => {
  const regu = '^1[0-9]{10}$';// 手机号码验证regEx:第一位数字必须是1，11位数字
  const re = new RegExp(regu);
  if (re.test(value)) {
    callback();
  } else {
    value ? callback('请正确输入手机号！') : callback();
  }
};

/**
 * 输入整数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const moneyNum = (rule, value, callback) => {
  const regu = '^[0-9]*$';
  const re = new RegExp(regu);
  if (re.test(value)) {
    callback();
  } else {
    value ? callback('请输入正整数或0') : callback();
  }
};

/**
 * 验证身份证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkIdNumber = (rule, value, callback) => {
  if (value) {
    checkIDCard(value) ? callback() : callback('请输入正确的身份证号码！');
  }
};
/**
 * 验证身份证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkIp = (rule, value, callback) => {
  const regu = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
  const re = new RegExp(regu);
  if (value) {
    re.test(value) ? callback() : callback('请输入正确的IP格式');
  } else {
    callback();
  }
};


