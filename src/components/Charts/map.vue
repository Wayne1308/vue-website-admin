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
import * as echarts from 'echarts'
import chinaMap from '../../assets/json/map_cn.json'
import mapJsonEn from '../../assets/json/map_en.json'

export default defineComponent({
    name: 'map',
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
        echarts.registerMap("china", { geoJSON: chinaMap });
        var mapValue = [
            { name: '北京市', value: 177 },
            { name: '天津市', value: 42 },
            { name: '河北省', value: 102 },
            { name: '山西省', value: 81 },
            { name: '内蒙古', value: 47 },
            { name: '辽宁省', value: 67 },
            { name: '吉林省', value: 82 },
            { name: '黑龙江省', value: 66 },
            { name: '上海市', value: 24 },
            { name: '江苏省', value: 92 },
            { name: '浙江省', value: 114 },
            { name: '安徽省', value: 109 },
            { name: '福建省', value: 116 },
            { name: '江西省', value: 91 },
            { name: '山东省', value: 119 },
            { name: '河南省', value: 137 },
            { name: '湖北省', value: 116 },
            { name: '湖南省', value: 114 },
            { name: '重庆市', value: 91 },
            { name: '四川省', value: 125 },
            { name: '贵州省', value: 62 },
            { name: '云南省', value: 83 },
            { name: '西藏自治区', value: 9 },
            { name: '陕西省', value: 80 },
            { name: '甘肃省', value: 56 },
            { name: '青海省', value: 10 },
            { name: '宁夏回族自治区', value: 18 },
            { name: '新疆维吾尔自治区', value: 67 },
            { name: '广东省', value: 123 },
            { name: '广西壮族自治区', value: 59 },
            { name: '海南省', value: 14 },
        ];
        var options = {
            tooltip: {
                show: true,
                trigger: 'item'
            },
            visualMap: {
                show: true,
                min: 0,
                max: 200,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    color: ['#00467F', '#A5CC82'], // 蓝绿
                },
            },
            geo: {
                show: true,
                map: 'china',
                label: {
                    normal: {
                        show: false,
                        color: '#fff',
                    },
                    emphasis: {
                        color: '#000000',
                        fontSize: 14,
                        show: false,
                    },
                },
                roam: true,
                scaleLimit: {
                    min: 1.2,
                    max: 15,
                },
                zoom: 1.2,
                itemStyle: {
                    normal: {
                        borderWidth: 1, // 区域边框宽度
                        borderColor: '#029fd4', // 区域边框颜色
                        areaColor: '#2F639A', // 区域颜色
                    },
                    emphasis: {
                        areaColor: '#2F639A',
                    },
                },
            },
            series: [
                {
                    type: 'map',
                    map: 'china',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: true,
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    roam: 'scale',
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7',
                        },
                    },
                    animation: false,
                    data: mapValue,
                },
            ],
        };
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