import {
	createApp, defineAsyncComponent
} from "vue"
import App from "./App.vue"
import router from './router/index'
import store from './store/index'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"

import * as echarts from "echarts"

import * as ElIcons from "@element-plus/icons-vue"

import "./public/default.css"


const app = createApp(App);


// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;

for (const name in ElIcons) {
	app.component(name, ElIcons[name])
}

// 引入路由管理
app.use(router).use(store);

// 引入elementplus
app.use(ElementPlus, {
	locale: zhCn,
})
app.mount("#app");
