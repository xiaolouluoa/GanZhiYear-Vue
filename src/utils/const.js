// 天干
const TG = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const TG_MAP = {
  甲: { wuxing: '木', yinyang: '阳' },
  乙: { wuxing: '木', yinyang: '阴' },
  丙: { wuxing: '火', yinyang: '阳' },
  丁: { wuxing: '火', yinyang: '阴' },
  戊: { wuxing: '土', yinyang: '阳' },
  己: { wuxing: '土', yinyang: '阴' },
  庚: { wuxing: '金', yinyang: '阳' },
  辛: { wuxing: '金', yinyang: '阴' },
  壬: { wuxing: '水', yinyang: '阳' },
  癸: { wuxing: '水', yinyang: '阴' },
}
// 地支
const DZ = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const DZ_MAP = {
  子: { shengxiao: '鼠', wuxing: '水', yinyang: '阳' },
  丑: { shengxiao: '牛', wuxing: '土', yinyang: '阴' },
  寅: { shengxiao: '虎', wuxing: '木', yinyang: '阳' },
  卯: { shengxiao: '兔', wuxing: '木', yinyang: '阴' },
  辰: { shengxiao: '龙', wuxing: '土', yinyang: '阳' },
  巳: { shengxiao: '蛇', wuxing: '火', yinyang: '阴' },
  午: { shengxiao: '马', wuxing: '火', yinyang: '阳' },
  未: { shengxiao: '羊', wuxing: '土', yinyang: '阴' },
  申: { shengxiao: '猴', wuxing: '金', yinyang: '阳' },
  酉: { shengxiao: '鸡', wuxing: '金', yinyang: '阴' },
  戌: { shengxiao: '狗', wuxing: '土', yinyang: '阳' },
  亥: { shengxiao: '猪', wuxing: '水', yinyang: '阴' },
}
// 五行
const WX = ['金', '水', '木', '火', '土']
const WX_MAP = {
  金: {
    color: '白色',
    direction: '西',
    birth_from: '土',
    birth_to: '水',
    bad_from: '火',
    bad_to: '木',
  },
  水: {
    color: '黑色',
    direction: '北',
    birth_from: '金',
    birth_to: '木',
    bad_from: '土',
    bad_to: '火',
  },
  木: {
    color: '绿色',
    direction: '东',
    birth_from: '水',
    birth_to: '火',
    bad_from: '金',
    bad_to: '土',
  },
  火: {
    color: '红色',
    direction: '南',
    birth_from: '木',
    birth_to: '土',
    bad_from: '水',
    bad_to: '金',
  },
  土: {
    color: '黄色',
    direction: '中',
    birth_from: '火',
    birth_to: '金',
    bad_from: '木',
    bad_to: '水',
  },
}
// 先天八卦
// 无极生太极, 太极生两仪(阳1, 阴0)
// 两仪生四象(太阳11, 少阴01, 少阳10, 太阴00)
// 四象生八卦(111乾, 011兑, 101离, 001震, 110巽, 010坎, 100艮, 000坤)
const XT_BG_SORT = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤']
// 先天八卦方位
const XT_BG_DIRECTION = {
  乾: '正南',
  兑: '东南',
  离: '正东',
  震: '东北',
  巽: '西南',
  坎: '正西',
  艮: '西北',
  坤: '正北',
}
// 后天八卦
const HT_BG_SORT = ['坎', '坤', '震', '巽', '中宫', '乾', '兑', '艮', '离']
// 后天八卦方位
const HT_BG_DIRECTION = {
  乾: '西北',
  兑: '正西',
  离: '正南',
  震: '正东',
  巽: '东南',
  坎: '正北',
  艮: '东北',
  坤: '西南',
}
// 八卦名称
const BG_MAP = {
  乾: '天', // 乾三连 111
  坤: '地', // 坤六断 000
  震: '雷', // 震仰盂 001
  艮: '山', // 艮覆碗 100
  离: '火', // 离中虚 101
  坎: '水', // 坎中满 010
  兑: '泽', // 兑上缺 011
  巽: '风', // 巽下断 110
}

export {
  TG,
  TG_MAP,
  DZ,
  DZ_MAP,
  WX,
  WX_MAP,
  XT_BG_SORT,
  XT_BG_DIRECTION,
  HT_BG_SORT,
  HT_BG_DIRECTION,
  BG_MAP,
}
