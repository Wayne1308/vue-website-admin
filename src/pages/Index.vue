<template>
	<el-scrollbar :height="height">
		<!-- 新 -->
		<el-row justify="space-around" style="height: 250px">
			<el-col :span="6">
        <el-card class="box-card">
          <div class="wh100 flex-col space-between ">
            <div class="flex wh100">
              <img src="../assets/Index/state.png" style="height: 4em">
              <div class="flex-col ml10">
                <span style="font-size: 0.75em; color: #6099b0">实验室软路由</span>
                <span style="font-size: 2em; color: #75b358">已连接</span>
              </div>
            </div>
            <ul>
              <li>序列号</li>
              <li>版本号</li>
              <li>型号</li>
              <li>上线时间</li>
              <li>本地时间</li>
            </ul>
          </div>
        </el-card>
      </el-col>
			<el-col :span="6">
        <el-card class="box-card">
          <div class="wh100 flex-col">
            <div class="ali-center">
              <span style="font-size: 0.75em; color: #9c9c9c">主机流量排行</span>
              <el-icon><Top /></el-icon>
            </div>
            <div class="ali-center mb10 mt10">
              <span style="font-size: 2em">9 M/s</span>
              <span style="font-size: 0.75em; color: #c5806b" class="ml10">TOP1</span>
            </div>
            <div style="width: 100%; height: 100%">
              <bar-chart></bar-chart>
            </div>
          </div>
        </el-card>
      </el-col>
			<el-col :span="6">
        <el-card class="box-card">
					<div class=" flex-col space-between wh100">
						<div class="">
            <span style="font-size: 0.7em; color: #9c9c9c" class="">在线主机</span>
            <div class="ali-end mt10">
							<div class="mr20 flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">10</span>
              	<span style="margin-bottom: 4px;" class="small-text">当前</span>
							</div>
							<div class="flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">10</span>
              	<span style="margin-bottom: 4px;" class="small-text">最高</span>
							</div>
            </div>
          </div>
					<div class="">
            <span style="font-size: 0.7em; color: #9c9c9c" class="">认证</span>
            <div class="ali-end mt10">
							<div class="mr20 flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">10</span>
              	<span style="margin-bottom: 4px;" class="small-text">用户总数</span>
							</div>
							<div class="mr20 flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">10</span>
              	<span style="margin-bottom: 4px;" class="small-text">未认证用户</span>
							</div>
							<div class="mr20 flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">10</span>
              	<span style="margin-bottom: 4px;" class="small-text">web认证用户</span>
							</div>
							<div class="flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">10</span>
              	<span style="margin-bottom: 4px;" class="small-text">ppwebo认证用户</span>
							</div>
            </div>
          </div>
					</div>
        </el-card>
      </el-col>
			<el-col :span="6">
        <el-card class="box-card">
					<div class=" flex-col space-between wh100">
						<div>
            <span style="font-size: 0.75em; color: #9c9c9c">DHCP租约统计</span>
            <div class="ali-end mt10">
							<div class="mr20 flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">168</span>
              	<span style="margin-bottom: 4px;" class="small-text">剩余可分配</span>
							</div>
							<div class="flex-col flex-center">
								<span class="big-num" style="color: #4f9cd6; margin-right: 5px">1925</span>
              	<span style="margin-bottom: 4px;" class="small-text">最多可分配</span>
							</div>
            </div>
          </div>
					<div>
            <span style="font-size: 0.75em; color: #9c9c9c">活动连接</span>
            <div class="mt10" style="width: 100%">
							<span class="small-text ml20 mb10">50000/1000000 (50%)</span>
							<el-progress :percentage="50" status="success" />
            </div>
          </div>
					</div>
				</el-card>
      </el-col>
		</el-row>

    <el-row justify="space-around" style="height: 350px">
      <el-col :span="8">
        <el-card class="box-card">
					<div class="title-content">
						<span style="font-size: 1.25em; font-weight: 700">应用比例统计</span>
					</div>
					<ring-chart style="height: calc(100% - 30px)"></ring-chart>
				</el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
					<div class="title-content">
						<span style="font-size: 1.25em; font-weight: 700">流量监控</span>
					</div>
					<lljkChart style="height: calc(100% - 30px)"></lljkChart>
				</el-card>
      </el-col>
    </el-row>

    <el-row justify="space-around" style="height: 500px">
      <el-col :span="24">
        <el-card class="box-card">
					<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
						<el-tab-pane label="物理接口" name="first">
							<el-scrollbar :height="500">
								<interTable></interTable>
							</el-scrollbar>
						</el-tab-pane>
						<el-tab-pane label="虚拟接口" name="second">
							22222
						</el-tab-pane>
					</el-tabs>
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

  import barChart from "../components/Charts/barChart.vue";
	import ringChart from "../components/Charts/ringChart.vue";
	import lljkChart from "../components/Charts/lljkChart.vue";
	import interTable from '../components/interTable.vue'

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
			interTable
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
				activeName: 'first'
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
			this.height = $(window).height() - 120;
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
			},
			handleClick: function(tab, e) {
				console.log(tab, e);
			}
		}
	}
</script>

<style lang="less" scoped>

.el-col {
  padding: 6px;
}

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

//.el-scrollbar__wrap {
//  overflow-x: hidden !important;
//}
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
	font-weight: 700!important;
	font-size: 1.25em!important;
}
</style>

