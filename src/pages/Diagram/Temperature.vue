<script>
import utils from "../../public/utils.js";
import api from "../../public/api.js";
import config from "../../public/config.js";
import ListPage from "../../components/ListPage.vue";
import $ from "jquery";
import * as echarts from "echarts";
import { method } from "lodash";

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: "0",
          label: "温湿度",
        },
      ],
      form: {
        choseDate: "",
        means: "",
      },
    };
  },
  mounted: function () {
    this.showTemp();
    this.showHumidity();
  },
  methods: {
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
    //开始测试
    getData() {
      $.ajax({
        url: "http://localhost:8888/dz/startHumiture",
        type: "POST",
        dataType: "json",
        success(data) {
          if (data.code == 200) {
            layer.msg("开始测试");
          }
        },
      });
    },
    stopData() {
      $.ajax({
        url: "http://localhost:8888/dz/cancleHumiture",
        type: "POST",
        dataType: "json",
        success(data3) {
          if (data3.code == 200) {
            layer.msg("停止测试");
          }
        },
      });
    },
    hisData() {
      ElMessageBox.alert("This is a message", "Title", {
        confirmButtonText: "OK",
      });
    },
    showTemp() {
      var chartDom = document.getElementById("temp");
      var myChart = echarts.init(chartDom);
      var option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: "#FFAB91",
            },
            progress: {
              show: true,
              width: 30,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: "#999",
              },
            },
            axisLabel: {
              distance: -20,
              color: "#999",
              fontSize: 20,
            },
            anchor: {
              show: false,
            },
            title: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              width: "80%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-15%"],
              fontSize: 50,
              fontWeight: "bolder",
              formatter: "{value} °C",
              color: "auto",
            },
            data: [
              {
                value: 20,
              },
            ],
          },
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: "#FD7347",
            },
            progress: {
              show: true,
              width: 8,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 20,
              },
            ],
          },
        ],
      };
      setInterval(function () {
        myChart.setOption({
          series: [
            {
              data: [
                {
                  value: temperature,
                  name: "温度",
                },
              ],
            },
          ],
        });
      }, 1000);
      myChart.setOption(option);
    },
    showHumidity() {
      var chartHumi = document.getElementById("humi");
      var myChartHumi = echarts.init(chartHumi);
      var optionHumi = {
        series: [
          {
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: "80%",
            axisLine: {
              lineStyle: {
                color: [[1, "#f00"]],
                width: 3,
              },
            },
            splitLine: {
              distance: -18,
              length: 18,
              lineStyle: {
                color: "#f00",
              },
            },
            axisTick: {
              distance: -12,
              length: 10,
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              distance: -50,
              color: "#f00",
              fontSize: 25,
            },
            anchor: {
              show: true,
              size: 20,
              itemStyle: {
                borderColor: "#000",
                borderWidth: 2,
              },
            },
            pointer: {
              offsetCenter: [0, "10%"],
              icon:
                "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
              length: "115%",
              itemStyle: {
                color: "#000",
              },
            },
            detail: {
              valueAnimation: true,
              precision: 1,
            },
            title: {
              offsetCenter: [0, "-50%"],
            },
            data: [
              {
                value: NaN,
                name: "PLP",
              },
            ],
          },
          {
            type: "gauge",
            min: 0,
            max: 60,
            splitNumber: 6,
            axisLine: {
              lineStyle: {
                color: [[1, "#000"]],
                width: 3,
              },
            },
            splitLine: {
              distance: -3,
              length: 18,
              lineStyle: {
                color: "#000",
              },
            },
            axisTick: {
              distance: 0,
              length: 10,
              lineStyle: {
                color: "#000",
              },
            },
            axisLabel: {
              distance: 10,
              fontSize: 25,
              color: "#000",
            },
            pointer: {
              show: false,
            },
            title: {
              show: true,
            },
            anchor: {
              show: true,
              size: 14,
              itemStyle: {
                color: "#000",
              },
            },
          },
        ],
      };

      setInterval(function () {
        getHumiture();
        myChartHumi.setOption({
          series: [
            {
              type: "gauge",
              data: [
                {
                  value: humidity,
                  name: "湿度",
                },
              ],
            },
          ],
        });
      }, 1000);
      myChartHumi.setOption(optionHumi);
    },
    //湿度历史数据
    getHisHumiture(n, hisData) {
      var chartHis;
      if (chartHis != null && chartHis != "" && chartHis != undefined) {
        chartHis.dispose(); //销毁
      }
      chartHis = document.getElementById("HistoryContainer");
      var hisTemp = echarts.init(chartHis);
      var optionHis;
      // prettier-ignore
      // let timeData = hisData.date;

      optionHis = {
          title: {
            text: '温湿度',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: ['温度', '湿度'],
            left: 10
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          axisPointer: {
            link: [
              {
                xAxisIndex: 'all'
              }
            ]
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 30,
              end: 70,
              xAxisIndex: [0, 1]
            },
            {
              type: 'inside',
              realtime: true,
              start: 30,
              end: 70,
              xAxisIndex: [0, 1]
            }
          ],
          grid: [
            {
              left: 60,
              right: 50,
              height: '35%'
            },
            {
              left: 60,
              right: 50,
              top: '55%',
              height: '35%'
            }
          ],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: { onZero: true },
              data: (function () {
                var hisTempDate = [];
                for (let i = 0; i < n; i = i + 1) {
                  hisTempDate.push(
                    echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', hisData[i].date),
                  );
                }
                return hisTempDate;
              }())
            },
            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: { onZero: true },
              data: (function () {
                var hisTempDate = [];
                for (let i = 0; i < n; i = i + 1) {
                  hisTempDate.push(
                    echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', hisData[i].date),
                  );
                }
                return hisTempDate;
              }()),
              position: 'top'
            }
          ],
          yAxis: [
            {
              name: '温度(C)',
              type: 'value',
              max: 100
            },
            {
              gridIndex: 1,
              name: '湿度(%)',
              type: 'value',
              inverse: true
            }
          ],
          series: [
            {
              name: '温度',
              type: 'line',
              symbolSize: 8,
              // prettier-ignore
              data: (function () {
                var hisTemp = [];
                for (let i = 0; i < n; i = i + 1) {
                  hisTemp.push(
                    hisData[i].temperature,
                  );
                }
                return hisTemp;
              }())
            },
            {
              name: '湿度',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,
              // prettier-ignore
              data: (function () {
                var hisHumi = [];
                for (let i = 0; i < n; i = i + 1) {
                  hisHumi.push(
                    hisData[i].humidity,
                  );
                }
                return hisHumi;
              }())
            }
          ]
        };
      hisTemp.setOption(optionHis);
    },
    //查询历史数据
    selectHis(form) {
      var that = this;
      if (form.choseDate == "" || form.means == "") {
        this.$message.error("请选择日期或要查看的数据");
      } else {
        $.ajax({
          url: "http://localhost:8888/dz/getHisHumiture",
          type: "post",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          dataType: "json",
          data: {
            choseTime: form.choseDate,
            tool: form.means,
          },
          success: function (data) {
            var hisData = [];
            var n;
            n = data.length;
            hisData = data;
            that.$options.methods.getHisHumiture(n, hisData);
          },
        });
      }
    },
    //
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
        <el-button id="startTest" @click="getData" type="primary" plain
          >开始测试</el-button
        >
        <el-button id="stopTest" @click="stopData" type="danger" plain
          >停止测试</el-button
        >
        <el-button id="history" @click="dialogVisible = true" style="float: right" plain
          >历史数据</el-button
        >
        <el-dialog v-model="dialogVisible" title="历史数据" fullscreen="true">
          <el-form :model="form" label-width="120px">
            <label class="demonstration"> 开始日期 </label>
            <el-date-picker
              v-model="form.choseDate"
              type="date"
              moodel="false"
              placeholder="请选择日期"
              size="large"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledDate"
            />
            <span></span>
            <label> 选择数据 </label>
            <el-select v-model="form.means" class="m-2" placeholder="请选择" size="large">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button plain size="large" @click="selectHis(form)"> 查询</el-button>
            <div
              id="HistoryContainer"
              style="height: 600px; max-width: 1200px; margin: 0 auto"
            ></div>
          </el-form>
        </el-dialog>

        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
        <div style="width: 1200px; height: 1100px">
          <div id="humi" style="min-width: 600px; height: 500px; float: right"></div>
          <div id="temp" style="min-width: 600px; height: 400px; float: right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
h4 {
  font-size: 18px;
  font-family: "Microsoft YaHei", "Simsun", Arial;
  font-weight: normal;
  line-height: 1;
  padding: 0;
  margin: 0;
}

.icons li {
  margin: 5px 0;
  text-align: center;
  height: 120px;
  cursor: pointer;
}

.icons li i {
  display: block;
  font-size: 35px;
  margin: 10px 0;
  line-height: 60px;
  height: 60px;
}

.icons li:hover {
  background: #2f4056;
  border-radius: 5px;
  color: #fff;
}

.icons li:hover i {
  font-size: 50px;
}

.section {
  padding: 20px;
}

.section h4 span {
  color: #0084e9;
}

.fa {
  font-size: 25px !important;
}

.fa:hover {
  font-size: 50px !important;
}
</style>
