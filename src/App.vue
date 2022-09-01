<template>
	<div class="page-layout">
		<el-container>
        <suspense>
            <router-view v-if="islogin && isChart()"></router-view>
        </suspense>
        <suspense>
            <TopBar @loginout='loginout' :userinfo="userinfo" v-if="islogin && !isChart()"></TopBar>
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
	import { onMounted, computed, ref } from 'vue';
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
				islogin: true,
				height: $(window).height(),
				width: $(window).width() - 20,
				userinfo: null
			}
		},
		mounted: function() {//对渲染完html的dom节点进行操作
			this.height = $(window).height();
			if (this.islogin) {
				this.loadUserInfo();
			}
		},
		methods: {//编写js函数
			logined: function() {
				this.islogin = utils.islogined();
				this.$router.push("Index");

				this.loadUserInfo();

				this.$forceUpdate();
			},
			loginout: function() {
				this.islogin = utils.islogined();
				this.$router.push("Login");

				this.$forceUpdate();
			},
			loadUserInfo: function() {
				var that = this;
				api.loadUserInfoData(function(res) {
					if (!res || res.status != 200 || !res.data) {
						utils.showerror("信息加载失败！");
						return;
					}
					that.userinfo = res.data;
				});
			},

		},
		setup() {
			const route = new useRoute();

			const isChart = () => {
				return route.meta?.view === 'hytxsysgk-chart'
			}

			return {
				isChart
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
