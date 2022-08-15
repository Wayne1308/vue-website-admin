<script>
import utils from "../public/utils.js";
import api from "../public/api.js";
import config from "../public/config.js";
import $ from "jquery";
import * as echarts from "echarts";

var _self;
export default {
  data() {
    return {
      sys: {
        //WAN口状态
        WAN: null,
        SubNetMask:null,
        TxPackage: null,
        RxPackage:null,
        MTU:null,
        MAC:null,
        ConnectionTime:null,
        //5G模块状态
        FG_ConnectionState:null,
        FG_SIMState:null,
        FG_InternetIF:null,
        FG_CSIIF:null,
        FG_ModuleTime:null,
        FG_TMP:null,
        FG_RGMII_Mac:null,
        FG_SignalIntensity:null,
      },

    };
  },
  mounted() {
    _self=this;
    this.getData();
  },
  methods: {
    // 通过后台获取数据
    getData() {
      $.ajax({
        url: "http://localhost:8888/dz/ICommond",
        type: "POST",
        dataType: "json",
        success(res) {
          console.log(res);
          //获取本地json数据：WAN口状态
          _self.sys.WAN = res.data[0].ipwan;
          _self.sys.SubNetMask = res.data[0].subnetMask;
          _self.sys.TxPackage = res.data[0].txPackage;
          _self.sys.RxPackage = res.data[0].rxPackage;
          _self.sys.MTU = res.data[0].mtu;
          _self.sys.MAC = res.data[0].mac;
          _self.sys.ConnectionTime = res.data[0].date;
          //获取本地json数据：5G模块
          _self.sys.FG_ConnectionState = res.data[2].at_QNWINFO;
          _self.sys.FG_SIMState = res.data[2].qsimstat;
          _self.sys.FG_RGMII_Mac = res.data[2].at_mac_address.replaceAll("\"","").replaceAll("mac_address,","").match("(?<=QETH:).*");
          _self.sys.FG_CSIIF = res.data[2].at_QNWCFG.replaceAll("\"","").replaceAll("lte_csi,","").match("(?<=QNWCFG:).*");
          _self.sys.FG_SignalIntensity = res.data[2].at_csq.match("(?<=CSQ:).*");
          _self.sys.FG_ModuleTime = res.data[2].at_CCLK.replaceAll("\"","").match("(?<=CCLK:).*");
          _self.sys.FG_TMP = res.data[2].at_QTEMP.replaceAll("\"", "").replaceAll("qfe_wtr_pa0,", "").match("(?<=QTEMP:).*") + "℃";
        },
      });
    },
  }
}

</script>



<template>

  <!--      WAN口状态-->
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="hover">
        <div><h4><span>WAN口状态</span></h4></div>
        <hr/>
        <br/>
        <div class="element-container">
          <div class="element-main">
              <el-form
                  :model="sys"
                  ref="SysStatusForm"
                  label-width="120px"
                  style="max-width: 460px"
              >
                <el-form-item label="连接状态:"> 已连接 </el-form-item>
                <el-form-item label="WAN IP:"> {{sys.WAN}}</el-form-item>
                <el-form-item label="子网掩码:"> {{sys.SubNetMask}}  </el-form-item>
                <el-form-item label="网关:"> * </el-form-item>
                <el-form-item label="连接方式:">动态IP</el-form-item>
                <el-form-item label="物理地址:"> {{sys.MAC}} </el-form-item>
                <el-form-item label="已发包(TX):"> {{sys.TxPackage}} </el-form-item>
                <el-form-item label="已收包(RX):"> {{sys.RxPackage}} </el-form-item>
                <el-form-item label="最大传输单元:">{{sys.MTU}}</el-form-item>
                <el-form-item label="连接时间:">{{sys.ConnectionTime}}</el-form-item>
              </el-form>
          </div>
        </div>
      </el-card>
    </el-col>


    <!--      5G模块状态-->
    <el-col :span="8">
      <el-card shadow="hover">
        <h4><span>5G模块状态</span></h4>
        <hr/>
        <br/>
        <div class="element-container">
          <div class="element-main">
            <div class="section">
                <el-form
                    :model="sys"
                    ref="SysStatusForm"
                    label-width="120px"
                    style="max-width: 460px"
                >
                  <el-form-item label="连接状态:"> 已连接 </el-form-item>
                  <el-form-item label="sim卡状态:"> 已插入 </el-form-item>
                  <el-form-item label="互联网信息:"> oService </el-form-item>
                  <el-form-item label="CSI信息:"> {{sys.FG_CSIIF}}  </el-form-item>
                  <el-form-item label="模块时间:"> {{sys.FG_ModuleTime}} </el-form-item>
                  <el-form-item label="模块温度:"> {{sys.FG_TMP}}</el-form-item>
                  <el-form-item label="RGMIIMAC地址:"> {{sys.FG_RGMII_Mac}} </el-form-item>
                  <el-form-item label="信号强度:">{{sys.FG_SignalIntensity}} </el-form-item>
                </el-form>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>

    <!--信息-->
    <el-col :span="8">
      <el-card shadow="hover">
        <h4><span>信息</span></h4>
        <hr/>
        <br/>
        <div class="element-container">
          <div class="element-main">
            <div class="section">

                <el-form
                    :model="sys"
                    ref="SysStatusForm"
                    label-width="120px"
                    style="max-width: 460px"
                >
                  <el-form-item label="运行时间:"> undefined </el-form-item>
                  <el-form-item label="系统时间:"> 无 </el-form-item>
                  <el-form-item label="系统版本:"> SR1.1 </el-form-item>
                </el-form>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>







<style>

</style>
