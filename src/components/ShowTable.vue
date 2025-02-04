<template>
  <div v-show="tableData.length">
    <!-- 显示结果 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="year" label="年份" width="80"></el-table-column>
      <el-table-column prop="ganzhi" label="干支纪年" width="100"></el-table-column>
      <el-table-column prop="taisui" label="太岁" width="100"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-tooltip trigger="click" placement="left" :content="scope.row.jiaziStr" raw-content>
            <!-- <el-button style="border: none">查看</el-button> -->
            <el-text type="info" style="cursor: pointer">查看</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
// 接收 props 参数
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
})
</script>
