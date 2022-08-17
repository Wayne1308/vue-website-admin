<template>
    <echart :option="lineChartOption"></echart>
    <!-- <div id="charts-box"></div> -->
</template>

<script>
import { defineComponent } from 'vue'
import utils from "@/public/utils.js";
import api from "@/public/api.js";
import $ from 'jquery';
import echart from './echart.vue'

export default defineComponent({
    name: 'lineChart',
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

        const lineChartOption = {
            legend: {
                show: false,
            },
            tooltip: {
                show: true
            },
            series: [
                {
                    name: '终端分布',
                    type: 'pie',
                    radius: [10, 70],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 0
                    },
                    label: {
                        show: true,
                        color: 'auto'
                    },
                    labelLine: {},
                    data: [
                        { value: 40, name: '湖南' },
                        { value: 38, name: '河北' },
                        { value: 32, name: '广东' },
                        { value: 30, name: '四川' },
                        { value: 28, name: '浙江' },
                        { value: 26, name: '江苏' },
                        { value: 22, name: '湖北' }
                    ]
                }
                ]
            }
        return {
            lineChartOption
        }
    }
})
</script>

<style lang="less" scoped>
.item-box-container {
    height: 100%;
    width: 100%;
    border: 1px solid red;

    .item-title {
        width: 100%;
        height: 20px;
        color: red;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item-content-container {
        width: 100%;
        height: calc(100% - 20px);
    }
}
</style>