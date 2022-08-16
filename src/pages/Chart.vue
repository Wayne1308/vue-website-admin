<template>
    <el-container class="chart-container">
        <el-header class="chart-header" height="60px">111</el-header>
        <el-main class="chart-main">
            <mat-row direction="column">
                <mat-col :span="3">
                    <mat-row>
                        <mat-col :span="1.5">
                            <mat-row direction="column">
                                <mat-col>
                                    <item-box title="信号强度">
                                        <line-chart></line-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col>
                                    <item-box title="Iperf">
                                        <line-chart></line-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col>
                                    <item-box title="营收状况">
                                        <line-chart></line-chart>
                                    </item-box>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                        <mat-col :span="2"></mat-col>
                        <mat-col :span="1.5">
                            <mat-row direction="column">
                                <mat-col>
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
                                <mat-col>
                                    <item-box title="终端分布">
                                        <rouse-chart></rouse-chart>
                                    </item-box>
                                </mat-col>
                                <mat-col>
                                    <item-box title="实验室介绍"></item-box>
                                </mat-col>
                            </mat-row>
                        </mat-col>
                    </mat-row>
                </mat-col>
                <mat-col :span="1">
                    <mat-row>
                        <mat-col>
                            <item-box title="信号强度"></item-box>
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
export default defineComponent({
    name: 'chart',
    components: {
        matCol,
        matRow,
        itemBox,
        lineChart,
        gaugeChart,
        rouseChart
    },
    setup(props, { emit }) {
    }
})
</script>

<style lang="less" scoped>
.chart-container {
    height: 100vh;
    width: 100%;
    border: 1px solid red;

    .chart-header {
        border: 1px solid green;
    }

    .chart-main {
        border: 1px solid red;
        width: 100%;
        height: calc(100% - 60px);
        padding: 5px;
    }

    .mat-col-item {
        // padding: 10px;
    }
}
</style>