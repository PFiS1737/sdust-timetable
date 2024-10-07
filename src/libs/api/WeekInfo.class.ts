import { endOfDay, startOfDay } from "date-fns"

export interface IWeekInfo {
  /** 当前周次 */
  weekNumber: number
  /** 当前周次的开始日期 */
  startTime: Date
  /** 当前周次的结束日期 */
  endTime: Date
  /**
   * 学年学期号
   *
   * 例: "2024-2025-1" 表示 2024-2025 年第一学期
   */
  semester: string
}

export class WeekInfo implements IWeekInfo {
  weekNumber: number
  startTime: Date
  endTime: Date
  semester: string

  get isVacation() {
    return this.weekNumber > 20
  }

  static from(info: IWeekInfo) {
    return new WeekInfo({
      zc: info.weekNumber,
      s_time: `${info.startTime}`,
      e_time: `${info.endTime}`,
      xnxqh: info.semester,
    })
  }

  constructor(info: WeekInfoRaw) {
    this.weekNumber = info.zc
    this.startTime = startOfDay(new Date(info.s_time))
    this.endTime = endOfDay(new Date(info.e_time))
    this.semester = info.xnxqh
  }

  toStorable(): IWeekInfo {
    return {
      weekNumber: this.weekNumber,
      startTime: this.startTime,
      endTime: this.endTime,
      semester: this.semester,
    }
  }

  canIncludeDate(date: Date) {
    return this.startTime <= date && this.endTime >= date
  }

  isCurrentWeek() {
    return this.canIncludeDate(new Date())
  }
}
