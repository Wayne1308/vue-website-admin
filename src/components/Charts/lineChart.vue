<template>
    <echart :option="options"></echart>
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

        const options = {
            grid: {
                show: false,
                left: '10%',
                right: 10,
                top: 10,
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'line',
                    data: [150, 230, 224, 218, 135, 147, 260],
                }
            ]
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