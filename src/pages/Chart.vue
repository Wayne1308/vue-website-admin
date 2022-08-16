<template>
    <el-container class="chart-container">
        <el-header class="chart-header" height="60px">111</el-header>
        <el-main class="chart-main">
            <mat-row direction="column">
                <mat-col :span="3">
                    <mat-row>
                        <mat-col :span="1.5">
                            <mat-row direction="column">
                                <mat-col gutter="5">
                                    <item-box title="信号强度">
                                        <line-chart></line-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box title="Iperf">
                                        <line-chart></line-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col gutter="5">
                                    <item-box title="营收状况">
                                        <line-chart></line-chart>
                                    </item-box>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                        <mat-col :span="2">
                            <mat-row direction="column">
                                <mat-col :span="1">
                                    <mat-row>
                                        <mat-col>
                                            <div class="number-box">
                                                <div>24</div>
                                                <span class="text">实验室总人数(单位：人)</span>
                                            </div>
                                        </mat-col>
                                        <mat-col>
                                            <div class="number-box">
                                                <div>24</div>
                                                <span class="text">实验室总人数(单位：人)</span>
                                            </div>
                                        </mat-col>
                                        <mat-col>
                                            <div class="number-box">
                                                <div>24</div>
                                                <span class="text">实验室总人数(单位：人)</span>
                                            </div>
                                        </mat-col>
                                    </mat-row>
                                </mat-col>
                                <mat-col :span="5">
                                    <map-show></map-show>
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
                                    <item-box title="实验室介绍"></item-box>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                    </mat-row>
                </mat-col>
                <mat-col :span="1">
                    <mat-row>
                        <mat-col gutter="5">
                            <item-box title="信号强度">
                              <line-chart></line-chart>
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
export default defineComponent({
    name: 'chart',
    components: {
        matCol,
        matRow,
        itemBox,
        lineChart,
        gaugeChart,
        rouseChart,
        mapShow
    },
    setup(props, { emit }) {
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
    }

    .chart-main {
        // border: 1px solid red;
        width: 100%;
        height: calc(100% - 60px);
        padding: 5px;
    }

    .mat-col-item {
        // padding: 10px;
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
        }

        div {
            height: calc(100% - 30px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
        }
    }
}
</style>