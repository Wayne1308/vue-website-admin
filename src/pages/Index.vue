<template>
	<el-scrollbar height="{{height}}" style="width:100%;">
		<el-row :gutter="10" style="margin: 0;padding: 0;">
			<el-col :span="12" :style="{height:((height-30)/4)+'px'}">
				<el-card class="box-card" :body-style="{ padding: '20px',width:'90%' }">
					<template #header>
						<div class="card-header">
							<span>个人信息</span>
						</div>
					</template>
					<el-row :gutter="10" :style="{height:(((height-30)/4)-58 - 40)+'px'}">
						<el-col :span="8" class="avatar">
							<el-image style="width: 100px;border-radius: 100%;" :src="userinfo.header" :fit="fit" />
						</el-col>
						<el-col :span="16" style="line-height: 35px;">
							<div class="name">欢迎登录，{{userinfo.name}}</div>
							<div class="date">上次登录：{{userinfo.lastLoginDate}}</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="12" :style="{height:((height-30)/4)+'px'}">
				<el-card class="box-card" :body-style="{ padding: '20px',width:'90%' }">
					<template #header>
						<div class="card-header">
							<span>快捷功能</span>
						</div>
					</template>
					<el-row :gutter="10" :style="{height:(((height-30)/4)-58 - 40)+'px'}">
						<el-col :span="6">
							<router-link :to="'/News'">
								<div class="quick_menu_item">
									<div class="icon">
										<el-icon>
											<document-copy />
										</el-icon>
									</div>
									<div class="text">发布文章</div>
								</div>
							</router-link>
						</el-col>
						<el-col :span="6">
							<router-link :to="'/About'">
								<div class="quick_menu_item">
									<div class="icon">
										<el-icon>
											<document />
										</el-icon>
									</div>
									<div class="text">公司介绍</div>
								</div>
							</router-link>
						</el-col>
						<el-col :span="6">
							<router-link :to="'/Team'">
								<div class="quick_menu_item">
									<div class="icon">
										<el-icon>
											<user-filled />
										</el-icon>
									</div>
									<div class="text">团队管理</div>
								</div>
							</router-link>
						</el-col>
						<el-col :span="6">
							<router-link :to="'/Job'">
								<div class="quick_menu_item">
									<div class="icon">
										<el-icon>
											<sunset />
										</el-icon>
									</div>
									<div class="text">招聘信息</div>
								</div>
							</router-link>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="10" style="margin: 0;padding: 0;margin-top: 20px;">
			<el-col :style="{height:(chartheight)+'px'}">
				<el-card class="box-card" :body-style="{ padding: '10px'}">
					<template #header>
						<div class="card-header">
							<span>访问量统计</span>
						</div>
					</template>
					<div id="chart" :style="{height:(((height-30)/4)*3 - 56 - 40 - 20 - 40 - 20)+'px'}"></div>
				</el-card>
			</el-col>
		</el-row>
	</el-scrollbar>
</template>
<script>
	import utils from "../public/utils.js";
	import api from "../public/api.js";
	import $ from 'jquery';
	import * as echarts from 'echarts'

	import {
		Avatar,
		DocumentCopy,
		Sunset,
		UserFilled,
		Document
	} from '@element-plus/icons-vue'
	export default {
		components: {
			Avatar,
			DocumentCopy,
			Sunset,
			UserFilled,
			Document
		},
		data() {
			return {
				chart: null, //报表
				height: 100,
				userinfo: {
					name: '--',
					header: '../assets/img016.png',
					lastLoginDate: '--'
				}
			}
		},
		created: function() {
			//判断当前是否已经登录，未登录转到登录界面
			if (!utils.islogined()) { //已登录，自动转到主页
				this.$router.push("Login");
				return;
			}
		},
		mounted: function() {
			this.height = $(window).height();
			this.loadUserInfo();
			this.loadReadData();
		},
		methods: {
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
			loadReadData: function() {
				var that = this;
				api.loadViewRecordData(function(res) {
					if (!res || res.status != 200 || !res.data) {
						utils.showerror("信息加载失败！");
						return;
					}
					that.initRecordChart(res.data);
				});
			},
			initRecordChart: function(data) {
				if (this.chart) { //若存在旧的，则销毁
					this.chart.dispose();
				}

				var times = [];
				var datas = [];
				var startDate = new Date();
				startDate.setDate(startDate.getDate() - 30);
				for (var i = new Date(startDate.getTime()); i.getTime() < new Date().getTime(); i.setDate(i.getDate() +
						1)) {
					times.push(i.format('MM-dd'));
					datas.push((Math.random(100) * 1000).toFixed(0));
				}

				this.chart = this.$echarts.init(document.getElementById('chart'));
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
							label: {
								show: true
							}
						}
					},
					grid: {
						left: '40px',
						right: '55px',
						bottom: '50px'
					},
					color: ['#31c2b0'],
					xAxis: {
						type: 'category',
						data: times
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name: '访问量',
						data: datas,
						barWidth: 15,
						type: 'bar',
						itemStyle: {
							barBorderRadius: [7, 7, 0, 0],
						},
						label: {
							show: true,
							position: "top"
						}
					}]
				};
				this.chart.setOption(option);
			}
		}
	}
</script>
<style scoped="scoped">
	.el-row {
		margin-bottom: 20px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.avatar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.quick_menu_item {
		width: 70%;
		margin: 0 auto;
		border: 1px solid #efefef;
		background: #f8f8f8;
		border-radius: 5px;
		height: 100px;
		text-align: center;
		cursor: pointer;
		text-decoration: none !important;
		box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
	}

	.quick_menu_item .icon {
		height:50px;
		line-height: 50px;
		font-size: 30px;
		color: #222;
		position: relative;
		top: 5px;
	}

	.quick_menu_item .text {
		height: 50px;
		line-height: 50px;
		color: #222;
		text-decoration: none !important
	}

	.quick_menu_item:hover {
		background: #409EFF;
	}

	.quick_menu_item:hover .icon,
	.quick_menu_item:hover .text {
		color: #fff;
		text-decoration: none !important
	}

	a {
		text-decoration: none;
	}

	.router-link-active {
		text-decoration: none;
	}

	.el-scrollbar__wrap {
		overflow-x: hidden !important;
	}
</style>
