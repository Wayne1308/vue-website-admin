<template>
  <echart :option="chartData"></echart>
</template>

<script>
import { defineComponent } from 'vue'
import utils from "@/public/utils.js";
import api from "@/public/api.js";
import $ from 'jquery';
import echart from './echart.vue'

export default defineComponent({
  name: 'ringChart',
  components: {
      echart
  },
  props: {
      title: {
          type: String,
          default: 'title'
      }
  },
  setup(props, { emit }) {

      const chartData = {
          grid: {
              // show: false,
              // left: 10,
              right: 100,
              // top: 10,
              // bottom: 10
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            right: '0',
            top: 'center',
            orient: 'vertical'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              right: 150,
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
      }
      return {
          chartData
      }
  }
})
</script>

<style lang="less" scoped>

</style>