<script>
import utils from "../public/utils.js";
import $ from "jquery";
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      loginPanelWidht: 400,
      loginPanelHeight: 350,
      panelTop: "20%",
      panelLeft: "30%",
      loginForm: {
        account: "admin",
        password: "123456",
        name: "管理员",
        role: {
          id: 1,
          name: "系統管理員",
        },
        remeberme: false,
      },
      rules: {
        account: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created: () => {},
  mounted: function () {
    if (utils.islogined()) {
      //已登录，自动转到主页
      this.$router.push("Index");
      return;
    }
    this.panelTop = ($(window).height() - this.loginPanelWidht) / 2 + "px";
    this.panelLeft = ($(window).width() - this.loginPanelHeight) / 2 + "px";
  },
  methods: {
    submitForm: function () {
      var that = this;

      utils.showloadding();

      if (!this.$refs.loginFormRef.validate()) {
        utils.hiddenloadding();
        //提示异常
        utils.showerror("数据不合法，无法登录。");
        return;
      }
      utils.login(this.loginForm, function (res) {
        utils.hiddenloadding();
        if (res == "success") {
          that.$emit("logined", {}); //通知界面登录了
          that.$router.push("Index");
        }
      });
    },
  },
};
</script>
<template>
  <div>
    <img src="../assets/bg.png" class="bg_img" />
    <div class="login_panel">
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>
      <div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="loginForm"
        >
          <el-form-item label="账号:" prop="account">
            <el-input v-model="loginForm.account" size="large" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="loginForm.password"
              size="large"
              placeholder="请输入密码"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="记住我">
            <el-switch v-model="loginForm.remeberme" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click="submitForm()"
              style="width: 100%; border-radius: 30px"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">Copyright © 2011-2022 定制板</div>
  </div>
</template>

<style scoped="scoped">
html,
body {
  overflow: hidden;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  z-index: 1;
  color: #fff;
  text-align: center;
}

.bg_img {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}

.login_panel {
  position: fixed;
  top: v-bind(panelTop);
  left: v-bind(panelLeft);
  z-index: 1;
  width: v-bind(loginPanelWidht + "px");
  height: v-bind(loginPanelHeight + "px");
  background: #fff;
  border: 1px solid #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.logo {
  height: 80px;
  padding-top: 30px;
  text-align: center;
}

.loginForm {
  padding-right: 80px;
}
</style>
