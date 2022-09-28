/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
import axios from 'axios';
const qs = require('qs');
// axios基本配置
axios.defaults.timeout = 50000;


// http request 拦截器
axios.interceptors.request.use(config => {
  return config;
},err => {
  return Promise.reject(err);
}
);

// http response 拦截器
axios.interceptors.response.use(response => {
  const dataAxios = response?.data;
  const { code, msg } = dataAxios;
  switch (code) {
    case 200:
      // [ 示例 ] code === 0 代表没有错误
      return dataAxios;
    case 201:
      // 用于返回正确的标识
      return dataAxios;
    case 500:
      errorLog(msg || '未知错误');
      // [ 示例 ] code === 0 代表没有错误
      return dataAxios;
    case 401:
      return dataAxios;
    default:

      return dataAxios;
  }

},error => {    
  return Promise.reject(error);
});


const  path = '';
const http = {
  /**
     * post 请求方法
     * @param url
     * @param data
     * @returns {Promise}
     */
  post(url, data,options) {
    return new Promise((resolve, reject) => {
      axios.post(path + url, qs.stringify(data),{ ...options }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  },
  /**
     * get 请求方法
     * @param url
     * @param data
     * @returns {Promise}
     */
  get(url, data,options) {
    return new Promise((resolve, reject) => {
      axios.get(path + url, { params:data },{ ...options }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  },
  custom_get(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(path + url, data).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  },
  /**
     * put 请求方法
     * @param url
     * @param id
     * @param data
     * @returns {Promise}
     */
  put(url, data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/${data.id}`, data).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  },
  /**
 * delete 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
  delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url,{ params:data }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  },
  /**
     * post 请求方法  请求类型为application/json
     * @param url
     * @param data
     * @returns {Promise}
     */
  json_post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(path + url, data,{ headers:{ 'Content-Type': 'application/json;charset=UTF-8' } }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  },
  /**
     * 下载文件
     * @param {*} url 
     * @param {*} data 
     */
  exportExcel(url,data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: path + url, 
        data:qs.stringify(data), 
        responseType: 'blob'
      }).then(response => {
        resolve(response);
      },err => {
        reject(err);
      });
    });
  },
  files(url, params) {
    const data = new FormData();
    for (const key in params) {
      data.append(key, params[key]);
    }
    return new Promise((resolve, reject) => {
      axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
        resolve(response);
      }, err => {
        reject(err);
      });
    });
  }
};


export default http;