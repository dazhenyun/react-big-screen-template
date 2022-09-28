/**
 * @author 狄路
 * @version 0.0.1
 * @function 路由配置文件
 * @date 2021/11/22 1:30
 */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Redirect } from 'react-router-dom';
import App from '@/pages/app';
// 嵌套路由
export default [
  {
    title: '首页',
    path: '/app',
    component: App,
  },
  {
    path: '/',
    render: () => <Redirect to="/app" /> ,
  },
];
