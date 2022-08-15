<script>
import utils from "../../public/utils.js";
import api from "../../public/api.js";
import config from "../../public/config.js";
import $ from "jquery";
import * as echarts from "echarts";
import { method } from "lodash";
export default {};
</script>

<template>
  <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span>数据图</span></h4>
        <hr />
        <br />
        <el-button id="startTest" type="primary" plain> 开始测试 </el-button>
        <el-button id="stopTest" type="warning" plain>停止测试</el-button>
        <el-button id="startSpeedTest" type="primary" plain> 启动SPeedTest </el-button>
        <el-button id="stopSpeedTest" type="warning" plain> 停止SpeedTest </el-button>
        <el-button id="history" style="float: right" plain> 历史数据 </el-button>
        <div style="min-width: 300px; height: 400px">
          <div
            id="container-speed"
            style="width: 300px; height: 200px; float: left"
          ></div>
          <div
            id="signalContainer"
            style="width: 1200px; height: 300px; float: left"
          ></div>
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
