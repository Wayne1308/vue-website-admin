<script>
import utils from "../../public/utils.js";
import api from "../../public/api.js";
import config from "../../public/config.js";
import $ from "jquery";
import * as echarts from "echarts";
var myChartAll;
var acc_x;
var acc_y;
var acc_z;
var Gyro_X;
var Gyro_Y;
var Gyro_Z;
var Angle_X;
var Angle_Y;
var Angle_Z;
var nineShaftDate;
export default {
  data() {
    return {
      needadd: true,
      needdelete: true,
      needdownload: true,
      neededit: true,
      entitytype: "news",
      optionwidth: 180,
      check: true,
      dataurl: api.server_urls.new_url,
      dicts: [],
    };
  },
  mounted: function () {
    this.getAcc();
  },
  methods: {
    history: function () {
      this.$emit("NineHisInfo");
      document.getElementById("popSearchRoleTest").style.display = "none";
    },
    goPage: function () {
      const { href } = this.$router.resolve("/Role");
      window.open(href, "_blank");
    },
    tanchuang() {
      this.LogDialogVisible = !this.LogDialogVisible;
    },
    getAcc: function () {
      var ms;
      if (myChartAll != null && myChartAll != "" && myChartAll != undefined) {
        myChartAll.dispose(); //销毁
      }
      clearInterval(ms);
      // clearInterval(an);
      // clearInterval(gy);
      const AccDate = (function () {
        let res = [];
        let len = 5;
        while (len--) {
          res.push(echarts.format.formatTime("yyyy-MM-dd hh:mm:ss", nineShaftDate));
        }
        return res;
      })();
      const AccX = (function () {
        let res = [];
        let len = 5;
        while (len--) {
          res.push(acc_x);
        }
        return res;
      })();
      const AccY = (function () {
        let res = [];
        let len = 5;
        while (len--) {
          res.push(acc_y);
        }
        return res;
      })();
      const AccZ = (function () {
        let res = [];
        let len = 5;
        while (len--) {
          res.push(acc_z);
        }
        return res;
      })();
      var chartAcc = document.getElementById("humi");
      myChartAll = echarts.init(chartAcc);
      var optionAcc = {
        title: {
          text: "加速度",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Acc_X", "Acc_Y", "Acc_Z"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: AccDate,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Acc_X",
            type: "line",
            stack: "Total",
            data: AccX,
          },
          {
            name: "Acc_Y",
            type: "line",
            stack: "Total",
            data: AccY,
          },
          {
            name: "Acc_Z",
            type: "line",
            stack: "Total",
            data: AccZ,
          },
        ],
      };
      ms = setInterval(function () {
        getNineShaft();
        AccDate.shift();
        AccDate.push(echarts.format.formatTime("yyyy-MM-dd hh:mm:ss", nineShaftDate));
        AccY.shift();
        AccY.push(acc_y);
        AccZ.shift();
        AccZ.push(acc_z);
        AccX.shift();
        AccX.push(acc_x);
        myChartAll.setOption({
          xAxis: {
            data: AccDate,
          },
          series: [
            {
              data: AccX,
            },
            {
              data: AccY,
            },
            {
              data: AccZ,
            },
          ],
        });
      }, 1000);
      myChartAll.setOption(optionAcc);
    },
    getNineShaft: function () {
      $.ajax({
        url: "http://localhost:8888/dz/getNineShaft",
        type: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (data) {
          acc_x = data.acc_x;
          acc_y = data.acc_y;
          acc_z = data.acc_z;
          Gyro_X = data.gyro_x;
          Gyro_Y = data.gyro_y;
          Gyro_Z = data.gyro_z;
          Angle_X = data.angle_x;
          Angle_Y = data.angle_y;
          Angle_Z = data.angle_z;
          nineShaftDate = data.date;
        },
      });
    },
  },
};
</script>

<template>
  <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span>数据图</span></h4>
        <hr />
        <br />
        <el-button id="startTest" type="primary">开始测试</el-button>
        <el-button id="stopTest" type="warning">停止测试</el-button>
        <el-button id="history" style="float: right" @click="tanchuang"
          >历史数据</el-button
        >
        <el-button type="primary" size="small" @click="tanchuang = true" plain
          >查看日志</el-button
        >

        <el-button id="accelerated">加速度</el-button>
        <el-button id="gyroscope">陀螺仪</el-button>
        <el-button id="angle">角度</el-button>
        <el-button id="angle">温度</el-button>
        <el-button id="angle">磁场</el-button>
        <el-button id="angle">气压和高度</el-button>

        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
        <div style="width: 1200px; height: 1100px">
          <div id="humi" style="min-width: 1200px; height: 600px; float: right"></div>
          <!-- <div id="temp" style="min-width: 600px;height:400px; float: right;"></div> -->
        </div>

        <!-- 选择角色的按钮  -->
        <div id="popSearchRoleTest" style="display: none">
          <div>
            <label>开始日期</label>
            <div class="demo-date-picker">
              <div class="block">
                <span class="demonstration">Default</span>
                <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
              </div>
              <div class="block">
                <span class="demonstration">Picker with quick options</span>
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="Pick a day"
                  :disabled-date="disabledDate"
                  :shortcuts="shortcuts"
                />
              </div>
            </div>
            <div>
              <label class="layui-form-label">选择数据</label>
              <div class="layui-input-block">
                <div class="layui-input-inline">
                  <select name="means" lay-verify="">
                    <option value="请选择"></option>
                    <option value="0">加速度</option>
                    <option value="1">陀螺仪</option>
                    <option value="2">角度</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button type="button" lay-submit="" lay-filter="selectHis" class="layui-btn">
            查询
          </button>
          <div
            id="HistoryContainer"
            style="height: 600px; max-width: 1200px; margin: 0 auto"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
