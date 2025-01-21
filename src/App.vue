<script setup>
import { ref, watch } from 'vue'

const year = ref('')

const tableData = ref(JSON.parse(localStorage.getItem('tableData')) || [])

// 天干
const handleTiangan = (year) => {
  return ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'][(year - 4) % 10]
}
// 地支
const handleDizhi = (year) => {
  return ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][(year - 4) % 12]
}
// 生肖
const handleShengxiao = (year) => {
  return ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'][(year - 4) % 12]
}
// 生肖五行
const handleWuxing = (shengxiao) => {
  let map = {
    鼠: '水',
    牛: '土',
    虎: '木',
    兔: '木',
    龙: '土',
    蛇: '火',
    马: '火',
    羊: '土',
    猴: '金',
    鸡: '金',
    狗: '土',
    猪: '水',
  }
  return map[shengxiao]
}
// 甲子年
const handleJiazi = (year) => {
  let jiazi = false,
    prev = undefined,
    next = undefined
  let r = (year - 4) % 60
  if (r === 0) {
    jiazi = true
    prev = year - 60
    next = year + 60
  } else {
    prev = year - r
    next = year + (60 - r)
  }
  return { jiazi, prev, next }
}

// 清空按钮点击事件
const clearTable = () => {
  tableData.value = []
  localStorage.setItem('tableData', JSON.stringify([]))
}

// 监听年份变化
watch(year, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== '') {
    let yearInt = parseInt(newVal, 10)
    if (isNaN(yearInt)) {
      console.log('输入的年份不合法', newVal)
      return
    }
    // 计算天干、地支、生肖、甲子年
    const tiangan = handleTiangan(yearInt)
    const dizhi = handleDizhi(yearInt)
    const shengxiao = handleShengxiao(yearInt)
    const wuxing = handleWuxing(shengxiao)
    const { jiazi, prev, next } = handleJiazi(yearInt)
    // 更新tableData
    tableData.value.push({
      year: newVal,
      ganzhi: `${tiangan}${dizhi}${shengxiao}` + '年',
      wuxing: wuxing,
      jiazi: jiazi ? '是' : '否',
      prev: prev,
      next: next,
    })
    // 存储到本地
    localStorage.setItem('tableData', JSON.stringify(tableData.value))
  }
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="year" label="年份" width="100"></el-table-column>
        <el-table-column prop="ganzhi" label="干支纪年" width="100"></el-table-column>
        <el-table-column prop="wuxing" label="五行" width="100"></el-table-column>
        <el-table-column prop="jiazi" label="是否甲子年" width="100"></el-table-column>
        <el-table-column prop="prev" label="前一甲子年" width="100"></el-table-column>
        <el-table-column prop="next" label="后一甲子年" width="100"></el-table-column>
      </el-table>
      <div>
        <el-button type="primary" @click="clearTable">清空</el-button>
      </div>
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
