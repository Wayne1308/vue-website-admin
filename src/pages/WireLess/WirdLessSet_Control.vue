<script>
export default {
  data() {
    return {
      rules: {
        region: [
          // 我们在el-form-item中绑定的prop，就是这里的name，需要大家注意，这具有唯一性
          { required: true, message: "请输入MTU", trigger: "blur" }, // require:是否必填，如不设置，则会根据校验规则自动生成;message:是提示的内容；trigger：是什么事件触发
        ],
      },
      WifiForm: {
        region: "0",
      },
    };
  },
  mounted: function () {},
  methods: {
    resetForm: function () {
      this.$refs.WifiForm.resetFields();
    },
  },
};
</script>

<template>
  <div class="element-container">
    <div class="element-main">
      <div class="section">
        <h4><span> 无线访问控制</span></h4>
        <hr />
        <br />
        <el-form :model="WifiForm" ref="WifiForm" :rules="rules" label-width="120px">
          <el-form-item label="MAC地址过滤" prop="region">
            <el-select v-model="WifiForm.region">
              <el-option label="关闭" value="0" />
              <el-option label="允许" value="1" />
              <el-option label="禁止" value="2" />
            </el-select>
          </el-form-item>
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
