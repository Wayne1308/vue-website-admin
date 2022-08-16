<template>
  <div class="mat-row-container" :style="matRowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "mat-row",
  data() {
    return {
      matRowStyle: {
        "align-items": this.align,
        "justify-content": this.justify,
        "flex-direction": this.direction,
        padding: Number(this.gutter) ? this.gutter + "px" : this.gutter
      }
    };
  },
  props: {
    align: {
      // align-items
      type: String,
      default: "center"
    },
    justify: {
      // justify-content
      type: String,
      default: "center"
    },
    direction: {
      // flex-direction
      type: String,
      default: "row"
    },
    gutter: {
      type: [String, Number],
      default: "0"
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.mat-row-container {
  height: 100%;
  width: 100%;
  display: flex;
  // border: 1px solid red;
}
</style>
