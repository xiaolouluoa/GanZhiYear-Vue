import { TG, TG_MAP, DZ, DZ_MAP } from './const'
import calendar from 'js-calendar-converter/src/index'

// 天干
const handleTiangan = (year) => {
  return TG[(year - 4) % 10]
}
// 地支
const handleDizhi = (year) => {
  return DZ[(year - 4) % 12]
}
// 生肖
const handleShengxiao = (year) => {
  let dizhi = handleDizhi(year)
  return DZ_MAP[dizhi].shengxiao
}
// 生肖五行
const handleWuxing = (year) => {
  let tiangan = handleTiangan(year)
  let dizhi = handleDizhi(year)
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
// 太岁
const handleTaisui = (year) => {
  let dizhi = handleDizhi(year)
  let dzObj = DZ_MAP[dizhi]
  let taisui = dzObj.taisui
  let posui = [...Object.values(DZ_MAP)].filter((item) => dzObj.posui + item.posui === 0)[0].taisui
  return { taisui, posui }
}
// 立春日期范围 2.3-2.5
const handleLichun = (year) => {
  let lichun = ''
  for (let i = 3; i < 6; i++) {
    let lunar = calendar.solar2lunar(year, 2, i)
    if (lunar.isTerm && lunar.Term === '立春') {
      lichun += '2-' + i
      break
    }
  }
  return lichun
}
export { handleTiangan, handleDizhi, handleShengxiao, handleWuxing, handleJiazi, handleTaisui, handleLichun }
