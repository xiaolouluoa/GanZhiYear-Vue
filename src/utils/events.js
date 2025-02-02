import { tableData } from './data'
import { handleTiangan, handleDizhi, handleShengxiao, handleWuxing, handleJiazi, handleTaisui } from './handler'

// 清空按钮点击事件
const clearTable = () => {
  tableData.value = []
  localStorage.setItem('tableData', JSON.stringify([]))
}

// 计算天干、地支、生肖，更新tableData
const updateTable = (year) => {
  let yearInt = parseInt(year, 10)
  if (isNaN(yearInt)) {
    console.log('输入的年份不合法', year)
    return
  }
  // 计算天干、地支、生肖
  const tiangan = handleTiangan(yearInt)
  const dizhi = handleDizhi(yearInt)
  const shengxiao = handleShengxiao(dizhi)
  const { tg_wx, dz_wx } = handleWuxing(tiangan, dizhi)
  const { jiazi, prev, next } = handleJiazi(yearInt)
  const { taisui, posui } = handleTaisui(dizhi)

  // 更新tableData
  tableData.value = tableData.value.filter((item) => item.year !== year)
  tableData.value.unshift({
    year: year,
    ganzhi: `${tiangan}${dizhi}${shengxiao}` + '年',
    tg_wx: tg_wx,
    dz_wx: dz_wx,
    taisui: taisui,
    posui: posui,
    jiaziStr:
      (jiazi ? year + '是甲子年，' : '') + '上一个甲子年：' + prev + '，下一个甲子年：' + next,
  })
  // 存储到本地
  localStorage.setItem('tableData', JSON.stringify(tableData.value))
}

export { clearTable, updateTable }
