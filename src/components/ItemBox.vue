<template>
    <div class="item-box-container">
        <div class="item-title">{{ title }}</div>
        <div class="item-content-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import utils from "../public/utils.js";
import api from "../public/api.js";
import $ from 'jquery';
import * as echarts from 'echarts'

export default defineComponent({
    name: 'itemBox',
    components: {},
    props: {
        title: {
            type: String,
            default: 'title'
        }
    },
    setup(props, { emit }) {
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