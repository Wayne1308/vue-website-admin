import {
	createApp, defineAsyncComponent
} from "vue"
import App from "./App.vue"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"

import * as echarts from "echarts"

import {
	createRouter,
	createWebHashHistory
} from "vue-router";

import * as ElIcons from "@element-plus/icons-vue"

// 引入界面
import Login from "./pages/Login.vue"
import Index from "./pages/Index.vue"
import News from "./pages/news/News.vue"
import Record from "./pages/record/Record.vue"
import Team from "./pages/content/Team.vue"
import Case from "./pages/content/Case.vue"
import Links from "./pages/content/Links.vue"
import Job from "./pages/content/Job.vue"
import About from "./pages/content/About.vue"
import User from "./pages/system/User.vue"
import Role from "./pages/system/Role.vue"
import MenuPage from "./pages/system/MenuPage.vue"
import Log from "./pages/system/Log.vue"
import Dict from "./pages/system/Dict.vue"
import Setting from "./pages/system/Setting.vue"
import NineShaft from "./pages/Diagram/Nine_shaft.vue"
import SysStatus from "./pages/sys_status.vue"
import SeniorSetWan from "./pages/SeniorSet/SeniorSet_wan.vue"
import SeniorSetWanParameter from "./pages/SeniorSet/SeniorSet_wanParameter.vue"
import GeneralSetBasic from "./pages/WireLess/WirdLessSet_Basic.vue"
import GenralSet from "./pages/5G/General_Set.vue"
import WirdLessSetControl from "./pages/WireLess/WirdLessSet_Control.vue"
import RouterDiagram from "./pages/Diagram/Router_Diagram.vue"
import Temperature from "./pages/Diagram/Temperature.vue"
import Restart from "./pages/restart.vue"

import "./public/default.css"

// 定义页面路由
const routes = [{
	path: "/",
	redirect: "/Login"
},
{
	path: "/Index",
	name: "主页",
	component: Index
},
{
	path: "/Login",
	name: "登录",
	component: Login
},
{
	path: "/SysStatus",
	name: "系统状态",
	component: SysStatus
},
{
	path: "/Record",
	name: "访问记录",
	component: Record
},
{
	path: "/Team",
	name: "团队介绍",
	component: Team
},
{
	path: "/Case",
	name: "成功案例",
	component: Case
},
{
	path: "/Links",
	name: "友情链接",
	component: Links
},
{
	path: "/Job",
	name: "招聘信息",
	component: Job
},
{
	path: "/About",
	name: "公司介绍",
	component: About
},
{
	path: "/SeniorSetWan",
	name: "WAN口设置",
	component: SeniorSetWan
},
{
	path: "/SeniorSetWanParameter",
	name: "WAN口参数",
	component: SeniorSetWanParameter
},
{
	path: "/MenuPage",
	name: "菜单管理",
	component: MenuPage
},
{
	path: "/Log",
	name: "日志管理",
	component: Log
},
{
	path: "/Dict",
	name: "数据字典",
	component: Dict
},
{
	path: "/Setting",
	name: "系统设置",
	component: Setting
},
{
	path: "/NineShaft",
	name: "九轴",
	component: NineShaft
},
{
	path: "/GeneralSetBasic",
	name: "基本设置",
	component: GeneralSetBasic
},
{
	path: "/GenralSet",
	name: "5G模块调配",
	component: GenralSet
},
{
	path: "/WirdLessSetControl",
	name: "安全mac过滤",
	component: WirdLessSetControl
},
{
	path: "/RouterDiagram",
	name: "路由器测试",
	component: RouterDiagram
},
{
	path: "/Temperature",
	name: "温度模块",
	component: Temperature
},
{
	path: "/Restart",
	name: "重启路由器",
	component: Restart
}]
const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
})

const app = createApp(App);


// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;

for (const name in ElIcons) {
	app.component(name, ElIcons[name])
}

// 引入路由管理
app.use(router);

// 引入elementplus
app.use(ElementPlus, {
	locale: zhCn,
})
app.mount("#app");
