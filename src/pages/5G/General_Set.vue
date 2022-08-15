<script>
import utils from "../../public/utils.js";
import $ from 'jquery';
import axios from "axios";
import { h } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  data() {
    return {};
  },
  mounted: function () {},
  methods: {
    filter : function(value){
      value = value.replace("#","%23")
                   .replace("%","%25")
                   .replace("&","%26")
                   .replace("+","%2B")
                   .replace("//","%2F")            
                   .replace("=","%3D")
                   .replace("?","%3F");
      return value
    },
    nin_commond: function(e){
      let _self = this;
      e=this.filter(e);
      axios({
        method : 'GET',
        url : 'http://localhost:8888/dz/ECommond?commond='+e,
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function(data){
          let dt=data.data.data[0].result.replace(/[\r\n]/ig," ").split(' ').filter(s => $.trim(s).length > 0);
          if(dt[0] == "AT&W0"){
            dt[2]="ok";
            dt.shift();
            dt.pop();
          }else{
            dt.shift();
            dt.pop();
          }
          _self.$alert(dt,'命令所执行结果',{
              confirmButtonText:'确定'
          });
      });
    },
    tin_commond: function(e){
      let _self = this;
      e=this.filter(e);
      if(e == "AT%2BQNWPREFCFG%3D\"nsa_nr5g_band\""){
        //先获取现在的值
        axios({
          method : 'GET',
          url : 'http://localhost:8888/dz/ECommond?commond='+e,
          headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        }).then(function(data){
          console.log(data.data.data[0])
          _self.$alert(
                '<select name="nr5g" >'+
                    '<option value="1">1</option>'+
                    '<option value="2">2</option>'+
                    '<option value="3">3</option>'+
                    '<option value="5">5</option>'+
                    '<option value="7">7</option>'+
                    '<option value="8">8</option>'+
                    '<option value="12">12</option>'+
                    '<option value="20">20</option>'+
                    '<option value="25">25</option>'+
                    '<option value="28">28</option>'+
                    '<option value="38">38</option>'+
                    '<option value="40">40</option>'+
                    '<option value="41">41</option>'+
                    '<option value="48">48</option>'+
                    '<option value="66">66</option>'+
                    '<option value="71">71</option>'+
                    '<option value="77">77</option>'+
                    '<option value="78">78</option>'+
                    '<option value="79">79</option>'+
                '</select>'
          ,'NSA频段设置',{
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            callback: action => {
               axios({
                  method : 'GET',
                  url : 'http://localhost:8888/dz/ECommond?commond='+e,
                  headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
                  }).then(function(data){
                    console.log("sss")
                  })
            }
          })
        });
      }
    },
    rin_commond: function(e){
      utils.showsuccess("你点击的rin方法哦 "+e);
    }
  },
};
</script>
<template>
   <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span>5G模块基本设置</span></h4>
        <hr />
        <br />
        <div class="site-demo-el-button" id="layerDemo" style="margin-bottom: 0">
          <!-- <el-button data-method="nin_commond" class="elementui-btn" value="AT+GMI">制造商(2.2)</el-button> 
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+GMM">芯片模式(2.3)</el-button>-->
          <el-button data-method="nin_commond" class="elementui-btn" @click="nin_commond('AT\+GMR')"
            >MT固件版本(2.4)</el-button
          >
          <el-button data-method="nin_commond" class="elementui-btn" @click="nin_commond('AT&F0')"
            >恢复默认命令(2.10)</el-button
          >
          <el-button data-method="nin_commond" class="elementui-btn" @click="nin_commond('AT&V')"
            >at配置表(2.11)</el-button
          >
          <el-button data-method="nin_commond" class="elementui-btn" @click="nin_commond('AT&W0')"
            >保存配置表(2.12)</el-button
          >
          <el-button data-method="nin_commond" class="elementui-btn" @click="nin_commond('AT+CPAS')"
            >设备活动状态(3.1)</el-button
          >
          <el-button data-method="rin_commond" class="elementui-btn" @click="rin_commond('AT+QSIMDET?')"
            >sim卡热插拔(4.9)</el-button
          >
          <el-button data-method="rin_commond" class="elementui-btn" @click="rin_commond('AT+CTZU?')"
            >自动时区更新(5.6)</el-button
          >
          <!-- <el-button data-method="rin_commond" class="elementui-btn" value="AT+QSIMSTAT?" style="margin-top: 10px;margin-left: 0px;">sim卡状态报告(4.10)</el-button> -->
        </div>

        <!-- --------------------------------------------------------5G网络-------------------------------------------------------------------------- -->

        <br /><br /><br />
        <h4><span>5G模块网络设置</span></h4>
        <hr />
        <br />
        <div class="site-demo-el-button" id="layerDemo">
          <!-- <el-button data-method="rin_commond" class="elementui-btn" value="AT+COPS?">运营商选择(5.1)</el-button> 
                    <el-button data-method="rin_commond" class="elementui-btn" value="AT+CREG?">网络注册状态(5.2)</el-button>-->
          <el-button
            data-method="nin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="nin_commond('AT+QENG=&quot;SERVINGCELL&quot;')"
            >信号质量报告(5.3)</el-button>&ensp;
          <!-- <el-button data-method="tin_commond" class="elementui-btn" value="AT+CPOL=">首选操作员列表(5.4)</el-button> -->
          <!--返回的数据过多需处理 
                        <el-button data-method="nin_commond" class="elementui-btn" value="AT+COPN">读取操作员信息(5.5)</el-button> 
                    -->
          <!-- <el-button data-method="rin_commond" class="elementui-btn" value="AT+CTZR?">时区报告(5.7)</el-button> 
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QNWINFO">查询互联网信息(5.9)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QENG=&quot;servingcell&quot;" style="margin-top: 10px;margin-left: 0px;">查询服务区信息(5.11)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QENG=&quot;neighbourcell&quot;" style="margin-top: 10px;">查询临近区信息(5.11-2)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QENDC" style="margin-top: 10px;margin-left: 0px;">查询EN-DC(5.13)</el-button> -->
          <el-button
            data-method="rin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="rin_commond('AT+QNWCFG=&quot;cdrx&quot;')"
            >节能模式(5.14.1)</el-button>&ensp;
          <el-button
            data-method="rin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="rin_commond('AT+QNWCFG=&quot;csi_ctrl&quot;')"
            >信道侦听(5.14.2)</el-button>&ensp;
          <el-button
            data-method="nin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="nin_commond('AT+QNWCFG=&quot;lte_csi&quot;')"
            >CDRX功能-查询LTE CSI信息(5.14.3)</el-button>&ensp;
          <el-button
            data-method="nin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="nin_commond('AT+QNWCFG=&quot;nr5g_csi&quot;')"
            >CDRX功能-查询5G NR CSI信息(5.14.4)</el-button>&ensp;
          <!-- <el-button data-method="rin_commond" class="elementui-btn" value="AT+QNWCFG=&quot;data_path_ctrl&quot;" style="margin-top: 10px;margin-left: 0px;">CDRX功能-在NSA网络下监视用户数据(5.14.5)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QNWCFG=&quot;data_path&quot;" style="margin-top: 10px;margin-left: 0px;">CDRX功能-在NSA网络下查询用户数据路径(5.14.6)</el-button> 
                    <el-button data-method="tin_commond" class="elementui-btn" value="AT+QNWPREFCFG=&quot;gw_band&quot;" style="margin-top: 10px;margin-left: 0px;">QNWPREFCFG功能-WCDMA频段配置(5.15.1)</el-button>
                    <el-button data-method="tin_commond" class="elementui-btn" value="AT+QNWPREFCFG=&quot;lte_band&quot;" style="margin-top: 10px;margin-left: 0px;">QNWPREFCFG功能-LTE频段配置(5.15.2)</el-button>-->
          <el-button
            data-method="tin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="tin_commond('AT+QNWPREFCFG=&quot;nsa_nr5g_band&quot;')"
            >QNWPREFCFG功能-NSA 5G NR频段配置(5.15.3)</el-button>&ensp;
          <el-button
            data-method="tin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="tin_commond('AT+QNWPREFCFG=&quot;nr5g_band&quot;')"
            >QNWPREFCFG功能-5G NR频段配置(5.15.4)</el-button>&ensp;
          <el-button
            data-method="rin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="rin_commond('AT+QNWPREFCFG=&quot;mode_pref&quot;')"
            >QNWPREFCFG功能-网络搜寻模式配置(5.15.5)</el-button>&ensp;
          <!-- <el-button data-method="rin_commond" class="elementui-btn" value="AT+QNWPREFCFG=&quot;srv_domain&quot;" style="margin-top: 10px;margin-left: 0px;">QNWPREFCFG功能-服务域配置(5.15.6)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" value="AT+QNWPREFCFG=&quot;voice_domain&quot;" style="margin-top: 10px;margin-left: 0px;">QNWPREFCFG功能-语音域配置(5.15.7)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" value="AT+QNWPREFCFG=&quot;roam_pref&quot;" style="margin-top: 10px;margin-left: 0px;">QNWPREFCFG功能-漫游配置(5.15.8)</el-button> -->
          <el-button
            data-method="rin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="rin_commond('AT+QNWPREFCFG=&quot;ue_usage_setting&quot;')"
            >QNWPREFCFG功能-UE使用设置(5.15.9)</el-button>&ensp;
          <el-button
            data-method="nin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="nin_commond('AT+QNWPREFCFG=&quot;policy_band&quot;')"
            >QNWPREFCFG功能-读取载波策略带(5.15.10)</el-button>&ensp;
          <el-button
            data-method="nin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="nin_commond('AT+QNWPREFCFG=&quot;ue_capability_band&quot;')"
            >QNWPREFCFG功能-UE容量带宽(5.15.11)</el-button>&ensp;
          <!-- <el-button data-method="rin_commond" class="elementui-btn" value="AT+QNWPREFCFG=&quot;rat_acq_order&quot;" style="margin-top: 10px;margin-left: 0px;">QNWPREFCFG功能-RAT优先级配置(5.15.12)</el-button> -->
          <el-button
            data-method="rin_commond"
            class="elementui-btn"
            style="margin-top: 10px; margin-left: 0px"
            @click="rin_commond('AT+QNWPREFCFG=&quot;nr5g_disable_mode&quot;')"
            >QNWPREFCFG功能-5G NR配置(5.15.13-注:此配置可能会断网)</el-button>&ensp;
        </div>

        <!-- --------------------------------------------------------5G硬件-------------------------------------------------------------------------- 

                <br><br><br>
                <h4><span>5G模块硬件设置</span></h4>
                <hr>
                <br>
                <div class="site-demo-el-button" id="layerDemo" style="margin-bottom: 0;">
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+CCLK?">获取模块时间(12.2)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QADC=0">获取ADC 0频道电压(12.3.1)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QADC=1">获取ADC 1频道电压(12.3.2)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" value="AT+QTEMP">获取MT模块温度(12.5)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" value="AT+QAGPIO=?">设置AP/PMU GPIO的输出功率(12.6)</el-button>
                    <el-button data-method="nin_commond" class="elementui-btn" style="margin-top: 10px;margin-left: 0px;" value="AT+QETH=&quot;mac_address&quot;">查询RGMII MAC地址(12.7.4)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" style="margin-top: 10px;margin-left: 0px;" value="AT+QETH=&quot;speed&quot;">RGMII速度配置(12.7.5)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" style="margin-top: 10px;margin-left: 0px;" value="AT+QETH=&quot;an&quot;">RGMII自动协商(12.7.6)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" style="margin-top: 10px;margin-left: 0px;" value="AT+QETH=&quot;dm&quot;">RGMII双工模式(12.7.7)</el-button>
                    <el-button data-method="rin_commond" class="elementui-btn" style="margin-top: 10px;margin-left: 0px;" value="AT+QSLIC?">SLIC是否启用(12.8)</el-button>
                </div>-->
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
h4 {
  padding: 20px;
}
h4 span {
  color: #0084e9;
}
</style>
