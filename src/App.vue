<script setup>
import { onMounted, watch } from 'vue'
import { ElDatePicker, ElButton, ElText } from 'element-plus'

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
        <div class="block">
          <el-button type="danger" @click="clearTable">清空</el-button>
        </div>
      </div>
      <div>
        <el-text class="mx-1" type="warning">注意:太岁以立春为界而非正月初一</el-text>
      </div>
    </div>
    <div v-show="tableData.length">
      <!-- 显示结果 -->
      <ShowTable :tableData="tableData" />
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
  /* border-right: solid 1px var(--el-border-color); */
  flex: 1;
}
.date-picker .block:last-child {
  border-right: none;
}
</style>
