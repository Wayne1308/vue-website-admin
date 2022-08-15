<script>
import utils from "../public/utils.js";
import MenuBar from "./Menu.vue";
import UserInfo from "../pages/system/UserInfo.vue";
import UserForm from "../pages/system/UserForm.vue";
import ChangePwd from "./ChangePwd.vue";

import {
  ArrowDown,
  Search,
  SwitchButton,
  UserFilled,
  QuestionFilled,
  User,
} from "@element-plus/icons-vue";

export default {
  props: ["userinfo"],
  data() {
    return {
      dicts: [],
      islogin: utils.islogined(),
    };
  },
  components: {
    MenuBar,
    ArrowDown,
    Search,
    SwitchButton,
    UserFilled,
    QuestionFilled,
    User,
    UserInfo,
    UserForm,
    ChangePwd,
  },
  methods: {
    /**
     * 登出系统
     */
    logout: function () {
      var that = this;
      utils.confirm("确认", "确定要退出系统码？", function (res) {
        if (res != "success") {
          return;
        }
        utils.logout(function (res) {
          if (res == "success") {
            //发出退出登录事件
            that.$emit("loginout", {}); //通知界面登录了
          }
        });
      });
    },
    search: function () {
      utils.showerror("待开发");
    },
    help: function () {
      utils.showerror("待开发");
    },
    toinfo: function (row) {
      this.$refs.info.show(row);
    },
    toform: function (row) {
      this.$refs.form.show(row);
    },
    addsuccess: function (data) {
      //
    },
    handleCommand: function (commond) {
      if (commond == "userinfo") {
        this.toinfo(this.userinfo);
      }
      if (commond == "changepwd") {
        this.$refs.pwd.show();
      }
    },
  },
};
</script>

<template>
  <el-container class="container top_bar">
    <el-header
      ><el-row>
        <el-col :span="19">
          <div
            style="
              width: 250px;
              background: #000;
              color: #fff;
              font-size: 20px;
              text-align: center;
              height: 60px;
              line-height: 60px;
              letter-spacing: 3px;
              background-image: -webkit-linear-gradient(right, #9c27b0, #3a8ee6, #ff5722);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
            "
          >
              定制版
          </div>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col :span="5">
              <div class="top_btn" @click="search">
                <el-icon :size="14">
                  <Search />
                </el-icon>
                <span class="">搜索</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="top_btn" @click="help">
                <el-icon :size="14">
                  <QuestionFilled />
                </el-icon>
                <span>帮助</span>
              </div>
            </el-col>
            <el-col :span="7">
              <el-dropdown @command="handleCommand">
                <div class="top_btn">
                  <el-icon :size="14">
                    <UserFilled />
                  </el-icon>
                  <span>{{ userinfo ? userinfo.name : "未知" }}</span>
                  <el-icon class="el-icon--right">
                    <ArrowDown></ArrowDown>
                  </el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="userinfo" :icon="User"
                      >个人信息</el-dropdown-item
                    >
                    <el-dropdown-item command="changepwd" :icon="User"
                      >修改密码</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
            <el-col :span="6">
              <div class="top_btn" @click="logout">
                <el-icon :size="14">
                  <SwitchButton />
                </el-icon>
                <span>退出</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row></el-header
    >
  </el-container>
  <el-container>
    <el-aside width="250px" class="menubar" v-if="islogin">
      <MenuBar></MenuBar>
    </el-aside>
    <el-main>
      <router-view @logined="logined" :userinfo="userinfo" style=""></router-view>
    </el-main>
  </el-container>

  <UserForm ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></UserForm>
  <UserInfo ref="info" @edit="toform" :dicts="dicts"></UserInfo>
  <ChangePwd ref="pwd"></ChangePwd>
</template>

<style scoped="scoped">
.top_bar {
  background: #fff;
  height: 60px;
  color: #000;
}

.top_btn {
  cursor: pointer;
  line-height: 60px;
  text-align: center;
  color: #000;
}

.top_btn i {
  position: relative;
  top: 2px;
}

.top_btn span {
  margin-left: 10px;
}

.top_btn:hover {
  color: #409eff;
}
</style>
