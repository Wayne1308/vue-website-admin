<template>
  <div class="mat-col-container" :style="matColContentStyle">
    <div class="mat-col-item" :style="matColStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "mat-col",
  data() {
    return {
      matColStyle: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%"
      },
      matColContentStyle: {
        padding: Number(this.gutter) ? this.gutter + "px" : this.gutter,
        flex:
          Boolean(Number(this.span)) &&
          this.height === "100%" &&
          this.width === "100%"
            ? this.span
            : "none",
        height: this.height,
        width: this.width
        // boxSizing: 'content-box'
      }
    };
  },
  props: {
    span: {
      // align-items
      type: [String, Number],
      default: 1
    },
    gutter: {
      // padding
      type: [String, Number],
      default: "0"
    },
    height: {
      default: "100%"
    },
    width: {
      default: "100%"
    },
    bg: {
      type: String,
      default: ""
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.mat-col-container {
  height: 100%;
  width: 100%;
  display: flex;

  .mat-col-item {
    height: 100%;
    width: 100%;
    display: flex;
    // border: 1px solid red;
    overflow: hidden;
    position: relative;
  }
}
</style>
