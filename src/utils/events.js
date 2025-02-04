import { tableData } from './data'
import {
  handleTiangan,
  handleDizhi,
  handleShengxiao,
  handleWuxing,
  handleJiazi,
  handleTaisui,
} from './handler'

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

  let jiaziStr = ''
  jiaziStr += `天干五行: ${tg_wx}` + '<br />'
  jiaziStr += `地支五行: ${dz_wx}` + '<br />'
  jiaziStr += `太岁方位: ${taisui}` + '<br />'
  jiaziStr += `破岁方位: ${posui}` + '<br />'
  jiaziStr += jiazi ? year + '是甲子年<br />' : ''
  jiaziStr += `上一个甲子年: ${prev}` + '<br />'
  jiaziStr += `下一个甲子年: ${next}`

  // 更新tableData
  tableData.value = tableData.value.filter((item) => parseInt(item.year, 10) !== yearInt)
  tableData.value.unshift({
    year: yearInt,
    ganzhi: `${tiangan}${dizhi}${shengxiao}年`,
    taisui: taisui,
    jiaziStr: jiaziStr,
  })
  // 存储到本地
  localStorage.setItem('tableData', JSON.stringify(tableData.value))
}

export { clearTable, updateTable }
