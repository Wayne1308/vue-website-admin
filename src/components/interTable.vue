<template>
  <div class="inter-table-container">
    <el-table :data="tableData" stripe header-row-class-name="header-row-class-name" max-height="500"
      style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column v-for="item in columns" :prop="item.col" :label="item.label" />
    </el-table>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import utils from "../public/utils.js";
import api from "../public/api.js";
import $ from 'jquery';
import * as echarts from 'echarts'
import { isNumber } from 'lodash';
import { computed } from '@vue/reactivity';

export default defineComponent({
  name: 'interTable',
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            date: '2016-05-03',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-08',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-06',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          }, {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          }, {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          }, {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          }, {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          }, {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
          },
        ]
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [
          {
            label: '时间',
            col: 'date'
          },
          {
            label: '名称',
            col: 'name'
          },
          {
            label: '州名',
            col: 'state'
          },
          {
            label: '城市',
            col: 'city'
          },
          {
            label: '地址',
            col: 'address'
          },
          {
            label: 'zip',
            col: 'zip'
          }
        ]
      }
    }
  },
  setup(props, { emit }) {
    const tableData = computed(() => {
      return props.tableData;
    });
    const columns = computed(() => {
      return props.columns;
    })
    return {
      tableData,
      columns
    }
  }
})
</script>

<style lang="less">
.inter-table-container {
  height: 100%;
  width: 100%;

  .header-row-class-name th {
    background-color: #f1f2f6 !important;
    color: #3a3a3a;
  }
}
</style>