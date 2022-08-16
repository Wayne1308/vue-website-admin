<template>
  <div class="echart-wrap">
    <slot></slot>
    <div id="echart" :style="{ width: width, height: height }" :ref="chartKey" :data-responsive="responsive"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
import _ from 'lodash';

export default {
  name: 'e-chart',
  props: {
    responsive: {
      type: Boolean,
      default () {
        return true;
      }
    },
    options: {
      type: Object,
      required: true,
      default () {
        return {};
      }
    },
    width: {
      type: [Number, String],
      default () {
        return '100%';
      }
    },
    height: {
      type: [Number, String],
      default () {
        return '100%';
      }
    }
  },
  data () {
    return {
      chartKey: _.uniqueId('echart_')
    };
  },
  computed: {
    echartOptions () {
      const { options } = this;
      return options;
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init();
      this.echart.setOption(this.echartOptions, true);
      this._autoResize = _.debounce(() => this.autoResize(), 10, true);

      if (this.responsive) {
        this.autoResize();
        window.addEventListener('resize', this._autoResize);
      }
    });
  },
  beforeDestroy () {
    this.echart.dispose();
    if (this.responsive) {
      window.removeEventListener('resize', this._autoResize);
    }
  },
  methods: {
    init () {
      if (this.echart) {
        this.echart.clear();
      } else {
        this.echart = echarts.init(this.$refs[this.chartKey]);
        this.echart.on('click', params => {
          this.$emit('handleChartClick', params);
        });
      }
    },
    autoResize () {
      this.echart.resize();
    }
  },
  watch: {
    responsive (responsive) {
      if (responsive) {
        this.autoResize();
        window.addEventListener('resize', this._autoResize);
      } else {
        window.removeEventListener('resize', this._autoResize);
      }
    },
    options (options) {
      this.$nextTick(() => {
        this.echart.setOption(options, true);
        this.echart.resize();
      });
    },
    width () {
      if (this.responsive) {
        this.autoResize();
      } else {
        this.echart.resize();
      }
    },
    height () {
      if (this.responsive) {
        this.autoResize();
      } else {
        this.echart.resize();
      }
    }
  }
};
</script>

<style>
.echart-wrap {
  height: 100%;
  width: 100%;
}
</style>
