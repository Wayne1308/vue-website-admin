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
            series: [
                {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
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
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                    color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                    color: 'auto',
                    width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                    color: 'auto',
                    width: 5
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 10,
                    distance: -40,
                    formatter: function (value) {
                    if (value === 0.875) {
                        return 'A';
                    } else if (value === 0.625) {
                        return 'B';
                    } else if (value === 0.375) {
                        return 'C';
                    } else if (value === 0.125) {
                        return 'D';
                    }
                    return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-20%'],
                    fontSize: 10
                },
                detail: {
                    fontSize: 20,
                    offsetCenter: [0, '0%'],
                    valueAnimation: true,
                    formatter: function (value) {
                    return Math.round(value * 100) + '分';
                    },
                    color: 'auto'
                },
                data: [
                    {
                    value: 1,
                    name: 'Grade Rating'
                    }
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