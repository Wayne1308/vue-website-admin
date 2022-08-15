<script>
import utils from "../../public/utils.js";
import $ from 'jquery';
import axios from "axios";

export default {
  data() {
    return {
      WanForm: {
        mtu: "",
      },
    };
  },
  mounted: function () {
    var _this=this;
    axios.get('http://localhost:8888/dz/Setmtu?mtu=1')
         .then(function(response){
          _this.WanForm.mtu=response.data
         }).catch(function(error){
          console.log(error)
         })
  },
  methods: {
    submitAdd(data) {
      //获取表单数据，并进行验证等
      var mtu = JSON.stringify(this.WanForm.mtu);
      var url = 'http://localhost:8888/dz/Setmtu?mtu='+mtu;
      this.$refs[data].validate((valid) => {
        if(valid){
          axios.get(url)
              .then(function(response){
                utils.showsuccess("修改成功!");
              }).catch(function(response){
                utils.showerror(response);
              })
        }else{
          utils.showerror("error");
          return false;
        }
      });
    },
    resetForm: function () {
      this.$refs.WanForm.resetFields();
    },
  },
};
</script>

<template>
  <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span>WAN口设置</span></h4>
        <hr />
        <br />
        <el-form :model="WanForm" ref="WanForm" label-width="auto" >
          <el-form-item label="Wan口连接类型:">
            <span> 动态IP </span>
          </el-form-item>
          <el-form-item 
            label="MTU" 
            prop="mtu"
            :rules="[
              { required: true,message: 'mtu单元不为空' },
              { type: 'number',message: 'mtu单元必须为数字' }
            ]">
            <el-col :span="4">
              <el-input v-model.number="WanForm.mtu" placeholder="请输入最大传输单元" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAdd('WanForm')">Create</el-button>
            <el-button @click="resetForm('WanForm')">Reset</el-button>
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
.el-form-item__label{
  font-size: 16px;
}
</style>
