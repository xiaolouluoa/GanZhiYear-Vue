<script setup>
import { onMounted, computed, reactive, ref, watch } from 'vue'
import { ElDatePicker, ElButton, ElText } from 'element-plus'

import { TG, TG_MAP, DZ, DZ_MAP } from './utils/const'
import calendar from 'js-calendar-converter/src/index'

import ShowTable from './components/ShowTable.vue'

const data = reactive({
  year: ref(new Date().getFullYear().toString()),
  tableData: ref(JSON.parse(localStorage.getItem('tableData')) || []),
})

// 天干
const handleTiangan = computed(() => {
  return TG[(parseInt(data.year, 10) - 4) % 10]
})
// 地支
const handleDizhi = computed(() => {
  return DZ[(parseInt(data.year, 10) - 4) % 12]
})
// 生肖
const handleShengxiao = computed(() => {
  let dizhi = handleDizhi.value
  return DZ_MAP[dizhi].shengxiao
})
// 生肖五行
const handleWuxing = computed(() => {
  let tiangan = handleTiangan.value
  let dizhi = handleDizhi.value
  let tg_wx = TG_MAP[tiangan].yinyang + TG_MAP[tiangan].wuxing
  let dz_wx = DZ_MAP[dizhi].yinyang + DZ_MAP[dizhi].wuxing
  return { tg_wx, dz_wx }
})
// 甲子年
const handleJiazi = computed(() => {
  let y = parseInt(data.year, 10),
    jiazi = false,
    prev = undefined,
    next = undefined
  let r = (y - 4) % 60
  if (r === 0) {
    jiazi = true
    prev = y - 60
    next = y + 60
  } else {
    prev = y - r
    next = y + (60 - r)
  }
  return { jiazi, prev, next }
})
// 太岁
const handleTaisui = computed(() => {
  let dizhi = handleDizhi.value
  let dzObj = DZ_MAP[dizhi]
  let taisui = dzObj.taisui
  let posui = [...Object.values(DZ_MAP)].filter((item) => dzObj.posui + item.posui === 0)[0].taisui
  return { taisui, posui }
})
// 立春日期范围 2.3-2.5
const handleLichun = computed(() => {
  let lichun = ''
  for (let i = 3; i < 6; i++) {
    let lunar = calendar.solar2lunar(data.year, 2, i)
    if (lunar.isTerm && lunar.Term === '立春') {
      lichun = '2-' + i + '（' + lunar.IMonthCn + lunar.IDayCn + '）'
      break
    }
  }
  return lichun
})

// 计算天干、地支、生肖，更新tableData
const handleUpdate = computed(() => {
  // 计算天干、地支、生肖
  const tiangan = handleTiangan.value
  const dizhi = handleDizhi.value
  const shengxiao = handleShengxiao.value
  const { tg_wx, dz_wx } = handleWuxing.value
  const { jiazi, prev, next } = handleJiazi.value
  const { taisui, posui } = handleTaisui.value
  const lichun = handleLichun.value

  let jiaziStr = ''
  jiaziStr += `天干五行: ${tg_wx}` + '<br />'
  jiaziStr += `地支五行: ${dz_wx}` + '<br />'
  jiaziStr += `太岁方位: ${taisui}` + '<br />'
  jiaziStr += `破岁方位: ${posui}` + '<br />'
  jiaziStr += jiazi ? data.year + '是甲子年<br />' : ''
  jiaziStr += `上一个甲子年: ${prev}` + '<br />'
  jiaziStr += `下一个甲子年: ${next}`

  return { tiangan, dizhi, shengxiao, taisui, lichun, jiaziStr }
})

// 清空按钮点击事件
const clearTable = () => {
  data.tableData = []
  localStorage.setItem('tableData', JSON.stringify([]))
}

const updateTable = () => {
  let yearInt = parseInt(data.year, 10)
  if (isNaN(yearInt)) {
    console.log('输入的年份不合法', data.year)
    return
  }
  let { tiangan, dizhi, shengxiao, lichun, taisui, jiaziStr } = handleUpdate.value
  // 更新tableData
  data.tableData = data.tableData.filter((item) => parseInt(item.year, 10) !== yearInt)
  data.tableData.unshift({
    year: yearInt,
    ganzhi: `${tiangan}${dizhi}${shengxiao}年`,
    lichun: lichun,
    taisui: taisui,
    jiaziStr: jiaziStr,
  })
  // 存储到本地
  localStorage.setItem('tableData', JSON.stringify(data.tableData))
}

// 监听年份变化
watch(() => data.year, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== '') {
    updateTable()
  }
})

onMounted(() => {
  updateTable()
})

</script>

<template>
  <div>
    <div>
      <div class="date-picker">
        <div class="block">
          <!-- 日期组件 -->
          <el-date-picker
            v-model="data.year"
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
    <div v-show="data.tableData.length">
      <!-- 显示结果 -->
      <ShowTable :tableData="data.tableData" />
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
