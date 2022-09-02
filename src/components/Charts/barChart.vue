<template>
    <echart :option="options"></echart>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue';
import utils from '@/public/utils.js';
import api from '@/public/api.js';
import $ from 'jquery';
import * as echarts from 'echarts';
import echart from './echart.vue';

export default defineComponent({
    name: 'barChart',
    components: {
        echart,
    },
    props: {
        title: {
            type: String,
            default: 'title',
        },
        config: {
            type: Object,
            default: function () {
                return {
                    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    value: [120, 200, 150, 80, 70, 110, 130],
                };
            },
        },
    },
    setup(props, { emit }) {
        const options = computed(() => {
            return {
                color: '#3ca1fb',
                grid: {
                    top: 10,
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                xAxis: {
                    type: 'category',
                    data: props?.config?.xData || [],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: props?.config?.value || [],
                        type: 'bar',
                    },
                ],
            };
        });
        return {
            options,
        };
    },
});
</script>

<style lang="less" scoped></style>
