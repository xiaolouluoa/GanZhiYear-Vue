import { TG, TG_MAP, DZ, DZ_MAP, WX, WX_MAP } from './const'

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

const handleTaisui = (dizhi) => {
  let dz = DZ_MAP[dizhi]
  let taisui = dz.taisui
  let posui = [...Object.values(DZ_MAP)].filter((item) => dz.posui + item.posui === 0)[0].taisui
  return { taisui, posui }
}

export { handleTiangan, handleDizhi, handleShengxiao, handleWuxing, handleJiazi, handleTaisui }
