<template>
    <echart :option="chartData"></echart>
</template>

<script>
import { defineComponent, computed } from 'vue';
import utils from '@/public/utils.js';
import api from '@/public/api.js';
import $ from 'jquery';
import echart from './echart.vue';

export default defineComponent({
    name: 'ringChart',
    components: {
        echart,
    },
    props: {
        title: {
            type: String,
            default: 'title',
        },
        data: {
            type: Object,
            default: () => {
                return {
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    color: ['#65936c', '#ca8651'],
                    value: [
                        {
                            name: '下行',
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                        },
                        {
                            name: '上行',
                            data: [100, 200, 500, 1000, 1000, 900, 600],
                        },
                    ],
                };
            },
        },
    },
    setup(props, { emit }) {
        const chartData = computed(() => {
            const series = (props?.data?.value || []).map(o => {
                return Object.assign(
                    {
                        type: 'line',
                        smooth: true,
                    },
                    o
                );
            });
            return {
                grid: {
                    show: false,
                    left: 50,
                    right: 50,
                    top: 20,
                    bottom: 80,
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                color: props?.data?.color || ['#65936c', '#ca8651'],
                legend: {
                    show: true,
                    right: 'center',
                    bottom: '20',
                },
                xAxis: {
                    type: 'category',
                    data: props?.data?.xData || [],
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#c6af87',
                            width: 2,
                        },
                    },
                    axisLabel: {
                        show: true,
                        color: '#828282',
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                },
                series: series,
            };
        });

        return {
            chartData,
        };
    },
});
</script>

<style lang="less" scoped></style>
