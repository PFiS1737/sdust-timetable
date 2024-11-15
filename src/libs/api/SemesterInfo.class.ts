import { endOfDay, startOfDay } from "date-fns"

import type { WeekInfo } from "./WeekInfo.class"

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
  }

  getWeekIncludesDate(date: Date) {
    return this.weeks.find(
      (week) => week.startTime <= date && week.endTime >= date
    )
  }

  getCurrentWeek() {
    return this.getWeekIncludesDate(new Date())
  }

  getWeekByNumber(weekNumber: number): WeekInfo | undefined {
    return this.weeks[weekNumber - 1]
  }
}
