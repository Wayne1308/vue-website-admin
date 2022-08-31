<template>
  <div class="show-container">
    <div id="WebGL-output"></div>
  </div>
</template>


<script setup>
  import { onMounted } from 'vue';
  import { renderBoot } from './js/init'
  onMounted(() => {
    renderBoot()
  })
</script>

<style lang="less" scoped>
  @import url('./css/style.css');
  
  .show-container {
    height: 100%;
    width: 100%;
    padding-bottom: 20px;
    background-color: #ffffff;
  }
  #WebGL-output {
    height: 100%;
    width: 100%;
    background: url('./objs/ball.jpg') center / cover no-repeat;
    overflow: hidden;
  }
</style>