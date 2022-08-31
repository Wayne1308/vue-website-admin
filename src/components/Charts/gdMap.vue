<template>
  <div class="gd-map-container">
    <div id="container"></div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader';
let map = shallowRef(null);
onMounted(() => {
  AMapLoader.load({
    key: "a7e02678c02373c5e3bcd24674ad104f",             // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    map = new AMap.Map("container", {  //设置地图容器id
      viewMode: "3D",    //是否为3D地图模式
      zoom: 5,           //初始化地图级别
      center: [105.602725, 37.076636], //初始化地图中心点位置
    });
  }).catch(e => {
    console.log(e);
  })


  // AMapLoader.load({
  //   "key": "",              // 申请好的Web端开发者Key，首次调用 load 时必填
  //   "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  //   "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  // }).then((AMap) => {
  //   console.log('map', map, AMap);
  //   map = new AMap.Map('container', {
  //     resizeEnable: true, //是否监控地图容器尺寸变化
  //     zoom: 11, //初始化地图层级
  //     center: [116.397428, 39.90923], //初始化地图中心点
  //     mapStyle: 'amap://styles/063dba129042bbf34074819b49e8b4f8'
  //   });
  // }).catch(e => {
  //   console.log(e);
  // })
})
</script>

<style lang="less" scoped>
.gd-map-container {
  height: 100%;
  width: 100%;
  padding-bottom: 20px;
  background-color: #ffffff;
}
</style>