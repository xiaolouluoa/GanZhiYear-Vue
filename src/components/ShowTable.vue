<template>
  <div v-show="tableData.length">
    <!-- 显示结果 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="year" label="年份" width="100"></el-table-column>
      <el-table-column prop="ganzhi" label="干支纪年" width="100"></el-table-column>
      <el-table-column prop="wuxing" label="五行" width="150"></el-table-column>
      <el-table-column label="甲子年" width="100">
        <template #default="scope">
          <el-tooltip trigger="click" placement="right" :content="scope.row.jiaziStr">
            <el-button style="border: none;">查看</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="danger" @click="clearTable">清空</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
// import { Search } from '@element-plus/icons-vue'

// 接收 props 参数
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
})

// 定义 emit 事件
const emit = defineEmits(['clear-table', 'get-jiazi'])
// 清空表格
const clearTable = () => {
  emit('clear-table')
}
</script>
