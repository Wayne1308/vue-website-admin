import { createStore } from "vuex";

const store = createStore({
  state () {
    return {
      // 选择菜单 以对象形式存储
      selectMenuDeep: {}
    }
  },
  mutations: {
    setSelectMenuDeep: (state, data) => {
      state.selectMenuDeep = data
    }
  }
})

export default store