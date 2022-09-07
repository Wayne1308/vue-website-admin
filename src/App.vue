<template>
	<div class="page-layout">
		<el-container>
			<suspense>
				<!-- <TopBar @loginout='loginout' :userinfo="userinfo" v-if="islogin"></TopBar> -->
				<router-view></router-view>
			</suspense>
		</el-container>
	</div>
</template>
<script>
	import $ from 'jquery';
	import utils from "./public/utils.js";
	import api from "./public/api.js";

	import TopBar from "./components/TopBar.vue";
	import Chart from './pages/Chart.vue'

	import { useRoute, useRouter } from 'vue-router';
	import { onMounted, computed, ref, watch } from 'vue';
	export default {
		//components组件注册
		components: {
			TopBar,
			Chart
		},
		//为变量赋值
		data() {
			return {
				//默认非登录状态,检测登录状态，并跳转到对于界面,
				// islogin: utils.islogined(),
				// islogin: true,
				height: $(window).height(),
				width: $(window).width() - 20,
				userinfo: null
			}
		},
		mounted: function() {//对渲染完html的dom节点进行操作
			this.height = $(window).height();
		},
		methods: {//编写js函数
		},
		setup() {
			const route = new useRoute();
			const router = new useRouter()

			// 是否是图表界面
			const isChart = computed(() => {
				return route.meta?.view === 'hytxsysgk-chart'
			})

			// 登陆状态
			let islogin = ref(null);

			// 获取用戶信息
			const userinfo = ref(null);
			const loadUserInfo = function() {
				api.loadUserInfoData(function(res) {
					if (!res || res.status != 200 || !res.data) {
						utils.showerror("信息加载失败！");
						return;
					}
					userinfo.value = res.data;
				});
			};
			// 登出
			const loginout = function() {
				islogin.value = utils.islogined()
				router.push("Chart");
			}

			return {
				isChart,
				islogin,
				userinfo,
				loginout
			}
		}
	}
</script>

<style>
@import url('./style/base.less');
	* {
		box-sizing: border-box;
		font-size: 12px;
	}

	html, body, #app {
		height: 100%;
		width: 100%;
	}

	.page-layout {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.page-layout .el-main {
		height: calc(100% - 60px);
		width: 100%;
		overflow: hidden;
	}

	.el-main {
		padding: 0 !important;
	}

	.page-layout .el-header {
		padding: 0;
	}

	.container {
		height: v-bind(height+"px");
	}

	.menubar {
		overflow: hidden !important;
	}

	.main_panel {
		z-index: 1;
		background: #f8f8f8;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 10px;
		overflow: hidden;
		width:v-bind(width+'px');
		position: fixed;
		top: 60px;
		left: 0px;
	}
</style>
