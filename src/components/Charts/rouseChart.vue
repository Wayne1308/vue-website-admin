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
            grid: {
                show: false,
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: [
                'rose1',
                'rose2',
                'rose3',
                'rose4',
                'rose5',
                'rose6',
                'rose7',
                'rose8'
                ]
            },
            series: [
                {
                    name: 'Radius Mode',
                    type: 'pie',
                    radius: [10, 80],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    label: {
                        show: false
                    },
                    emphasis: {
                        label: {
                        show: true
                        }
                    },
                    data: [
                        { value: 40, name: 'rose 1' },
                        { value: 33, name: 'rose 2' },
                        { value: 28, name: 'rose 3' },
                        { value: 22, name: 'rose 4' },
                        { value: 20, name: 'rose 5' },
                        { value: 15, name: 'rose 6' },
                        { value: 12, name: 'rose 7' },
                        { value: 10, name: 'rose 8' }
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