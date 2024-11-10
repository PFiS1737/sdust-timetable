import { addDays, addWeeks, subDays, subWeeks } from "date-fns"

import { Api } from "./Api.class"
import { ApiCache } from "./ApiCache.class"
import { SemesterInfo } from "./SemesterInfo.class"
import { WeekInfo } from "./WeekInfo.class"

export interface ApiOptions {
  /** 教务系统的地址 */
  url?: string
  /**
   * 是否强制从教务系统获取数据
   *
   * - false: 优先使用缓存 (默认)
   * - true: 是
   */
  force?: boolean
}

export class ApiClient extends Api {
  private force: boolean

  public cache: ApiCache

  constructor(opts?: ApiOptions) {
    super(opts?.url)

    this.force = opts?.force ?? false
    this.cache = new ApiCache()
  }

  async getCurrentWeekInfo() {
    if (!this.force) {
      // NOTE: 由于这里 cache.getCurrentWeekInfo() 的实现原理
      //       是从 Cache 中读取任意周次数据, 然后计算出 SemesterInfo, 再从中获取当前周次数据
      //       所以这里理论上只要缓存过一次数据, 就永远会通过.
      //       进而, 如果你去检查 IndexedDB 下面的 ApiCache 的 weeks 的数据,
      //       你会发现它只有一条
      const weekInfo = await this.cache.getCurrentWeekInfo()
      if (weekInfo) return weekInfo
    }

    const info = await super.getCurrentWeekInfo()

    await this.cache.setWeekInfo(info)

    return info
  }

  async getClassesInfoOfWeek(week?: WeekInfo) {
    const weekInfo = week ?? (await this.getCurrentWeekInfo())

    if (!this.force) {
      const classes = await this.cache.getClassesInfoOfWeek(weekInfo)
      if (classes) return classes
    }

    const classes = await super.getClassesInfoOfWeek(weekInfo)

    await this.cache.setClassesOfWeek(classes)

    return classes
  }

  async getSemesterInfo() {
    return calculaterSemesterInfo(await this.getCurrentWeekInfo())
  }

  async getClassesInfoOfSemester() {
    const semesterInfo = await this.getSemesterInfo()

    return await Promise.all(
      semesterInfo.weeks.map((week) => this.getClassesInfoOfWeek(week))
    )
  }

  async hasAnyCachedWeekInfo() {
    return !!(await this.cache.getCurrentWeekInfo())
  }

  async hasCachedClassesInfoOfWeek(week: WeekInfo) {
    return !!(await this.cache.getClassesInfoOfWeek(week))
  }
}

export function calculaterSemesterInfo(oneOfTheWeek: WeekInfo) {
  const startTime = subWeeks(
    oneOfTheWeek.startTime,
    oneOfTheWeek.weekNumber - 1
  )
  const endTime = subDays(addWeeks(startTime, 20), 1)

  const weeks: WeekInfo[] = []

  for (let i = 1; i <= 20; i++) {
    const weekStart = addWeeks(startTime, i - 1)
    const weekEnd = addDays(weekStart, 6)

    weeks.push(
      WeekInfo.from({
        weekNumber: i,
        startTime: weekStart,
        endTime: weekEnd,
        semester: oneOfTheWeek.semester,
      })
    )
  }

  return new SemesterInfo(oneOfTheWeek.semester, startTime, endTime, weeks)
}
