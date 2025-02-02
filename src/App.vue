<script setup>
import { onMounted, watch } from 'vue'

import { year, tableData } from './utils/data'
import { clearTable, updateTable } from './utils/events'

import ShowTable from './components/ShowTable.vue'

// 监听年份变化
watch(year, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== '') {
    updateTable(newVal)
  }
})

onMounted(() => {
  updateTable(year.value)
})
</script>

<template>
  <div>
    <div class="date-picker">
      <div class="block">
        <!-- 日期组件 -->
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="选择年份"
          format="YYYY"
          value-format="YYYY"
        />
      </div>
    </div>
    <div v-show="tableData.length">
      <!-- 显示结果 -->
      <ShowTable :tableData="tableData" @clear-table="clearTable" />
    </div>
  </div>
</template>

<style scoped>
.date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.date-picker .block:last-child {
  border-right: none;
}
</style>
