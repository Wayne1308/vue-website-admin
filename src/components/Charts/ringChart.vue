<template>
    <echart :option="chartData"></echart>
</template>

<script>
import { defineComponent } from 'vue';
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
            type: Array,
            default: () => {
                return [
                    { value: 40, name: 'test1' },
                    { value: 38, name: 'test2' },
                    { value: 32, name: 'test3' },
                    { value: 30, name: 'test4' },
                    { value: 28, name: 'test5' },
                    { value: 26, name: 'test6' },
                    { value: 22, name: 'test7' },
                ];
            },
        },
    },
    setup(props, { emit }) {
        const chartData = {
            grid: {
                // show: false,
                // left: 10,
                right: 100,
                // top: 20,
                // bottom: 10
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                right: '0',
                top: 'center',
                orient: 'vertical',
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
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: props?.data || [],
                },
            ],
        };
        return {
            chartData,
        };
    },
});
</script>

<style lang="less" scoped></style>
