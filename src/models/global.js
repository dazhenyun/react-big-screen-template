
export default {
  namespace: 'global',
  state: {
    list: [], // 列表数据
  },

  // 监听，当发生变化时能dispach相应操作
  subscriptions: {},

  effects: {

  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
