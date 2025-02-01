<script setup>
import { ref, watch } from 'vue'
import { TG, TG_MAP, DZ, DZ_MAP, WX, WX_MAP } from './utils/const'
import ShowTable from './components/ShowTable.vue'

const year = ref('')

const tableData = ref(JSON.parse(localStorage.getItem('tableData')) || [])

// 天干
const handleTiangan = (year) => {
  return TG[(year - 4) % 10]
}
// 地支
const handleDizhi = (year) => {
  return DZ[(year - 4) % 12]
}
// 生肖
const handleShengxiao = (dizhi) => {
  return DZ_MAP[dizhi].shengxiao
}
// 生肖五行
const handleWuxing = (tiangan, dizhi) => {
  let tg_wx = TG_MAP[tiangan].yinyang + TG_MAP[tiangan].wuxing
  let dz_wx = DZ_MAP[dizhi].yinyang + DZ_MAP[dizhi].wuxing
  return { tg_wx, dz_wx }
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
    // 计算天干、地支、生肖
    const tiangan = handleTiangan(yearInt)
    const dizhi = handleDizhi(yearInt)
    const shengxiao = handleShengxiao(dizhi)
    const { tg_wx, dz_wx } = handleWuxing(tiangan, dizhi)
    const { jiazi, prev, next } = handleJiazi(yearInt)

    // 更新tableData
    tableData.value.unshift({
      year: newVal,
      ganzhi: `${tiangan}${dizhi}${shengxiao}` + '年',
      wuxing: '天干' + `${tg_wx}` + '/地支' + `${dz_wx}`,
      jiaziStr:
        (jiazi ? newVal + '是甲子年，' : '') + '上一个甲子年：' + prev + '，下一个甲子年：' + next,
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
