<template>
  <el-container style="height: 100vh;width: 100vw">
    <!-- 侧边栏 -->
    <el-aside ref="menuContainer" :style="{transform: 'translateX(' + menuTrans + ')', width: menuWidth}" class="menubar widerScreen showMenu">
      <MenuBar></MenuBar>
    </el-aside>
    <!-- 头部 + 主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="top_bar">
        <el-row>
          <el-col :span="19">
            <div class="logo-container">
              <div class="menubar Narrower" v-if="islogin">
                <el-icon :size="20" @click="clickMenuExpand"><Expand /></el-icon>
              </div>
              <div
                  style="
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
            </div>
            <div class='header-left-container'>
              <el-icon :size="100" @click="controlMenu"><Expand v-if="menuWidth === 0" /><Fold v-else /></el-icon>
              <div class="tip-box">
                <div class="tip-box-item">
                  <img src="../assets/header/cpu.png" alt="" srcset="">
                  <span>5%</span>
                </div>
                <div class="tip-box-item">
                  <img src="../assets/header/tempreter.png" alt="" srcset="">
                  <span>55°C</span>
                </div>
                <div class="tip-box-item">
                  <img src="../assets/header/sd.png" alt="" srcset="">
                  <span>8%</span>
                </div>
                <div class="tip-box-item">
                  <img src="../assets/header/down.png" alt="" srcset="">
                  <span>95.00B/s</span>
                </div>
                <div class="tip-box-item">
                  <img src="../assets/header/up.png" alt="" srcset="">
                  <span>134.00B/s</span>
                </div>
                <div class="tip-box-item">
                  <img src="../assets/header/computer.png" alt="" srcset="">
                  <span>1</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <el-row>
              <el-col :span="5">
                <div class="top_btn" @click="search">
                  <el-icon :size="14">
                    <Search />
                  </el-icon>
                  <span class="searchText">搜索</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="top_btn" @click="help">
                  <el-icon :size="14">
                    <QuestionFilled />
                  </el-icon>
                  <span class="helpText">帮助</span>
                </div>
              </el-col>
              <el-col :span="7">
                <el-dropdown @command="handleCommand" style="height: 60px">
                  <div class="top_btn">
                    <el-icon :size="14">
                      <UserFilled />
                    </el-icon>
                    <span class="userInfoText">{{ userinfo ? userinfo.name : "未知" }}</span>
                    <!-- <el-icon class="el-icon--right">
                      <ArrowDown></ArrowDown>
                    </el-icon> -->
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
                  <span class="logoutText">退出</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <div class="main-container">
          <div class="crumbs-nav">
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item :to="{ path: '/chart' }">系统</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, i) in crumbsData" :key="i" :to="{ path: '/Index' }">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main-content">
            <router-view @logined="logined" :userinfo="userinfo" style=""></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <UserForm ref="form" :userinfo="userinfo" @addsuccess="addsuccess"></UserForm>
  <UserInfo ref="info" @edit="toform" :dicts="dicts"></UserInfo>
  <ChangePwd ref="pwd"></ChangePwd>

  <el-drawer
      v-model="drawerMenu"
      :with-header="false"
      direction="ltr"
      custom-class="drawClass"
      :before-close="handleClose"
  >
    <MenuBar></MenuBar>
  </el-drawer>
</template>

<script>
import utils from "../public/utils.js";
import api from "../public/api.js";
import MenuBar from "./Menu.vue";
import UserInfo from "../pages/system/UserInfo.vue";
import UserForm from "../pages/system/UserForm.vue";
import ChangePwd from "./ChangePwd.vue"

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
      crumbsData: [],
      drawerMenu: false,
      menuTrans: 0,
      menuWidth: '200px'
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
  mounted() {
  },
  watch: {
    $route: async function (newV) {
      this.crumbsData = await this.getCrumbsData(newV.name);
      console.log('crumbsData', this.crumbsData);
    }
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
    getCrumbsData: function(curpath) {
      const that = this;
      return new Promise((resolve, reject) => {
        api.loadMenu(function(res) {
          if (!res || res.status != 200) {
          return utils.showerror("加载失败");
          }
          if (!res.data) {
            return utils.showerror("数据为空");
          }
          let selectMenuDeep = []
          res.data.forEach(function (item, index) {
            if (item.name == curpath) {
              that.selectmenu = item.id;
              selectMenuDeep = [item.name]
            }
            for (var i = 0; i < (item.childrens || []).length; i++) {
              if (item.childrens[i].name == curpath) {
                that.selectmenu = item.childrens[i].id;
                selectMenuDeep = [item.name, item.childrens[i].name]
              }
            }
          });
          resolve(selectMenuDeep)
        });
      })
    },
    clickMenuExpand: function() {
      this.drawerMenu = !this.drawerMenu
    },
    controlMenu: function() {
      this.menuTrans = this.menuTrans === 0 ? -200 + 'px' : 0;
      this.menuWidth = this.menuWidth === '200px' ? 0 : '200px';
    }
  },
};
</script>

<style scoped lang="less">
  .top_bar {
    background: #fff;
    height: 60px;
    color: #8b8b8b;
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

  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .crumbs-nav {
      margin-bottom: 20px;
    }

    .main-content {
      height: 100%;
      width: 100%;
    }
  }

  .el-main {
    height: calc(100% - 60px);
    background-color: #f1f2f6;
  }

  .header-left-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    .el-icon {
      height: 20px;
      width: 20px;
      margin: 0 10px;
      cursor: pointer;

      svg {
        height: 20px;
        width: 20px;

      }
    }

    .tip-box {
      height: 100%;
      display: flex;
      align-items: center;

      .tip-box-item {
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 5px;

        img {
          height: 1.25em;
          width: 1.25em;
          margin-right: 2px;
        }
      }
    }
  }
  .showMenu {
    transform: translateX(0);

    transition: 0.5s all;
  }
</style>


<!-- 多端适配 -->
<style lang="less">
  /* 在宽度为 600 像素或更大的屏幕上 */
  @media screen and (min-width: 600px) {
    .logo-container {
      display: none;
    }
  }
  /* 在宽度为 600 像素或更小的屏幕上 */
  @media screen and (max-width: 600px) {
    .drawClass {
      width: 250px!important;
    }
    .el-drawer__body {
      padding: 0!important;
    }

    .searchText, .helpText, .logoutText, .userInfoText {
      display: none;
    }

    .menubar.widerScreen, .logo-title.widerScreen {
      display: none;
    }
    .menubar.Narrower {

    }

    .logo-container {
      height: 60px;
      display: flex;
      align-items: center;

      .menubar.Narrower {
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .header-left-container {
      display: none!important;
    }
  }
</style>