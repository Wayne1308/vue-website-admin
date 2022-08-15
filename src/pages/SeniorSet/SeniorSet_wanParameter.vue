<script>
import utils from "../../public/utils.js";
import api from "../../public/api.js";
import config from "../../public/config.js";
import $ from "jquery";
export default {
  data() {
    return {
      WanParamForm: {
        region: "0",
      },
    };
  },
  mounted: function () {},
  methods: {
    resetForm: function () {
      this.$refs.WanParamForm.resetFields();
    },
  },
};
</script>

<template>
  <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span>WAN口参数</span></h4>
        <hr />
        <br />
        <el-form :model="WanParamForm" ref="WanParamForm" :rules="rules">
          <el-form-item label="协商模式" prop="region">
            <el-select v-model="WanParamForm.region" placeholder="请选择">
              <el-option label="自协商" value="0" />
              <el-option label="10M 半双工" value="1" />
              <el-option label="10M 全双工" value="2" />
              <el-option label="100M 半双工" value="3" />
              <el-option label="100M 全双工" value="4" />
            </el-select>
          </el-form-item>
          <el-space fill>
            <el-alert type="info" show-icon :closable="false">
              <p>
                注意:您的WAN口网线可能老化或太长而驱动能力不够，或者您的ISP供应商希望您必须设置与他们匹配的速率模式，<br />
                那么您可以将WAN口的参数设置成10M全双工的模式（或ISP供应商指定的速率模式）来提高硬件的驱动能力。
              </p>
            </el-alert>
          </el-space>
          <el-form-item>
            <el-button type="primary" @click="submitAdd">立即提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
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
