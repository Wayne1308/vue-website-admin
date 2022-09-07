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
                                        <mat-col v-for="(item, i) in hytxsysgsData" :key="i" span="1">
                                            <div class="number-box">
                                                <div>{{ item.value }}</div>
                                                <span class="text">
                                                    {{ item.text }}(单位：{{ item.unit }})
                                                </span>
                                            </div>
                                        </mat-col>
                                    </mat-row>
                                </mat-col>
                                <mat-col :span="5">
                                    <gdMap></gdMap>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                        <mat-col :span="1.5">
                            <mat-row direction="column">
                                <mat-col gutter="5">
                                    <item-box title="温度 ｜ 湿度">
                                        <mat-row>
                                            <mat-col>
                                                <gauge-chart
                                                    :data="sdwdData ? sdwdData.temperature : {}"
                                                ></gauge-chart>
                                            </mat-col>
                                            <mat-col>
                                                <gauge-chart
                                                    :data="sdwdData ? sdwdData.humidity : {}"
                                                ></gauge-chart>
                                            </mat-col>
                                        </mat-row>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box title="终端分布">
                                        <rouse-chart :data="zdfbData"></rouse-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box style="max-height: 200px" title="实验室介绍">
                                        <rolling-introduction :introductData="sysjsData"></rolling-introduction>
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
                                <el-button-group class="select-tab-container" size="small">
                                    <el-button
                                        @click="selectJZ('acceleration')"
                                        :plain="showPain('acceleration')"
                                        type="primary"
                                    >
                                        加速度
                                    </el-button>
                                    <el-button
                                        @click="selectJZ('gyroscope')"
                                        :plain="showPain('gyroscope')"
                                        type="primary"
                                    >
                                        陀螺仪
                                    </el-button>
                                    <el-button
                                        @click="selectJZ('temperature')"
                                        :plain="showPain('temperature')"
                                        type="primary"
                                    >
                                        温度
                                    </el-button>
                                    <el-button
                                        @click="selectJZ('humidity')"
                                        :plain="showPain('humidity')"
                                        type="primary"
                                    >
                                        湿度
                                    </el-button>
                                    <el-button
                                        @click="selectJZ('magnetic')"
                                        :plain="showPain('magnetic')"
                                        type="primary"
                                    >
                                        磁场
                                    </el-button>
                                    <el-button
                                        @click="selectJZ('pressure')"
                                        :plain="showPain('pressure')"
                                        type="primary"
                                    >
                                        气压和高度
                                    </el-button>
                                </el-button-group>
                                <line-chart :config="jzsjData" :title="selectJzItem"></line-chart>
                            </item-box>
                        </mat-col>
                    </mat-row>
                </mat-col>
            </mat-row>
        </el-main>
    </el-container>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import utils from '../public/utils.js';
import api from '../public/api.js';
import $ from 'jquery';
import * as echarts from 'echarts';
import matRow from '../components/layout/mat-row.vue';
import matCol from '../components/layout/mat-col.vue';
import itemBox from '../components/ItemBox.vue';
import lineChart from '../components/Charts/lineChart.vue';
import gaugeChart from '../components/Charts/gaugeChart.vue';
import rouseChart from '../components/Charts/rouseChart.vue';
import mapShow from '../components/Charts/map.vue';
import rollingIntroduction from '../components/RollingIntroduction.vue';
import gdMap from '../components/Charts/gdMap.vue';

// // 模拟数据
// import xhqdData from '../data/charts/xhqd.json'
// import yszkData from '../data/charts/yszk.json'

//
import {
    fetchJzData,
    fetchLperData,
    fetchXhqdData,
    fetchYszkData,
    fetchwdsdData,
    fetchzdfbData,
    fetchSysjsData,
    fetchSysgsData
} from '../public/service/chart';
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
        rollingIntroduction,
        gdMap,
    },
    async setup(props, { emit }) {

        const router = new useRouter();
        // 跳转到后台管理系统
        const goAdmin = () => {
            router.push('/Login');
        };
        
        const selectJzItem = ref('acceleration');
        let jzsjData = ref({});
        jzsjData.value = await fetchJzData('acceleration');
        const selectJZ = async val => {
            selectJzItem.value = val;
            jzsjData.value = await fetchJzData(val || 'acceleration');
        };
        // iperf 模块数据
        const iperfData = await fetchLperData();
        // 信号强度数据
        const xhqdData = await fetchXhqdData();
        // 营收状况数据
        const yszkData = await fetchYszkData();
        // 湿度温度数据
        const sdwdData = await fetchwdsdData();
        // 终端分布
        const zdfbData = await fetchzdfbData();
        // 实验室介绍
        const sysjsData = await fetchSysjsData();
        // 海洋通信实验室概述数据
        const hytxsysgsData = await fetchSysgsData();

        const showPain = name => {
            const isShow = name === selectJzItem.value;
            return !isShow;
        };

        return {
            xhqdData,
            iperfData,
            yszkData,
            jzsjData,
            sdwdData,
            zdfbData,
            sysjsData,
            hytxsysgsData,
            goAdmin,
            selectJZ,
            selectJzItem,
            showPain,
        };
    },
});
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
        width: 100%;

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

    .select-tab-container {
        position: absolute;
        top: -10px;
        left: 100px;
        z-index: 100;
    }
}
</style>
