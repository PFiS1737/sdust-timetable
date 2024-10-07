import axios from "axios"
import { addDays, addWeeks, format, subDays, subWeeks } from "date-fns"

import { ACADEMIC_MANAGEMENT_SYSTEM_URL } from "../config"

import { ApiCache } from "./ApiCache.class"
import { ClassInfo } from "./ClassInfo.class"
import { ClassesOfWeek } from "./ClassesOfWeek.class"
import { SemesterInfo } from "./SemesterInfo.class"
import { StudentInfo } from "./StudentInfo.class"
import { WeekInfo } from "./WeekInfo.class"

interface ApiOptions {
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

/**
 * 教务系统 API 接口
 *
 * @see https://github.com/WindRunnerMax/SHST
 */
export class Api {
  private url: string
  private force: boolean
  public cache: ApiCache

  private username?: string

  private _token?: string
  set token(token: string) {
    this._token = token
  }
  get token() {
    if (!this._token) {
      throw new Error("Token not found, please login first.")
    }

    return this._token
  }

  constructor(opts?: ApiOptions) {
    this.url = opts?.url?.replace(/\/$/, "") ?? ACADEMIC_MANAGEMENT_SYSTEM_URL
    this.force = opts?.force ?? false
    this.cache = new ApiCache()
  }

  private async get(params: {
    method: string
    [key: string]: string
  }) {
    return (
      await axios.get(`${this.url}/app.do`, {
        params,
        headers: {
          token: this.username && this.token,
        },
      })
    ).data
  }

  /**
   * @param username - 用户名 (学号)
   * @param password - 密码
   */
  async login(username: string, password: string) {
    const res = (await this.get({
      method: "authUser",
      xh: username, // 学号
      pwd: password, // 密码
    })) as LoginResponseRaw

    if (res.flag === "1") {
      this.token = res.token
      this.username = username
    } else {
      throw new Error(`Failed to login: ${res.msg}`)
    }

    return this
  }

  async tryLogin(username?: string, password?: string) {
    try {
      if (username && password) {
        return await this.login(username, password)
      }
    } catch {
      console.warn("Failed to login.")
      return this
    }
  }

  async getStudentInfo() {
    const info = (await this.get({
      method: "getUserInfo",
      xh: this.username!, // 学号
    })) as StudentInfoRaw

    return new StudentInfo(info)
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

    const info = new WeekInfo(
      (await this.get({
        method: "getCurrentTime",
        currDate: format(new Date(), "yyyy-MM-dd"),
      })) as WeekInfoRaw
    )

    await this.cache.setWeekInfo(info)

    return info
  }

  async getClassesInfoOfWeek(week?: WeekInfo) {
    const weekInfo = week ?? (await this.getCurrentWeekInfo())

    if (!this.force) {
      const classes = await this.cache.getClassesInfoOfWeek(weekInfo)
      if (classes) return classes
    }

    const res = (await this.get({
      method: "getKbcxAzc",
      xh: this.username!, // 学号
      xnxqid: weekInfo.semester, // 学年学期 ID
      zc: `${weekInfo.weekNumber}`, // 周次
    })) as ClassInfoRaw[]

    const classes = res.map((item) => {
      if (item) return new ClassInfo(item)
    })

    if (classes[0]) {
      const classesInfo = new ClassesOfWeek(weekInfo, classes as ClassInfo[])

      this.cache.setClassesOfWeek(classesInfo)

      return classesInfo
    }
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
