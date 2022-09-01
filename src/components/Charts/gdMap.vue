<template>
  <div id="gdMapContainer"></div>
</template>

<script>
import {onMounted, defineComponent} from 'vue';
import {shallowRef} from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader';
export default defineComponent({
  name: 'gdMap',
  props: {},
  setup() {
    window._AMapSecurityConfig = { securityJsCode: '13f940487ef882cbce7781ca42e3ef46' };
    let map = shallowRef(null);
    const initMap = () => {
      AMapLoader.load({
        key:"a7e02678c02373c5e3bcd24674ad104f",             // 申请好的Web端开发者Key，首次调用 load 时必填
        plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        map = new AMap.Map("gdMapContainer",{  //设置地图容器id
          mapStyle: 'amap://styles/063dba129042bbf34074819b49e8b4f8',
          zoom: 4,           //初始化地图级别
          center:[111.140523,36.453657], //初始化地图中心点位置
        });
      }).catch(e=>{
        console.log(e);
      })
    }
    onMounted(() => {
      //DOM初始化完成进行地图初始化
      initMap()
    })
    return{
      map,
    }
  }
})

</script>

<style lang="less">
#gdMapContainer {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  .amap-logo img {
    display: none;
  }
}
</style>