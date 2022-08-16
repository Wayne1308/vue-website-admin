<template>
  <div :id="id" class="echart" :style="{ width, height }" :ref="id" :data-responsive="responsive"></div>
</template>
<script>
import _ from 'lodash';
import * as echarts from 'echarts'

export default {
  name: 'Echart',
  props: {
    // echarts图表配置项
    option: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    // echarts配置项额外参数
    opts: {
      type: Object,
      default () {
        return {
          notMerge: false, // 是否不跟之前设置的 option 进行合并
          lazyUpdate: false, // 在设置完 option 后是否不立即更新图表
          silent: false // 是否阻止调用 setOption 时抛出事件
        };
      }
    },
    // 地图数据
    map: {
      type: Object,
      default: null
    },
    // 是否响应布局变化
    responsive: {
      type: Boolean,
      default () {
        return true;
      }
    },
    // 宽
    width: {
      type: [Number, String],
      default () {
        return '100%';
      }
    },
    // 高
    height: {
      type: [Number, String],
      default () {
        return '100%';
      }
    }
  },
  data () {
    return {
      instance: null, // echarts实例
      id: _.uniqueId('echart_') // 对每个实例单独生成的id
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.init();
      this.instance.setOption(this.option, this.opts);
      this.autoResize = _.debounce(() => this.resize(), 10);

      if (this.responsive) {
        this.autoResize();
        window.addEventListener('resize', this.autoResize);
      }
    });
  },
  beforeDestroy () {
    this.instance.dispose();
    if (this.responsive) {
      window.removeEventListener('resize', this.autoResize);
    }
  },
  methods: {
    /**
     * 初始化echarts实例并绑定事件，在父组件中可以通过instance获取实例并调用echarts方法
     */
    init () {
      if (this.instance) {
        this.instance.clear();
      } else {
        if (this.map) this.registerMap(this.map);
        this.instance = echarts.init(this.$refs[this.id]);
        this.bindEvent();
      }
    },
    /**
     * 注册地图
     */
    registerMap (map) {
      if (Object.prototype.toString.call(map) !== '[object Object]') {
        return;
      }
      Object.keys(map).forEach(k => {
        echarts.registerMap(k, map[k]);
      });
    },
    /**
     * 改变图表尺寸
     */
    resize () {
      this.instance.resize();
    },
    /**
     * 绑定鼠标事件
     */
    bindEvent () {
      this.instance.on('click', params => {
        this.$emit('handleChartClick', params);
      });
      this.instance.on('mouseover', params => {
        this.$emit('handleMouseover', params);
      });
      this.instance.on('mouseout', params => {
        this.$emit('handleMouseout', params);
      });
    }
  },
  watch: {
    responsive (responsive) {
      if (responsive) {
        this.resize();
        window.addEventListener('resize', this.autoResize);
      } else {
        window.removeEventListener('resize', this.autoResize);
      }
    },
    option (option) {
      this.$nextTick(() => {
        this.instance.setOption(option, this.opts);
      });
    },
    width () {
      this.resize();
    },
    height () {
      this.resize();
    }
  }
};
</script>
