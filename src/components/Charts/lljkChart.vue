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
              show: false,
              left: 50,
              right: 50,
              top: 10,
              bottom: 50
          },
          color: ['#65936c', '#ca8651'],
          legend: {
            show: true,
            right: 'center',
            bottom: '0',
          },
          xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                  lineStyle: {
                    color: '#c6af87',
                    width: 2
                  }
                },
                axisLabel: {
                  show: true,
                  color: '#828282'
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
          series: [
            {
              name: '下行',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true
            },
            {
              name: '上行',
              data: [100, 200, 500, 1000, 1000, 900, 600],
              type: 'line',
              smooth: true
            },
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