<template>
    <div class="rollingIntroduction-container">
      <div class="rolling-menu" @click="selectMenu">
        <div class="menu-item" :class="selectMenuIndex == i ?'active': ''" v-for="(item, i) in introductData" :key="i">
          <span class="btn" :data-index="i">{{ item.title }}</span>
        </div>
      </div>
      <div class="introduction-content">
        <p>
          {{ introductData[selectMenuIndex].content }}
        </p>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
const props = defineProps({
  introductData: {
    type: Array,
    default: () => {
      return [
        {
          title: '简介',
          content: `简介content简介content简介content简介content简介content简介content简介content简介content`
        },
        {
          title: '研究方向',
          content: `研究方向content研究方向content研究方向content研究方向content研究方向content`
        },
        {
          title: '实际应用',
          content: `实际应用content`
        }
      ]
    }
  }
})

let selectMenuIndex = ref(0)
const selectMenu = (e) => {
  if(!isNaN(Number(e.target.dataset.index))) {
    selectMenuIndex.value = Number(e.target.dataset.index)
  }
}
</script>
  
<style lang="less" scoped>
  .rollingIntroduction-container {
    width: 100%;
    height: 100%;
    display: flex;
    // border: 1px solid blue;

    .rolling-menu {
      box-sizing: border-box;
      width: 30%;
      height: 100%;
      display: inline-block;
      margin: 0;
      // border-right: 1px solid #1a4ed7;
      position: relative;
      overflow-y: scroll;

      &::-webkit-scrollbar { 
        width: 0 !important 
      }

      // border: 1px solid red;

      .menu-item {
        height: 4em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 1px solid red;
        position: relative;

        &:after {
          content: '';
          width: 10px;
          height: 10px;
          background-color: #ffffff;
          border-radius: 50%;
          position: absolute;
          border: 1px solid #24c4ff;
          right: 0;
          z-index: 10;
        }

        &.active:after {
          background-color: #24c4ff;
        }


        span.btn {
          display: inline-flex;
          height: 30px;
          width: 80px;
          justify-content: center;
          align-items: center;
          background-color: #1679f1;
          border-radius: 5px;
          color: #ffffff;
          cursor: pointer;
        }
      }

      .active span.btn {
          background-color: #22bffa;
        }

    }
    .introduction-content {
      width: 70%;
      height: 100%;
      display: inline-block;
      position: relative;
      color: #ffffff;
      padding: 20px;
      // border: 1px solid green;

      &:before {
        content: '';  
        width: 1px;
        height: 100%;
        background-color: #1a4ed7;
        position: absolute;
        top: 0;
        left: -6px;
      }
    }
  }
</style>