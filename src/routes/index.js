import React from 'react';
import { ConfigProvider } from 'antd';
import { renderRoutes } from 'react-router-config';
import { HashRouter  } from 'react-router-dom';
import routes from './routes';
import zhCN from 'antd/es/locale/zh_CN';


export default ({ history }) => {

  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </ConfigProvider>
  );
};

