import { createStore } from "vuex";

const store = createStore({
  state () {
    return {
      // 选择菜单 以数组形式存储 位置代表层级
      selectMenuDeep: []
    }
  },
  mutations: {
    setSelectMenuDeep: (state, data) => {
      state.selectMenuDeep = data
    }
  }
})

export default store