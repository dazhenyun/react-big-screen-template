/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable max-nested-callbacks */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import { cloneDeep } from 'loadsh';

// 删除数组制定元素
export const removeByValue = (arr, val) => {
  for (let i = 0; i < arr.length; i ++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      return arr;
    }
  }
};

/**
 * 查找对象数组是否存在
 */
export const findObjArray = (dic, obj, v1, v2) => {
  v1 = v1 || 'value';
  v2 = v2 || 'value';
  for (let i = 0; i < dic.length; i ++) {
    const o = dic[i];
    if (o[v1] === obj[v2]) {
      return i;
    }
  }
  return -1;
};

/**
 * 查找字符串是否存在
 */
export const findStrArray = (dic, value) => {
  if (!vaildUtil.ifnull(dic)) {
    for (let i = 0; i < dic.length; i ++) {
      if (dic[i] === value) {
        return i;
      }
    }
  }
  return -1;
};

/**
 * Object的属性为null的至为空字符串
 */
export const setObjectstr = function (obj) {
  for (const o in obj) {
    if (obj[o] === null || obj[o] === 'null') {
      obj[o] = '';
    }
  }
  return obj;
};

/**
 * Object的属性致空，但是属性存在
 */
export const setObjectnull = function (obj) {
  for (const o in obj) {
    obj[o] = '';
  }
  return obj;
};

/**
 * 判断手机号格式是否正确
 */
export const isMobile = (obj) => {
  if (!/^1[3|4|5|7|8|9][9][0-9]\d{4,8}$/.test(obj)) return false;
  else return true;
};

/**
 * 数组去重
 *  */
export const unique = (arr) => {
  const hash = [];
  arr.forEach(el => {
    if (hash.indexOf(el) === -1) {
      hash.push(el);
    }
  });
  return hash;
};


/**
 * 列表数据转换为树形结构
 * @param {*} list 列表数据
 * @param {*} idFiled 唯一字段索引
 * @param {*} parentField 父级字段索引
 */
export function tree(list, idFiled, parentField) {
  const data = cloneDeep(list);
  const map = {};
  const val = [];
  if (!data) {
    return [];
  }

  // 生成数据对象集合
  data.forEach(it => {
    map[it[idFiled]] = it;
  });

  // 生成结果集
  data.forEach(it => {
    const parent = map[it[parentField]];   // pid_department_id为父节点的id
    if (parent) {
      if (!Array.isArray(parent.children)) parent.children = [];
      parent.children.push(it);
    } else {
      val.push(it);
    }
  });
  return val;
}


export const checkIDCard = (value) => {
  // 加权因子
  const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  const code = String(value);
  const last = value[17];

  const seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  const arr = seventeen.split('');
  const len = arr.length;
  let num = 0;
  for (let i = 0; i < len; i += 1) {
    num += arr[i] * weight_factor[i];
  }

  // 获取余数
  const resisue = num % 11;
  const last_no = check_code[resisue];

  // 格式的正则
  // 正则思路
  /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
  const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  const format = idcard_patter.test(value);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return last === last_no && format;
};

export const randomColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  const a = ((Math.random() * 5 + 5) / 10).toFixed(2);
  // 随机颜色返回的是一个0.5到1 的两位小数;
  const color = `rgba(${r},${g},${b},${a})`;
  return color;
};

export const colors = [
  '#7EC3FF',
  '#F38191',
  '#F9CE83',

  '#A68D90',
  '#A0E4CD',
  '#FF9CAC',
  '#FFE988',
  '#D0ABE7',
  '#C3E7A8',
  '#F6B68B',
  '#CFFEED',
  '#BDE0FF',
];


export function translateDataToTree(data) {
  const arr = [...data];
  // 查找一级
  let tree = arr.filter((v) => v.parentId === 0);
  tree = tree.map((v) => {
    // 查找二级
    v.children = arr.filter(({ parentId }) => parentId === v.id);
    if (v.children.length === 0) delete v.children;
    else {
      v.children = v.children.map((item) => {
        // 查找三级
        item.children = arr.filter(({ parentId }) => parentId === item.id);
        if (item.children.length === 0) delete item.children;
        else {
          item.children = item.children.map((obj) => {
            // 查找四级
            obj.children = arr.filter(({ parentId }) => parentId === obj.id);
            if (obj.children.length === 0) delete obj.children;

            return obj;
          });
        }
        return item;
      });
    }

    return v;
  });

  return tree;
}

/**
 *  金额逗号个开1000,000
 */
export const locale = (text) => {
  if (text) return parseFloat(text).toLocaleString();
  else return '0';
};


/**
 *  递归获取多维数组Id
 */
export const getParentKey = (arr, newArr = []) => {
  arr.forEach((item) => {
    (item.id || item.id === 0) && newArr.push(item.id);
    item.categoryReqBos && getParentKey(item.categoryReqBos, newArr);
  });
  return newArr;
};


export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 全局字号
 */
export const sizes = 'large';



/**
 * 复合函数工具
 * @param funcs
 * @returns {*}
 */
export function compose(funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 * 时间遍历工具
 * @param {*} start 
 * @param {*} end 
 * @returns 
 */
export const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};
