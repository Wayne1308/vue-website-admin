<template>
    <el-container class="chart-container">
        <el-header class="chart-header" height="60px">
            <span class="title">海洋通信实验室概况</span>
            <span class="goAdmin" @click="goAdmin" title="进入后台">进入后台 >></span>
        </el-header>
        <el-main class="chart-main">
            <mat-row direction="column">
                <mat-col :span="3">
                    <mat-row>
                        <mat-col :span="1.5">
                            <mat-row direction="column">
                                <mat-col gutter="5">
                                    <item-box title="信号强度">
                                        <line-chart :config="xhqdData"></line-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box title="Iperf">
                                        <line-chart :config="iperfData"></line-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box title="营收状况">
                                        <line-chart :config="yszkData"></line-chart>
                                    </item-box>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                        <mat-col :span="2">
                            <mat-row direction="column">
                                <mat-col :span="1" gutter="5px">
                                    <mat-row class="number-container">
                                        <mat-col v-for="(item, i) in  hytxsysgsData" :key="i">
                                            <div class="number-box">
                                                <div>{{ item.value }}</div>
                                                <span class="text">{{ item.text }}(单位：{{ item.unit }})</span>
                                            </div>
                                        </mat-col>
                                    </mat-row>
                                </mat-col>
                                <mat-col :span="5">
                                    <!-- <map-show></map-show> -->
                                    <iframe style="width: 100%; height: 100%" src="https://maplab.amap.com/share/mapv/9e43817eaaf7997b00acebb7b667a43f"></iframe>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                        <mat-col :span="1.5">
                            <mat-row direction="column">
                                <mat-col gutter="5">
                                    <item-box title="温度 ｜ 湿度">
                                        <mat-row>
                                            <mat-col>
                                                <gauge-chart></gauge-chart>
                                            </mat-col>
                                            <mat-col>
                                                <gauge-chart></gauge-chart>
                                            </mat-col>
                                        </mat-row>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box title="终端分布">
                                        <rouse-chart></rouse-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box style="max-height: 200px" title="实验室介绍">
                                        <rolling-introduction></rolling-introduction>
                                    </item-box>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                    </mat-row>
                </mat-col>
                <mat-col :span="1">
                    <mat-row>
                        <mat-col gutter="5">
                            <item-box title="九轴数据图">
                              <line-chart :config="jzsjData"></line-chart>
                            </item-box>
                        </mat-col>
                    </mat-row>
                </mat-col>
            </mat-row>
        </el-main>
    </el-container>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import utils from "../public/utils.js";
import api from "../public/api.js";
import $ from 'jquery';
import * as echarts from 'echarts'
import matRow from '../components/layout/mat-row.vue'
import matCol from '../components/layout/mat-col.vue'
import itemBox from '../components/ItemBox.vue'
import lineChart from '../components/Charts/lineChart.vue';
import gaugeChart from '../components/Charts/gaugeChart.vue';
import rouseChart from '../components/Charts/rouseChart.vue';
import mapShow from '../components/Charts/map.vue'
import rollingIntroduction from '../components/RollingIntroduction.vue';

// 模拟数据
import xhqdData from '../data/charts/xhqd.json'
import iperfData from '../data/charts/iperf.json'
import yszkData from '../data/charts/yszk.json'
import jzsjData from '../data/charts/jzsj.json'
export default defineComponent({
    name: 'chart',
    components: {
        matCol,
        matRow,
        itemBox,
        lineChart,
        gaugeChart,
        rouseChart,
        mapShow,
        rollingIntroduction
    },
    setup(props, { emit }) {

        // 海洋通信实验室概述数据
        const hytxsysgsData = [
            {
                text: '实验室总人数',
                value: '24',
                unit: '人'
            },
            {
                text: '技术人员占比',
                value: '50',
                unit: '%'
            },
            {
                text: '产品投资额',
                value: '3000',
                unit: '万元'
            }
        ]

        const router = new useRouter()
        // 跳转到后台管理系统
        const goAdmin = () => {
            router.push('/Login')
        }

        return {
            xhqdData,
            iperfData,
            yszkData,
            jzsjData,
            hytxsysgsData,
            goAdmin
        }
    }
})
</script>

<style lang="less" scoped>
.chart-container {
    height: 100vh;
    width: 100%;
    // border: 1px solid red;
    background: url('../assets/charts/chart.png') no-repeat;
    background-size: 100% 100%;


    .chart-header {
        // border: 1px solid green;
        background: url('../assets/charts/bg-header.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .title {
            font-size: 2em;
            color: #7ef2ff;
            font-weight: 700;
        }

        .goAdmin {
            position: absolute;
            right: 20px;
            color: #ffffff;
            cursor: pointer;
        }

    }

    .chart-main {
        // border: 1px solid red;
        width: 100%;
        height: calc(100% - 60px);
        padding: 5px;
        padding-top: 0 !important;
    }

    .mat-col-item {
        // padding: 10px;
    }

    .number-container {
        background-color: #0a1549;
        background: url('../assets/charts/item.png') no-repeat;
        background-size: 100% 100%;
    }

    .number-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 10px;

        .text {
            display: inline-flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            height: 30px;
            color: #a8acbd;
        }

        div {
            height: calc(100% - 30px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            color: #fff27c;
        }
    }
}
</style>