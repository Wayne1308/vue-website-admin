<template>
  <!-- 左侧菜单栏 -->
  <el-menu
    class="menubar"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    mode="vertical"
    :default-active="selectmenu"
    menu-trigger="click"
    router="true"
    :collapse-transition="collapseTransition"
    collapse="true"
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
<style>
.menubar {
  height: 1000px;
  line-height: 60px !important;
}
.el-menu--horizontal {
  border-bottom: none !important;
}
.el-menu-item-group {
  height: 56px !important;
  line-height: 56px !important;
}
.el-menu-item {
  height: 60px !important;
  line-height: 60px !important;
}
.el-menu-item-group .el-menu-item {
  height: 36px !important;
  line-height: 36px !important;
}
.el-sub-menu {
  height: 60px !important;
  line-height: 60px !important;
}
.el-sub-menu__title {
  height: 60px !important;
  line-height: 60px !important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #409eff !important;
}
</style>

