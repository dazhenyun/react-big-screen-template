/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
import dva from 'dva';
import createLoading from 'dva-loading';
import '@/assets/less/common.less';
// import '@/utils/flexible';

const createHistory = require('history').createHashHistory;

// 1.Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    // e.preventDefault();
  },
});

// 2.Plugins
app.use(createLoading());

// 3.Model
require('./models/index').default.forEach((key) => app.model(key.default));

// 4.Router
app.router(require('./routes/index').default);

// 5.Start
app.start('#root');

if (module.hot) {
  module.hot.accept();
}
