<template>
    <echart :option="chartData"></echart>
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

        const chartData = {
            grid: {
                show: false,
                // left: 10,
                // right: 10,
                // top: 10,
                // bottom: 10
            },
            series: [
                {
                type: 'gauge',
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 100,
                radius: '60%',
                splitNumber: 10,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.5, '#FDDD60'],
                            [0.75, '#58D9F9'],
                            [1, '#7CFFB2']
                        ]
                    }
                },
                center: ['50%', '50%'],
                pointer: {
                    show: true,
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -13,
                    splitNumber: 5,
                    lineStyle: {
                    width: 2,
                    color: '#0489a7'
                    }
                },
                splitLine: {
                    distance: -20,
                    length: 8,
                    lineStyle: {
                        width: 2,
                        color: '#0489a7'
                    }
                },
                axisLabel: {
                    color: '#0385a2',
                    fontSize: 10,
                    distance: -20
                },
                detail: {
                    fontSize: 16,
                    offsetCenter: [0, '40%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return value + '℃';
                    },
                    color: 'auto'
                },
                data: [
                    {
                        value: 40,
                        name: '温度',
                        title: {
                            show: true,
                            offsetCenter: [0, '75%'],
                            color: '#2c88a5'
                        }
                    }
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