<script>
import utils from "../../public/utils.js";
import api from "../../public/api.js";
import config from "../../public/config.js";
import $ from "jquery";

export default {
  data() {
    return {
      height: $(window).height(),
      WifiBasciForm: {
        netWork: "0",
        ssid: "02:50:f4:00:00:00",
        guangbo: "开启",
        tennle: "0",
        xindao: "20MHz",
        jiami: "0",
        caozuo: "Mixed Mode",
        guize: "AES",
        beacon: "100",
        fragment: "100",
        rts: "100",
        tx: "100",
        wmm: "开启",
        apsd: "关闭",
        stard: "0",
        bgPro: "0",
      },
    };
  },
  mounted: function name() {},
  methods: {
    resetForm: function () {
      this.$refs.WifiBasciForm.resetFields();
    },
  },
};
</script>
<template>
  <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span>无线基本设置</span></h4>
        <hr />
        <br />
        <el-scrollbar :max-height="height * 0.85">
          <el-form
            :model="WifiBasciForm"
            ref="WifiBasciForm"
            label-width="120px"
            style="max-width: 460px"
          >
            <el-form-item label="网络模式:" prop="netWork">
              <el-select v-model="WifiBasciForm.netWork" placeholder="">
                <el-option label="11b/g混合模式" value="0" />
                <el-option label="11b模式" value="1" />
                <el-option label="11g模式" value="2" />
                <el-option label="11b/g/n混合模式" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="SSID:" prop="ssid">
              <el-input
                :span="1"
                v-model="WifiBasciForm.ssid"
                placeholder="请输入IP地址"
              />
            </el-form-item>
            <el-form-item label="广播(SSID):" prop="guangbo">
              <el-switch v-model="WifiBasciForm.guangbo" />
            </el-form-item>
            <el-form-item label="BSSID:"> 02:50:f4:00:00:00 </el-form-item>
            <el-form-item label="信道:" prop="tennle">
              <el-select v-model="WifiBasciForm.tennle" placeholder="请选择">
                <el-option label="2412MHz (Channel 1)" value="0" />
                <el-option label="2417MHz (Channel 2)" value="1" />
                <el-option label="2422MHz (Channel 3)" value="2" />
                <el-option label="2427MHz (Channel 4)" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="操作模式:" prop="caozuo">
              <el-radio-group v-model="WifiBasciForm.caozuo">
                <el-radio label="Mixed Mode" />
                <el-radio label="Green Field" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="信道带宽:" prop="xindao">
              <el-radio-group v-model="WifiBasciForm.xindao">
                <el-radio label="20MHz" />
                <el-radio label="20/40MHz" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="加密类型:" prop="jiami">
              <el-select v-model="WifiBasciForm.jiami" placeholder="请选择">
                <el-option label="WEP" value="0" />
                <el-option label="WEP/WEP2" value="1" />
                <el-option label="付费专享" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="默认密匙:">
              <el-input :span="3" v-model="WifiBasciForm.name" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="加密规则:" prop="guize">
              <el-radio-group v-model="WifiBasciForm.guize">
                <el-radio label="AES" />
                <el-radio label="TKIP" />
                <el-radio label="TKIP&AES" />
              </el-radio-group>
            </el-form-item>
            <el-alert type="info" show-icon :closable="false">
              <p>
                注意： 无线安全设置 802.11n
                标准只定义了Open-None（Disable）,WPA-个人-AES,WPA2-个人-AES这
                3种标准加密模式,其它加密方式为非标准,不同厂商之间可能会有兼容性问题。
                Tenda对无线加密进行了优化，选择WPA中AES加密方式，可有效防止蹭网。
              </p>
            </el-alert>
            <el-form-item label="基本数据速率:" prop="stard">
              <el-select v-model="WifiBasciForm.stard" placeholder="请选择">
                <el-option label="1-2Mbps" value="0" />
                <el-option label="Default(1-2-5.5-11 Mbps)" value="1" />
                <el-option label="All(1-2-5.5-6-11-12-24 Mbps)" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="BG保护模式:" prop="bgPro">
              <el-select v-model="WifiBasciForm.bgPro" placeholder="请选择">
                <el-option label="自动" value="0" />
                <el-option label="开启" value="1" />
                <el-option label="关闭" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="Beacon间隔(ms):" prop="beacon">
              <el-input
                :span="3"
                v-model="WifiBasciForm.beacon"
                placeholder="请输入间隔"
              />
            </el-form-item>
            <el-form-item label="Fragment阀值:" prop="fragment">
              <el-input
                :span="3"
                v-model="WifiBasciForm.fragment"
                placeholder="请输入间隔"
              />
            </el-form-item>
            <el-form-item label="RTS门限:" prop="rts">
              <el-input :span="3" v-model="WifiBasciForm.rts" placeholder="请输入间隔" />
            </el-form-item>
            <el-form-item label="TX功率:" prop="tx">
              <el-input :span="3" v-model="WifiBasciForm.tx" placeholder="请输入间隔" />
            </el-form-item>
            <el-form-item label="WMM Capable:" prop="wmm">
              <el-radio-group v-model="WifiBasciForm.wmm">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="APSD Capable:" prop="apsd">
              <el-radio-group v-model="WifiBasciForm.apsd">
                <el-radio label="开启" />
                <el-radio label="关闭" />
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitAdd">立即提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
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
