/* eslint-disable no-undef */
const CryptoJS = require('crypto-js');  // 引用AES源码js
/**
 * crypto-js
 * 加密解密函数
 */    
// 秘钥
const CRYPTOJSKEY = 'www.dztech.com1007';
const key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
const options = { mode: CryptoJS.mode.ECB,  padding: CryptoJS.pad.Pkcs7 };

/**
* AES 解密
* @param decryptString  要解密的字符串
* @returns {string} 解密后的字符串
*/
function Decrypt(decryptString) {
  const decrypt = CryptoJS.enc.Hex.parse(decryptString);
  const decryptString = CryptoJS.DES.decrypt({ ciphertext: decrypt }, key,options);
  return decryptString.toString(CryptoJS.enc.Utf8);
}

/**
 * AES 加密
 * @param encryptString  要解密的字符串
 * @returns {string} 解密后的字符串
 */
function Encrypt(encryptString) {
  const encrypted = CryptoJS.DES.encrypt(encryptString, key, options);
  return encrypted.ciphertext.toString();
}

export default {
  Decrypt ,
  Encrypt
};