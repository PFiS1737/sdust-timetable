export const ACADEMIC_MANAGEMENT_SYSTEM_URL = "https://jwgl.sdust.edu.cn"

export const WEEKDAYS = new Array(7)
  .fill(null)
  .map((_, i) => `周${"一二三四五六日"[i]}`)

// TODO: 允许自定义时间段, 不过好像没必要
export const CLASS_PERIODS = [
  ["08:00 - 08:50", "09:00 - 09:50", "10:10 - 11:00", "11:10 - 12:00"],
  ["14:00 - 14:50", "15:00 - 15:50", "16:10 - 17:00", "17:10 - 18:00"],
  ["19:00 - 19:50", "20:00 - 20:50"],
]
