import { endOfDay, startOfDay } from "date-fns"

import type { WeekInfo } from "./WeekInfo.class"

export let SHARED_SEMESTER_INFO: SemesterInfo

export class SemesterInfo {
  /** 学年学期号 */
  id: string
  /** 学期开始日期 */
  startTime: Date
  /** 学期结束日期 */
  endTime: Date
  /** 学期各周信息 */
  weeks: WeekInfo[]

  constructor(id: string, startTime: Date, endTime: Date, weeks: WeekInfo[]) {
    this.id = id
    this.startTime = startOfDay(startTime)
    this.endTime = endOfDay(endTime)
    this.weeks = weeks

    if (!SHARED_SEMESTER_INFO) SHARED_SEMESTER_INFO = this
    else console.warn("重复调用 SemesterInfo 构造函数")
  }

  getWeekIncludesDate(date: Date) {
    return this.weeks.find(
      (week) => week.startTime <= date && week.endTime >= date
    )
  }

  getCurrentWeek() {
    return this.getWeekIncludesDate(new Date())
  }

  getWeekByNumber(weekNumber: number) {
    return this.weeks[weekNumber - 1]
  }
}
