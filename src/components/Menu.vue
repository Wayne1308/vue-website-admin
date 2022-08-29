<template>
  <div class="logo-container">
    <img src="../assets/logo.png" alt="logo">
    <span class="logo-text">定制版</span>
  </div>
  <!-- 左侧菜单栏 -->
  <el-menu
    class="menubar"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    mode="vertical"
    :default-active="0"
    menu-trigger="click"
    router="true"
    unique-opened="true"
    style="width: 100%"
  >
    <div v-for="(item, index) in datas" :key="item.id">
      <el-menu-item
        v-if="!item.childrens || item.childrens.length <= 0"
        :index="item.id"
        :route="item.url"
      >
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span style="flex: 1">{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item.childrens && item.childrens.length > 0" :index="item.id">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
          <el-icon> </el-icon>
        </template>
        <el-menu-item-group
          title=""
          v-for="(subitem, index_) in item.childrens"
          :key="subitem.id"
        >
          <el-menu-item :index="subitem.id" :route="subitem.url">
            <el-icon>
              <component :is="subitem.icon"></component>
            </el-icon>
            <span>{{ subitem.name }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </div>
  </el-menu>
</template>
<script>
//动态加载菜单数据，并展示
import utils from "../public/utils.js";
import api from "../public/api.js";

import {
  House,
  List,
  View,
  TakeawayBox,
  Tickets,
  UserFilled,
  Avatar,
  Connection,
  Dessert,
  Setting,
  User,
  Open,
  Operation,
  Postcard,
  SetUp,
} from "@element-plus/icons-vue";

import { useStore } from "vuex";

export default {
  components: {
    House,
    List,
    View,
    TakeawayBox,
    Tickets,
    UserFilled,
    Avatar,
    Connection,
    Dessert,
    Setting,
    User,
    Open,
    Operation,
    Postcard,
    SetUp,
  },
  data() {
    return {
      datas: [],
      selectmenu: 1,
      collapseTransition: false,
    };
  },
  computed: {
  },
  mounted: function () {
    var that = this;
    this.loadData(function (res) {
      if (!res || res.status != 200) {
        utils.showerror("加载失败");
      }
      if (!res.data) {
        utils.showerror("数据为空");
      }
      that.datas = res.data;
      //获取当前url中的地址，并自动选中对应菜单
      var curpath = that.$route.name;
      that.datas.forEach(function (item, index) {
        if (item.name == curpath) {
          that.selectmenu = item.id;
        }
        for (var i = 0; i < item.childrens.length; i++) {
          if (item.childrens[i].name == curpath) {
            that.selectmenu = item.childrens[i].id;
          }
        }
      });

    });
  },
  methods: {
    loadData: function (callback) {
      api.loadMenu(callback);
    },
    handleOpen: function () {},
    handleClose: function () {},
    openPage: function (menu) {
      this.$router.push(menu.url);
    },
  },
};
</script>

<style lang="less" scoped>
.logo-container {
  width: 100%;
  height: 60px;
  background-color: #1b8ffe;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 20px;
  }

  .logo-text {
    background: #000;
    color: #fff;
    font-size: 20px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    letter-spacing: 3px;
    background-image: -webkit-linear-gradient(right, #9c27b0, #ff5722);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
}

</style>
<style lang="less">
@hover-bg-color: #e6f7ff!important;
@color: #666666!important;
@active-bg-color: #e6f7ff!important;

.menubar.el-menu {
  height: 100vh;
  background-color: #FFFFFF!important;
  font-weight: 600;

  .el-menu-item {
    color: @color;

    &:hover {
      background-color: @hover-bg-color;
    }

    &.is-active {
      background-color: @active-bg-color;
      border-right: 3px solid #3787c7;
    }
  }

  .el-sub-menu {

    &.is-active.is-opened {

      .el-sub-menu__title {
        color: #3787c6!important;
      }

      // .el-menu-item-group {
      //   background-color: @active-bg-color;
      // }

    }

    .el-sub-menu__title:hover {
      background-color: @hover-bg-color;
    }

    &:hover {
      background-color: @hover-bg-color;
    }
    
  }

  .el-sub-menu__title, .el-menu-item-group {
    color: @color;
    background-color: #FFFFFF!important;
  }
}

</style>

