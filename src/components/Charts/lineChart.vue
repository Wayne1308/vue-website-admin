<template>
    <echart :option="options"></echart>
    <!-- <div id="charts-box"></div> -->
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import utils from "@/public/utils.js";
import api from "@/public/api.js";
import $ from 'jquery';
import * as echarts from 'echarts'
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
        },
        config: {
            type: Object,
            default: function() {
                return {
                    // textStyle: '#1987c0',
                    // color: ['#cb0131'],
                    // legend: {
                    //     show: true,
                    //     top: 0,
                    //     right: 0,
                    //     textStyle: {
                    //         color: '#cb0131'
                    //     }
                    // },
                    // grid: {
                    //     left: '10%',
                    //     right: 10,
                    //     top: 10,
                    //     bottom: '15%'
                    // },
                    // xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    // valueData:[{
                    //     name: '信号强度',
                    //     value: [150, 230, 224, 218, 135, 147, 260]
                    // }],
                }
            }
        }
    },
    setup(props, { emit }) {

        const { config } = toRefs(props);
        const grid = Object.assign({show: false}, config.value.grid || {});
        const legend = Object.assign({show: true}, config.value.legend)
        const valueData = config.value.valueData || [];
        const series = []
        valueData.forEach((item, i) => {
            const color = config.value.color[i] || '#cb0131'
            series.push({
                type: 'line',
                name: item.name,
                data: item.value,
                symbol:'emptyCircle',//拐点设置为实心
                symbolSize:8,//拐点大小
                lineStyle: {
                    color: config.value.color[i] || '#cb0131'
                },
                areaStyle: {
                    shadowColor: 'rgba(148, 95, 185, 0.5)',
                    shadowBlur: 20,  //阴影
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: color
                    }, {
                        offset: 0.6,
                        color: '#0a103f'
                    }]) // 区域线条渐变色
                },
                itemStyle: {
                    color: color,
                    borderWidth: 20
                }
            })
        })

        const options = {
            textStyle: {
                color: config.value.textStyle || '#1987c0'
            },
            color: config.value.color || [],
            legend,
            grid,
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: config.value.xData  || [],
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
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
            series
        }
        return {
            options
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