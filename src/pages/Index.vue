<template>
	<el-scrollbar>
		<mat-row justify="space-around" class="one-level">
			<mat-col :span="6" gutter="6px">
				<el-card class="box-card">
					<div class="wh100 flex-col space-between ">
						<div class="flex wh100">
							<img src="../assets/Index/state.png" style="height: 4em">
							<div class="flex-col ml10">
								<span style="font-size: 0.75em; color: #6099b0">实验室软路由</span>
								<span style="font-size: 2em; color: #75b358">{{ status.status || '-' }}</span>
							</div>
						</div>
						<ul>
							<li>序列号：{{ status.serial || '-' }}</li>
							<li>版本号：{{ status.Version || '-' }}</li>
							<li>型号：{{ status.model || '-' }}</li>
							<li>上线时间：{{ status.upDate || '-' }}</li>
							<li>本地时间：{{ status.downDate || '-' }}</li>
						</ul>
					</div>
				</el-card>
			</mat-col>
			<mat-col gutter="6px" :span="6">
				<el-card class="box-card">
					<div class="wh100 flex-col">
						<div class="ali-center">
							<span style="font-size: 0.75em; color: #9c9c9c">主机流量排行</span>
							<el-icon>
								<Top />
							</el-icon>
						</div>
						<div class="ali-center mb10 mt10">
							<span style="font-size: 2em">{{ zjllData?.tip?.spead || 0}} M/s</span>
							<span style="font-size: 0.75em; color: #c5806b" class="ml10">TOP{{ zjllData?.tip?.ranking || 0}}</span>
						</div>
						<div style="width: 100%; height: 100%">
							<bar-chart :config="zjllData.barchart || {}"></bar-chart>
						</div>
					</div>
				</el-card>
			</mat-col>
			<mat-col gutter="6px" :span="6">
				<el-card class="box-card">
					<div class=" flex-col space-between wh100">
						<div class="">
							<span style="font-size: 0.7em; color: #9c9c9c" class="">在线主机</span>
							<div class="ali-end mt10">
								<div class="mr20 flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ zxzjData?.zxzj?.now || '-' }}</span>
									<span style="margin-bottom: 4px;" class="small-text">当前</span>
								</div>
								<div class="flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ zxzjData?.zxzj?.top || '-' }}</span>
									<span style="margin-bottom: 4px;" class="small-text">最高</span>
								</div>
							</div>
						</div>
						<div class="">
							<span style="font-size: 0.7em; color: #9c9c9c" class="">认证</span>
							<div class="ali-end mt10">
								<div class="mr20 flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ zxzjData?.auth?.total || '-' }}</span>
									<span style="margin-bottom: 4px;" class="small-text">用户总数</span>
								</div>
								<div class="mr20 flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ zxzjData?.auth?.noAuth || '-' }}</span>
									<span style="margin-bottom: 4px;" class="small-text">未认证用户</span>
								</div>
								<div class="mr20 flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ zxzjData?.auth?.webAuth || '-' }}</span>
									<span style="margin-bottom: 4px;" class="small-text">web认证用户</span>
								</div>
								<div class="flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ zxzjData?.auth?.ppwebo || '-' }}</span>
									<span style="margin-bottom: 4px;" class="small-text">ppwebo认证用户</span>
								</div>
							</div>
						</div>
					</div>
				</el-card>
			</mat-col>
			<mat-col gutter="6px" :span="6">
				<el-card class="box-card">
					<div class=" flex-col space-between wh100">
						<div>
							<span style="font-size: 0.75em; color: #9c9c9c">DHCP租约统计</span>
							<div class="ali-end mt10">
								<div class="mr20 flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ DHCPData.surplus }}</span>
									<span style="margin-bottom: 4px;" class="small-text">剩余可分配</span>
								</div>
								<div class="flex-col flex-center">
									<span class="big-num" style="color: #4f9cd6; margin-right: 5px">{{ DHCPData.most }}</span>
									<span style="margin-bottom: 4px;" class="small-text">最多可分配</span>
								</div>
							</div>
						</div>
						<div>
							<span style="font-size: 0.75em; color: #9c9c9c">活动连接</span>
							<div class="mt10" style="width: 100%" v-if="DHCPData.has">
								<span class="small-text ml20 mb10">{{ DHCPData.has }}/{{ DHCPData.all }} ({{ ((DHCPData.has / DHCPData.all) * 100).toFixed(2) }}%)</span>
								<el-progress :percentage="(DHCPData.has / DHCPData.all) * 100" status="success" />
							</div>
						</div>
					</div>
				</el-card>
			</mat-col>
		</mat-row>

		<mat-row justify="space-around" class="two-level">
			<mat-col gutter="6px" :span="8">
				<el-card class="box-card">
					<div class="title-content">
						<span style="font-size: 1.25em; font-weight: 700">应用比例统计</span>
					</div>
					<ring-chart class="ring-chart" :data="yyblData" ></ring-chart>
				</el-card>
			</mat-col>
			<mat-col gutter="6px" :span="16">
				<el-card class="box-card">
					<div class="title-content">
						<span style="font-size: 1.25em; font-weight: 700">流量监控</span>
					</div>
					<lljkChart class="lljk-chart" :data="lljkData"></lljkChart>
				</el-card>
			</mat-col>
		</mat-row>

		<mat-row justify="space-around" class="three-level">
			<mat-col gutter="6px" :span="24">
				<el-card class="box-card">
					<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane label="物理接口" name="first">
							<el-scrollbar :height="500">
								<interTable></interTable>
							</el-scrollbar>
						</el-tab-pane>
						<el-tab-pane label="虚拟接口" name="second">
							<el-scrollbar :height="500">
								<interTable></interTable>
							</el-scrollbar>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</mat-col>
		</mat-row>

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

import barChart from "../components/Charts/barChart.vue";
import ringChart from "../components/Charts/ringChart.vue";
import lljkChart from "../components/Charts/lljkChart.vue";
import interTable from '../components/interTable.vue'
import matCol from "../components/layout/mat-col.vue";
import matRow from "../components/layout/mat-row.vue";

// 
import { fetchIndexStatusData, fetchIndexZjllData, fetchIndexZxzjData, fetchIndexDHCPData, fetchIndexYyblData, fetchIndexLljkData } from '../public/service/index'

export default {
	components: {
		Avatar,
		DocumentCopy,
		Sunset,
		UserFilled,
		Document,
		barChart,
		ringChart,
		lljkChart,
		interTable,
		matCol,
		matRow
	},
	data() {
		return {
			chart: null, //报表
			height: 100,
			userinfo: {
				name: '--',
				header: '../assets/img016.png',
				lastLoginDate: '--'
			},
			activeName: 'first',
			status: {},
			zjllData: {},
			zxzjData: {},
			DHCPData: {},
			lljkData: {}
		}
	},
	created: function () {
		//判断当前是否已经登录，未登录转到登录界面
		if (!utils.islogined()) { //已登录，自动转到主页
			this.$router.push("Login");
			return;
		}
	},
	mounted: async function () {
		this.height = $(window).height() - 120;
		this.loadUserInfo();
		// this.loadReadData();
		// 
		this.status = await fetchIndexStatusData();
		this.zjllData = await fetchIndexZjllData();
		this.zxzjData = await fetchIndexZxzjData();
		this.DHCPData = await fetchIndexDHCPData();
		this.yyblData = await fetchIndexYyblData();
		this.lljkData = await fetchIndexLljkData();
	},
	methods: {
		loadUserInfo: function () {
			var that = this;
			api.loadUserInfoData(function (res) {
				if (!res || res.status != 200 || !res.data) {
					utils.showerror("信息加载失败！");
					return;
				}
				that.userinfo = res.data;
			});
		},
		loadReadData: function () {
			var that = this;
			api.loadViewRecordData(function (res) {
				if (!res || res.status != 200 || !res.data) {
					utils.showerror("信息加载失败！");
					return;
				}
				// that.initRecordChart(res.data);
			});
		},
		initRecordChart: function (data) {
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
		},
		handleClick: function (tab, e) {
			console.log(tab, e);
		}
	}
}
</script>

<style lang="less" scoped>

.box-card {
	background-color: #FFF;
	height: 100%;
	width: 100%;
}

ul {
	List-style-type: none;
}

.big-num {
	font-size: 2em;
}

.small-text {
	font-size: 0.5em;
	color: #9c9c9c;
}

.title-content {
	height: 30px;
	border-bottom: 1px solid #e5e6ea;
}

.one-level {
	height: 250px;
}
.two-level {
	height: 400px;
}
.three-level {
	height: 500px;
}

.ring-chart, .lljk-chart {
	height: calc(100% - 30px);
}
</style>


<!--elementUI样式-->
<style lang="less">
.el-card__body {
	height: 100%;
}

.el-tabs__header {
	height: 30px;
}

.el-tabs__item {
	font-weight: 700 !important;
	font-size: 1.25em !important;
}
</style>

<style lang="less">
/* 在宽度为 600 像素或更小的屏幕上 */
@media screen and (max-width: 600px) {
	.mat-row-container {
		flex-direction: column!important;
	}
	.one-level,.two-level, .three-level {
		height: auto!important;
	}
	.ring-chart, .lljk-chart {
	height: auto!important;
}
}
</style>

